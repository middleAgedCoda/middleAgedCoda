"use client";
import { useEffect, useState } from "react";
import { SummaryCard } from "@/components/SummaryCard";
import { AccountConnectionPanel } from "@/components/AccountConnectionPanel";

export default function Dashboard() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let on = true;
    (async () => {
      try {
        const res = await fetch("/api/summary", { method: "POST" });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (on) setSummary(data.summary || "");
      } catch (e: any) {
        if (on) setError(e?.message || "Failed to load summary");
      } finally {
        if (on) setLoading(false);
      }
    })();
    return () => {
      on = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Your Front Page</h1>
        <p className="mt-1 text-sm text-gray-400">Daily context, synthesized for you</p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">Loading…</div>
          ) : error ? (
            <div className="rounded-xl border border-red-800 bg-red-950 p-6 text-red-200">{error}</div>
          ) : (
            <SummaryCard content={summary} />
          )}
        </div>
        <AccountConnectionPanel />
      </div>
    </div>
  );
}
