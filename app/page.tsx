import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-extrabold">Lean AI Music</h1>
      <p className="text-white/80">Generate tracks from text with Suno AI. Save, share, and explore.</p>
      <div className="grid grid-cols-2 gap-4">
        <Link className="rounded bg-brand-700 px-4 py-3 text-center" href="/generate">Create</Link>
        <Link className="rounded bg-white/10 px-4 py-3 text-center" href="/explore">Explore</Link>
      </div>
    </main>
  );
}
