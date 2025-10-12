async function getMyTracks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/tracks?scope=me`, { cache: 'no-store' });
  return res.json();
}

export default async function LibraryPage() {
  const { tracks } = await getMyTracks();
  return (
    <main className="p-4 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Your tracks</h1>
      <ul className="space-y-3">
        {tracks?.map((t: any) => (
          <li key={t.id} className="rounded bg-white/5 p-3">
            <div className="font-medium">{t.title || 'Untitled'}</div>
            <audio className="w-full mt-2" controls src={t.audio_url} />
          </li>
        ))}
      </ul>
    </main>
  );
}
