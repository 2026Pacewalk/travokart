import { getBucket } from "@/lib/r2";

export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const key = Array.isArray(path) ? path.join("/") : String(path);
  try {
    const obj = await getBucket().get(key);
    if (!obj) return new Response("Not found", { status: 404 });
    const headers = new Headers();
    obj.writeHttpMetadata?.(headers);
    if (!headers.has("Content-Type")) headers.set("Content-Type", "image/jpeg");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return new Response(obj.body, { headers });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
