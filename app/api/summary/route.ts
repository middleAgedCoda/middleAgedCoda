import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAiSummary } from "@/lib/ai";
import { getCachedSummary, setCachedSummary } from "@/lib/cache";

export async function POST() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.email || session?.user?.name || null;
  if (!userId) return new Response("Unauthorized", { status: 401 });
  let summary = await getCachedSummary(userId);
  if (!summary) {
    summary = await getAiSummary();
    await setCachedSummary(userId, summary);
  }
  return Response.json({ summary });
}
