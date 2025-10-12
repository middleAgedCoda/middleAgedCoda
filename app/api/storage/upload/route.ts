import { auth } from "@/lib/auth";
import { uploadBufferToR2 } from "@/lib/r2";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as unknown as File | null;
  const title = formData.get("title")?.toString() || undefined;
  if (!file) return new Response("Missing file", { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const bucket = process.env.R2_BUCKET!;
  const sanitizedName = (file.name || "audio.webm").toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
  const key = `${session.user.id}/${Date.now()}-${sanitizedName}`;

  const publicUrl = await uploadBufferToR2({
    bucket,
    key,
    contentType: file.type || "audio/mpeg",
    body: buffer,
  });

  return Response.json({ success: true, key, url: publicUrl ?? null, title: title ?? sanitizedName });
}
