import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { AccountConnectionPanel } from "@/components/AccountConnectionPanel";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">Manage your connections</p>
      </div>
      <AccountConnectionPanel />
    </div>
  );
}
