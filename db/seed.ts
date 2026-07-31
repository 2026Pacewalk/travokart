import { sql } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { blogs as blogTable, tours as tourTable, categories as catTable } from "./schema";
import {
  blogs as blogData,
  tours as tourData,
  categories as catData,
  CATEGORY_CHILDREN,
  mediaUrl,
  authorName,
  tourImage,
  getItinerary,
} from "../lib/data";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DB = DrizzleD1Database<any>;

async function isEmpty(db: DB, table: typeof blogTable | typeof tourTable | typeof catTable) {
  const [{ c }] = await db.select({ c: sql<number>`count(*)` }).from(table);
  return Number(c) === 0;
}

/** One-time seed of the current static content into D1 (only if the table is empty). */
export async function seedContent(db: DB) {
  // Categories
  if (await isEmpty(db, catTable)) {
    const parentOf: Record<string, string> = {};
    for (const [parent, kids] of Object.entries(CATEGORY_CHILDREN)) {
      for (const k of kids) parentOf[k] = parent;
    }
    let i = 0;
    for (const c of catData) {
      await db
        .insert(catTable)
        .values({
          slug: c.slug,
          name: c.name,
          description: c.description || "",
          parent: parentOf[c.slug] || "",
          image: c.image ? mediaUrl(c.image) : "",
          sortOrder: i++,
        })
        .onConflictDoNothing();
    }
  }

  // Blogs
  if (await isEmpty(db, blogTable)) {
    for (const b of blogData) {
      await db
        .insert(blogTable)
        .values({
          slug: b.slug,
          title: b.title,
          excerpt: (b.excerpt || "").replace(/\[&hellip;\]|\[…\]/g, "").slice(0, 500),
          content: b.content || "",
          image: b.featured_image ? mediaUrl(b.featured_image) : "",
          author: authorName(b.author),
          category: b.categories?.[0]?.name || "Travel",
          date: b.date || "",
          status: "published",
        })
        .onConflictDoNothing();
    }
  }

  // Tours
  if (await isEmpty(db, tourTable)) {
    let i = 0;
    for (const t of tourData) {
      await db
        .insert(tourTable)
        .values({
          slug: t.slug,
          title: t.title,
          excerpt: t.excerpt || "",
          content: t.content || "",
          price: String(t.product_price || t.price || ""),
          city: t.city || "",
          state: t.state || "",
          destination: t.destination || "",
          peopleLimit: t.people_limit || "",
          durationDays: (t.duration_days?.[0]?.name || "").replace(/\D/g, ""),
          durationNights: (t.duration_nights?.[0]?.name || "").replace(/\D/g, ""),
          image: tourImage(t),
          gallery: JSON.stringify((t.gallery || []).map(mediaUrl)),
          categorySlug: t.categories?.[0]?.slug || "",
          itinerary: JSON.stringify(getItinerary(t)),
          includes: JSON.stringify((t.includes || []).map((x) => x.name)),
          excludes: JSON.stringify((t.excludes || []).map((x) => x.name)),
          status: "published",
          sortOrder: i++,
        })
        .onConflictDoNothing();
    }
  }
}
