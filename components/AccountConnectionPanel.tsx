"use client";
export function AccountConnectionPanel() {
  const Btn = (p: { children: string }) => (
    <button className="rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-sm hover:bg-gray-800">{p.children}</button>
  );
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
      <h3 className="text-lg font-semibold">Connect Accounts</h3>
      <p className="mt-1 text-sm text-gray-400">Simulated connections for MVP</p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Btn>Connect Gmail</Btn>
        <Btn>Connect Discord</Btn>
        <Btn>Connect Slack</Btn>
      </div>
    </div>
  );
}
