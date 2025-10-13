import { getSupabase } from "./supabase";

export async function getCachedSummary(userId: string) {
  try {
    const supabase = getSupabase();
    if (!supabase) return null;
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data } = await supabase
      .from("summaries")
      .select("summary, updated_at")
      .eq("user_id", userId)
      .gt("updated_at", since)
      .single();
    return data?.summary ?? null;
  } catch {
    return null;
  }
}

export async function setCachedSummary(userId: string, summary: string) {
  try {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.from("summaries").upsert({ user_id: userId, summary, updated_at: new Date().toISOString() });
  } catch {}
}
