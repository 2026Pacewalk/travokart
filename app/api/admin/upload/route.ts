import { getBucket } from "@/lib/r2";
import { getAdminEmail } from "@/lib/admin-session";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB per image

export async function POST(request: Request) {
  if (!(await getAdminEmail())) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  try {
    const form = await request.formData();
    const files = form.getAll("files").filter((f): f is File => f instanceof File);
    if (files.length === 0) {
      return Response.json({ ok: false, error: "No files uploaded." }, { status: 400 });
    }

    const bucket = getBucket();
    const urls: string[] = [];

    for (const file of files) {
      if (file.size > MAX_BYTES) {
        return Response.json({ ok: false, error: `${file.name} is larger than 8 MB.` }, { status: 400 });
      }
      const type = file.type || "image/jpeg";
      if (!ALLOWED.includes(type)) {
        return Response.json({ ok: false, error: `${file.name}: unsupported image type.` }, { status: 400 });
      }
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const key = `uploads/${crypto.randomUUID()}.${ext}`;
      await bucket.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: type } });
      urls.push(`/api/media/${key}`);
    }

    return Response.json({ ok: true, urls }, { status: 201 });
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : "Upload failed" }, { status: 500 });
  }
}
