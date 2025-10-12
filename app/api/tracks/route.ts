import { auth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scope = searchParams.get("scope") || "me"; // me | public
  const supabase = getSupabaseAdmin();
  const session = await auth();

  if (scope === "public") {
    const { data, error } = await supabase
      .from("tracks")
      .select("id,title,audio_url,is_public,created_at, user:users(id,name,image)")
      .eq("is_public", true)
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) return Response.json({ error: error.message }, { status: 500 });
    return Response.json({ tracks: data });
  }

  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });
  const { data, error } = await supabase
    .from("tracks")
    .select("id,title,audio_url,is_public,created_at")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ tracks: data });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });
  const body = await req.json();
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("tracks")
    .insert({
      user_id: session.user.id,
      title: body.title || null,
      audio_url: body.audioUrl,
      is_public: Boolean(body.isPublic),
    })
    .select()
    .single();
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ track: data });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new Response("Missing id", { status: 400 });
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("tracks").delete().match({ id, user_id: session.user.id });
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}
