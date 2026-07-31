import type { MetadataRoute } from "next";
import { tours, categories, blogs } from "@/lib/data";

const BASE = "https://travokart.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "", "/tours", "/blogs", "/about-us", "/contact-us", "/gallery",
    "/become-expert", "/sign-in", "/privcy-policy", "/terms-conditions",
  ];

  const entries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  for (const t of tours) {
    entries.push({ url: `${BASE}/tour/${t.slug}`, changeFrequency: "weekly", priority: 0.8 });
  }
  for (const c of categories) {
    entries.push({ url: `${BASE}/tour_category/${c.slug}`, changeFrequency: "weekly", priority: 0.7 });
  }
  for (const b of blogs) {
    entries.push({ url: `${BASE}/${b.slug}`, changeFrequency: "monthly", priority: 0.6 });
  }

  return entries;
}
