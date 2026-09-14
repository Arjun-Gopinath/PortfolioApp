// api/chat.js
import systemPrompt from "./systemPrompt.js";

export const config = {
  runtime: "edge",
};

// In-memory rate limiting map
const ipMap = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 6; // 6 queries per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const record = ipMap.get(ip) || { count: 0, resetTime: now + WINDOW_MS };

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + WINDOW_MS;
    ipMap.set(ip, record);
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  ipMap.set(ip, record);
  return false;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ reply: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({
        reply:
          "Rate limit reached. Please wait a minute before asking another question.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } },
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

  // Protect tokens: last 4 messages, 350 chars max per message
  const sanitizedMessages = rawMessages.slice(-4).map((msg) => ({
    role: msg.role === "assistant" ? "assistant" : "user",
    content: typeof msg.content === "string" ? msg.content.slice(0, 350) : "",
  }));

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          max_tokens: 250,
          temperature: 0.3,
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
          reply:
            "Model is currently experiencing high load. Please try again shortly.",
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
            "Assistant service is currently unavailable. Please try again later.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ reply: data.choices[0].message.content }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("Chat handler fetch error:", err);
    return new Response(
      JSON.stringify({ reply: "Failed to connect to the upstream server." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
