"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

type SummaryCardProps = {
  content: string;
  className?: string;
};

export function SummaryCard({ content, className }: SummaryCardProps) {
  return (
    <div className={cn("rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg", className)}>
      <h2 className="mb-3 text-xl font-semibold">AI Summary</h2>
      <div className="prose prose-invert prose-p:leading-relaxed max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
