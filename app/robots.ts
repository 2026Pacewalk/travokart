import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://travokart.com/sitemap.xml",
    host: "https://travokart.com",
  };
}
