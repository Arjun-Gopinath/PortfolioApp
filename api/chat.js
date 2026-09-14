import systemPrompt from "./systemPrompt.js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const config = {
  runtime: "edge",
};

// 5 requests per 1 minute per IP
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: true,
});

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ reply: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Identify user by client IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const { success, limit, remaining, reset } = await ratelimit.limit(
    `chat_${ip}`,
  );

  if (!success) {
    const secondsToWait = Math.ceil((reset - Date.now()) / 1000);
    return new Response(
      JSON.stringify({
        reply: `Rate limit reached. Please wait ${secondsToWait}s before asking another question.`,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      },
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ reply: "Invalid request payload." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawMessages = Array.isArray(body?.messages) ? body.messages : [];

  // Guard: Take only the last 4 messages, clamp user text to 400 characters max
  const sanitizedMessages = rawMessages.slice(-4).map((msg) => ({
    role: msg.role === "assistant" ? "assistant" : "user",
    content: typeof msg.content === "string" ? msg.content.slice(0, 400) : "",
  }));

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio.dev",
        "X-Title": "Arjun Portfolio Assistant",
      },
      body: JSON.stringify({
        model: "nvidia/nemotron-3-super-120b-a12b:free",
        max_tokens: 250, // Capped to 250 tokens (~150-180 words)
        temperature: 0.3, // Lower temperature avoids rambling
        messages: [
          { role: "system", content: systemPrompt },
          ...sanitizedMessages,
        ],
      }),
    },
  );

  if (response.status === 429) {
    return new Response(
      JSON.stringify({
        reply: "Upstream AI model is currently busy. Please try again shortly.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  const data = await response.json();

  if (!response.ok || !data.choices?.[0]?.message?.content) {
    console.error("OpenRouter error:", data);
    return new Response(
      JSON.stringify({
        reply:
          "The assistant service is momentarily unavailable. Please try again later.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({ reply: data.choices[0].message.content }),
    { headers: { "Content-Type": "application/json" } },
  );
}
