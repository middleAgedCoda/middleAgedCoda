import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export function getR2Client() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing R2 environment variables");
  }
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });
}

export function getPublicUrlForKey(key: string) {
  const base = process.env.R2_PUBLIC_BASE_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/${key}`;
}

export async function uploadBufferToR2(params: {
  bucket: string;
  key: string;
  contentType?: string;
  body: Buffer;
}) {
  const client = getR2Client();
  const command = new PutObjectCommand({
    Bucket: params.bucket,
    Key: params.key,
    Body: params.body,
    ContentType: params.contentType,
    ACL: undefined, // R2 ignores ACLs; use public bucket or domain for access
  });
  await client.send(command);
  return getPublicUrlForKey(params.key);
}

export async function getPresignedPutUrl(params: { bucket: string; key: string; contentType?: string; expiresIn?: number }) {
  const client = getR2Client();
  const command = new PutObjectCommand({ Bucket: params.bucket, Key: params.key, ContentType: params.contentType });
  const url = await getSignedUrl(client, command, { expiresIn: params.expiresIn ?? 900 });
  return url;
}
