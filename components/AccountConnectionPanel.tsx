"use client";
import React from "react";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = "", ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 font-medium text-gray-100 hover:bg-gray-800 active:translate-y-px ${className}`}
    {...props}
  >
    {children}
  </button>
);

export function AccountConnectionPanel() {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
      <h3 className="text-lg font-semibold">Connect Accounts</h3>
      <p className="mt-1 text-sm text-gray-400">Simulated connections for MVP</p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Button>Connect Gmail</Button>
        <Button>Connect Discord</Button>
        <Button>Connect Slack</Button>
      </div>
    </div>
  );
}
