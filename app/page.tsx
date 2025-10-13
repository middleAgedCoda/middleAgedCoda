import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { signIn, signOut } from "next-auth/react";
import React from "react";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold">MyFrontPage.ai</h1>
        <p className="mt-2 text-gray-400">AI-Powered Personal Context Engine</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500">
                Go to Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <button
              onClick={async () => {
                await signIn("google", { callbackUrl: "/dashboard" });
              }}
              className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
            >
              Sign in with Google
            </button>
          )}
        </div>
      </section>

      <p className="text-center text-sm text-gray-500">Minimal MVP: Auth, Dashboard, AI summary.</p>
    </main>
  );
}

function SignOutButton() {
  "use client";
  return (
    <button
      onClick={async () => {
        await signOut({ callbackUrl: "/" });
      }}
      className="rounded-md border border-gray-700 px-4 py-2 hover:bg-gray-800"
    >
      Sign out
    </button>
  );
}
