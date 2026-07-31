import { desc, eq } from "drizzle-orm";
import { ensureDb } from "@/db/ensure";
import { blogs as blogTable, type BlogRow } from "@/db/schema";
import type { Blog } from "./types";

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
