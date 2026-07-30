import toursJson from "@/data/tours.json";
import categoriesJson from "@/data/categories.json";
import blogsJson from "@/data/blogs.json";
import type { Tour, Category, Blog, ItineraryDay } from "./types";

export const tours = toursJson as unknown as Tour[];
export const categories = categoriesJson as unknown as Category[];
export const blogs = blogsJson as unknown as Blog[];

/** Rewrite WordPress upload URLs to the local /media/ path used by the static site. */
export function mediaUrl(url: string | null | undefined): string {
  if (!url) return "/media/placeholder.svg";
  const idx = url.indexOf("/wp-content/uploads/");
  if (idx >= 0) return "/media" + url.slice(idx + "/wp-content/uploads".length);
  if (url.startsWith("/media")) return url;
  return url;
}

/** Primary image for a tour (featured, else first gallery image). */
export function tourImage(tour: Tour): string {
  return mediaUrl(tour.featured_image || tour.gallery?.[0] || null);
}

/** Format a price string/number into ₹-prefixed grouped INR. */
export function formatPrice(price: string | number | null | undefined): string {
  if (price === null || price === undefined || price === "") return "";
  const n = Number(String(price).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n === 0) return "";
  return "₹" + n.toLocaleString("en-IN");
}

/** Human duration label like "4 Days, 3 Nights". */
export function durationLabel(tour: Tour): string {
  const d = tour.duration_days?.[0]?.name?.replace(/\D/g, "");
  const nRaw = tour.duration_nights?.[0]?.name?.replace(/\D/g, "");
  const parts: string[] = [];
  if (d) parts.push(`${d} Day${d === "1" ? "" : "s"}`);
  if (nRaw) parts.push(`${nRaw} Night${nRaw === "1" ? "" : "s"}`);
  return parts.join(", ");
}

export function getItinerary(tour: Tour): ItineraryDay[] {
  return Array.isArray(tour.itinerary) ? tour.itinerary.filter((d) => d && d.description) : [];
}

export function getHighlights(tour: Tour): string[] {
  const h = tour.highlights;
  if (Array.isArray(h)) return h.filter((x) => x && x.trim());
  if (typeof h === "string" && h.trim()) return [h.trim()];
  return [];
}

export function tourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function categoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Parent category -> its child destination slugs (from the WordPress taxonomy). */
export const CATEGORY_CHILDREN: Record<string, string[]> = {
  domestic: ["andaman-islands", "goa", "himachal", "kerala", "ladakh", "rajasthan", "sikkim"],
  international: [
    "bali", "dubai", "hong-kong", "maldives", "mauritius", "more-packages",
    "new-zealand", "seychelles", "singapore", "sri-lanka", "thailand",
  ],
};

/** Tours in a category, rolling up child categories for parents (domestic/international). */
export function toursInCategory(slug: string): Tour[] {
  const slugs = new Set([slug, ...(CATEGORY_CHILDREN[slug] || [])]);
  return tours.filter((t) => t.categories?.some((c) => slugs.has(c.slug)));
}

export function blogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

/** Estimated reading time in minutes from HTML content. */
export function readTime(html: string): number {
  const words = (html || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}

/** Format an ISO date (YYYY-MM-DD) as "Sep 30, 2025". */
export function formatDate(iso: string): string {
  const [y, m, d] = (iso || "").split("-").map(Number);
  if (!y) return iso;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[(m || 1) - 1]} ${d}, ${y}`;
}

/** Blogs that have a usable feature image, newest first. */
export function blogsWithImages(): Blog[] {
  return blogs.filter((b) => b.featured_image);
}

/** Normalise raw WordPress usernames into a clean author name. */
export function authorName(raw: string | null | undefined): string {
  if (!raw || /user|travokart2025|admin|wp[-_]?admin/i.test(raw)) return "Travokart Team";
  return raw;
}

/** Rewrite WordPress upload URLs inside an HTML string to the local /media path. */
export function rewriteHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/https?:\/\/localhost:8080\/wp-content\/uploads/g, "/media")
    .replace(/https?:\/\/travokart\.com\/wp-content\/uploads/g, "/media")
    .replace(/\/wp-content\/uploads/g, "/media");
}

/** Category image, falling back to the first tour image in that category. */
export function categoryImage(cat: Category): string {
  if (cat.image) return mediaUrl(cat.image);
  const t = toursInCategory(cat.slug)[0];
  return t ? tourImage(t) : "/media/placeholder.svg";
}

export const DOMESTIC_SLUGS = [
  "himachal", "ladakh", "andaman-islands", "sikkim", "kerala", "goa", "rajasthan",
];
export const INTERNATIONAL_SLUGS = [
  "sri-lanka", "mauritius", "maldives", "thailand", "dubai", "singapore",
  "new-zealand", "bali", "hong-kong", "seychelles",
];
