import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import Dashboard from "@/components/Dashboard";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");
  return <Dashboard />;
}
