import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-3">
        <Link href="/" className="font-semibold">Lean AI Music</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/generate">Create</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/library">Library</Link>
          <Link href="/account">Account</Link>
        </div>
      </div>
    </nav>
  );
}
