import { env } from "cloudflare:workers";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type R2 = any;

export function getBucket(): R2 {
  const bucket = (env as Record<string, unknown>).MEDIA as R2;
  if (!bucket) {
    throw new Error(
      "Cloudflare R2 binding `MEDIA` is unavailable. Set the `r2` field in .openai/hosting.json to `MEDIA`."
    );
  }
  return bucket;
}
