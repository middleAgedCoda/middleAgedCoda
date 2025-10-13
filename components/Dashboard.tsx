"use client";
import React from "react";
import { SummaryCard } from "@/components/SummaryCard";
import { AccountConnectionPanel } from "@/components/AccountConnectionPanel";

export default function Dashboard() {
  const [summary, setSummary] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    let isMounted = true;
    async function loadSummary() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        const data: { summary: string } = await res.json();
        if (isMounted) setSummary(data.summary);
      } catch (e: any) {
        if (isMounted) setError(e?.message ?? "Failed to load summary");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadSummary();
    return () => {
      isMounted = false;
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
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">Loading summary…</div>
          ) : error ? (
            <div className="rounded-xl border border-red-800 bg-red-950 p-6 text-red-200">{error}</div>
          ) : (
            <SummaryCard content={summary} />
          )}
        </div>
        <div>
          <AccountConnectionPanel />
        </div>
      </div>
    </div>
  );
}
