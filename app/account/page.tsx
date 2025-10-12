"use client";
import { useState } from "react";

export default function AccountPage() {
  const [loading, setLoading] = useState(false);
  async function startCheckout() {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (data.url) window.location.href = data.url;
  }
  return (
    <main className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Subscription</h1>
      <p className="text-white/70">Upgrade to premium for higher limits.</p>
      <button onClick={startCheckout} disabled={loading} className="bg-brand-600">{loading ? "Redirecting..." : "$10/month – Upgrade"}</button>
    </main>
  );
}
