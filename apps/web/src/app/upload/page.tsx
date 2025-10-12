"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const onUpload = async () => {
    if (!file) return;
    setStatus("Requesting upload...");
    const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const presign = await fetch(`${base}/upload/presign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    }).then((r) => r.json());

    if (!presign.url) {
      setStatus("Failed to get presigned URL");
      return;
    }

    setStatus("Uploading to storage...");
    const put = await fetch(presign.url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!put.ok) {
      setStatus("Upload failed");
      return;
    }

    setStatus(`Uploaded! Key: ${presign.key}`);
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Upload Audio</h1>
      <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <button onClick={onUpload} disabled={!file} style={{ marginLeft: 12 }}>Upload</button>
      <p>{status}</p>
    </main>
  );
}
