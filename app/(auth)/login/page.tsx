export default function LoginPage() {
  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form action="/api/auth/signin" method="post" className="space-y-4">
        <button className="w-full rounded bg-brand-600 py-2">Continue with Google</button>
      </form>
    </main>
  );
}
