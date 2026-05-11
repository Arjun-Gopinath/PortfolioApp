import systemPrompt from "./systemPrompt.js";

export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const { messages } = await req.json();

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemma-4-31b-it:free",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    }),
  });

  if (response.status === 429) {
    return new Response(
      JSON.stringify({
        reply: "Too many requests. Please wait a moment before trying again.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await response.json();

  if (!response.ok || !data.choices) {
    console.error("OpenRouter error:", data);
    return new Response(
      JSON.stringify({
        reply: `Something went wrong. ${data.error?.message ?? "Unknown error."}`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ reply: data.choices[0].message.content }),
    { headers: { "Content-Type": "application/json" } }
  );
}
