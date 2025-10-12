export const revalidate = 60;

type Track = {
  id: string;
  title: string;
  description?: string;
  isPublic: boolean;
};

async function fetchTracks(): Promise<Track[]> {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${base}/tracks`, { cache: 'no-store' });
    if (!res.ok) return [] as Track[];
    return (await res.json()) as Track[];
  } catch {
    return [] as Track[];
  }
}

export default async function FeedPage() {
  const tracks = await fetchTracks();
  return (
    <div style={{ padding: 24 }}>
      <h1>Discovery Feed</h1>
      {tracks.length === 0 ? (
        <p>No tracks yet.</p>
      ) : (
        <ul>
          {tracks.map((t: Track) => (
            <li key={t.id}>
              <strong>{t.title}</strong> {t.isPublic ? '' : '(private)'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
