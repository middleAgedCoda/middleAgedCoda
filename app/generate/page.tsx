"use client";
import { useState } from "react";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  async function onGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setAudioUrl(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, duration: 30 }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.audioUrl) setAudioUrl(data.audioUrl);
  }

  return (
    <main className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create a track</h1>
      <form onSubmit={onGenerate} className="space-y-3">
        <textarea
          className="w-full rounded bg-white/5 p-3"
          rows={4}
          placeholder="Describe the vibe, instruments, genre..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button disabled={loading || !prompt} className="w-full bg-brand-600 disabled:opacity-50">
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      {audioUrl && (
        <div className="space-y-2">
          <audio className="w-full" controls src={audioUrl} />
          <a className="underline" href={audioUrl} target="_blank" rel="noreferrer">Open audio</a>
        </div>
      )}
    </main>
  );
}
