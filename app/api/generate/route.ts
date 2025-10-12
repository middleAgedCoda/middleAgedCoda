import { z } from "zod";

export const runtime = "nodejs";

const BodySchema = z.object({
  prompt: z.string().min(4).max(500),
  duration: z.number().int().min(5).max(120).default(30),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) return Response.json({ error: "Invalid payload" }, { status: 400 });

  const { prompt, duration } = parsed.data;

  const res = await fetch("https://api.suno.ai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SUNO_API_KEY}`,
    },
    body: JSON.stringify({ prompt, duration }),
  });

  if (!res.ok) {
    const text = await res.text();
    return Response.json({ error: "Suno API error", details: text }, { status: 502 });
  }

  const data = await res.json();
  return Response.json({ success: true, audioUrl: data.audioUrl });
}
