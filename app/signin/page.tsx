import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) redirect("/dashboard");

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-gray-400">Use your email to get a magic link</p>
      </div>
      <form
        action={async (formData: FormData) => {
          "use server";
          const email = String(formData.get("email") ?? "").trim();
          if (!email) return;
          // NextAuth will log the magic link URL to the server console in dev
          await signIn("email", { email, callbackUrl: "/dashboard" });
        }}
        className="rounded-xl border border-gray-800 bg-gray-950 p-6"
      >
        <label className="block text-sm text-gray-300">Email</label>
        <input
          className="mt-1 w-full rounded-md border border-gray-800 bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
        >
          Send magic link
        </button>
      </form>
    </div>
  );
}
