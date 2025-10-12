import styles from "./page.module.css";

export default async function Home() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/health', {
    next: { revalidate: 60 },
    cache: 'force-cache',
  }).catch(() => undefined);
  const health = res ? await res.json() : { status: 'unknown' };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>AI Music Platform</h1>
        <p>API health: {health.status}</p>
      </main>
    </div>
  );
}
