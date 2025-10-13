import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { signOut } from "next-auth/react";
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
            <Link href="/signin" className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500">
              Sign in
            </Link>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
          <h3 className="font-semibold">Connect your world</h3>
          <p className="mt-1 text-sm text-gray-400">Gmail, Discord, Slack (simulated for now)</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
          <h3 className="font-semibold">AI summary</h3>
          <p className="mt-1 text-sm text-gray-400">One page that keeps you in the loop</p>
        </div>
        <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
          <h3 className="font-semibold">Privacy-first</h3>
          <p className="mt-1 text-sm text-gray-400">Your data, your control</p>
        </div>
      </section>
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
