import { asc, desc, eq } from "drizzle-orm";
import { ensureDb } from "@/db/ensure";
import {
  blogs as blogTable,
  tours as tourTable,
  categories as catTable,
  type BlogRow,
  type TourRow,
  type CategoryRow,
} from "@/db/schema";
import type { Blog, Tour, Category } from "./types";
import { CATEGORY_CHILDREN } from "./data";

/* ---------------- Blogs ---------------- */
export function rowToBlog(r: BlogRow): Blog {
  return {
    slug: r.slug,
    title: r.title,
    date: r.date,
    excerpt: r.excerpt,
    content: r.content,
    featured_image: r.image,
    author: r.author,
    categories: r.category ? [{ slug: r.category.toLowerCase().replace(/\s+/g, "-"), name: r.category }] : [],
  };
}

export async function getBlogs(): Promise<Blog[]> {
  const db = await ensureDb();
  const rows = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.status, "published"))
    .orderBy(desc(blogTable.date), desc(blogTable.id));
  return rows.map(rowToBlog);
}

export async function getBlogsWithImages(): Promise<Blog[]> {
  return (await getBlogs()).filter((b) => b.featured_image);
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const db = await ensureDb();
  const [r] = await db.select().from(blogTable).where(eq(blogTable.slug, slug)).limit(1);
  return r ? rowToBlog(r) : undefined;
}

/* admin */
export async function getAllBlogRows(): Promise<BlogRow[]> {
  const db = await ensureDb();
  return db.select().from(blogTable).orderBy(desc(blogTable.id));
}

export async function getBlogRowById(id: number): Promise<BlogRow | undefined> {
  const db = await ensureDb();
  const [r] = await db.select().from(blogTable).where(eq(blogTable.id, id)).limit(1);
  return r;
}

/* ---------------- Tours & Categories ---------------- */
function parseJson<T>(s: string): T[] {
  try {
    const v = JSON.parse(s || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function rowToTour(r: TourRow, catName: (slug: string) => string): Tour {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    price: r.price,
    product_price: r.price,
    product_regular_price: r.price,
    destination: r.destination,
    city: r.city,
    state: r.state,
    address: "",
    people_limit: r.peopleLimit,
    highlights: [],
    itinerary: parseJson(r.itinerary),
    featured_image: r.image,
    gallery: parseJson<string>(r.gallery),
    categories: r.categorySlug ? [{ slug: r.categorySlug, name: catName(r.categorySlug) }] : [],
    country: [],
    duration_days: r.durationDays ? [{ slug: "", name: `${r.durationDays} Days` }] : [],
    duration_nights: r.durationNights ? [{ slug: "", name: `${r.durationNights} Nights` }] : [],
    includes: parseJson<string>(r.includes).map((n) => ({ slug: "", name: n })),
    excludes: parseJson<string>(r.excludes).map((n) => ({ slug: "", name: n })),
    activities: [],
    why_book: [],
  };
}

async function catNameMap(): Promise<(slug: string) => string> {
  const db = await ensureDb();
  const rows = await db.select().from(catTable);
  const map = new Map(rows.map((c) => [c.slug, c.name]));
  return (slug: string) => map.get(slug) || slug;
}

export async function getTours(): Promise<Tour[]> {
  const db = await ensureDb();
  const name = await catNameMap();
  const rows = await db
    .select()
    .from(tourTable)
    .where(eq(tourTable.status, "published"))
    .orderBy(asc(tourTable.sortOrder), asc(tourTable.id));
  return rows.map((r) => rowToTour(r, name));
}

export async function getTourBySlug(slug: string): Promise<Tour | undefined> {
  const db = await ensureDb();
  const [r] = await db.select().from(tourTable).where(eq(tourTable.slug, slug)).limit(1);
  if (!r) return undefined;
  const name = await catNameMap();
  return rowToTour(r, name);
}

export async function getCategories(): Promise<Category[]> {
  const db = await ensureDb();
  const [catRows, allTours] = await Promise.all([
    db.select().from(catTable).orderBy(asc(catTable.sortOrder)),
    getTours(),
  ]);
  return catRows.map((c) => {
    const slugs = new Set([c.slug, ...(CATEGORY_CHILDREN[c.slug] || [])]);
    const inCat = allTours.filter((t) => t.categories?.some((x) => slugs.has(x.slug)));
    return {
      slug: c.slug,
      name: c.name,
      description: c.description,
      count: inCat.length,
      image: c.image || inCat[0]?.featured_image || null,
    };
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return (await getCategories()).find((c) => c.slug === slug);
}

export async function toursInCategoryDb(slug: string): Promise<Tour[]> {
  const slugs = new Set([slug, ...(CATEGORY_CHILDREN[slug] || [])]);
  const allTours = await getTours();
  return allTours.filter((t) => t.categories?.some((c) => slugs.has(c.slug)));
}

/* admin */
export async function getAllTourRows(): Promise<TourRow[]> {
  const db = await ensureDb();
  return db.select().from(tourTable).orderBy(asc(tourTable.sortOrder), asc(tourTable.id));
}
export async function getTourRowById(id: number): Promise<TourRow | undefined> {
  const db = await ensureDb();
  const [r] = await db.select().from(tourTable).where(eq(tourTable.id, id)).limit(1);
  return r;
}
export async function getCategoryRows(): Promise<CategoryRow[]> {
  const db = await ensureDb();
  return db.select().from(catTable).orderBy(asc(catTable.sortOrder));
}
