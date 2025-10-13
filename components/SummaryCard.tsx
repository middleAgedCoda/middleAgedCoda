"use client";
import React from "react";

export function SummaryCard({ content }: { content: string }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
      <h2 className="mb-3 text-xl font-semibold">AI Summary</h2>
      <pre className="whitespace-pre-wrap text-sm leading-relaxed text-gray-100">{content}</pre>
    </div>
  );
}
