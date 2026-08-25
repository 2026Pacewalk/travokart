"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { ensureDb } from "@/db/ensure";
import { blogs } from "@/db/schema";
import { getAdminEmail } from "@/lib/admin-session";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function fromForm(fd: FormData) {
  const title = String(fd.get("title") ?? "").trim();
  return {
    title,
    slug: String(fd.get("slug") ?? "").trim() || slugify(title),
    excerpt: String(fd.get("excerpt") ?? "").trim().slice(0, 500),
    content: String(fd.get("content") ?? ""),
    image: String(fd.get("image") ?? "").trim(),
    author: String(fd.get("author") ?? "").trim() || "Travokart Team",
    category: String(fd.get("category") ?? "").trim() || "Travel",
    date: String(fd.get("date") ?? "").trim(),
    status: String(fd.get("status") ?? "published") === "draft" ? "draft" : "published",
  };
}

export async function createBlog(fd: FormData) {
  if (!(await getAdminEmail())) return;
  const v = fromForm(fd);
  if (!v.title) return;
  const db = await ensureDb();
  await db.insert(blogs).values(v).onConflictDoNothing();
  revalidatePath("/blogs");
  revalidatePath("/tk-console-8462/blogs");
  revalidatePath("/tk-console-8462");
  redirect("/tk-console-8462/blogs");
}

export async function updateBlog(id: number, fd: FormData) {
  if (!(await getAdminEmail())) return;
  const v = fromForm(fd);
  const db = await ensureDb();
  await db.update(blogs).set({ ...v, updatedAt: new Date().toISOString() }).where(eq(blogs.id, id));
  revalidatePath("/blogs");
  revalidatePath(`/${v.slug}`);
  revalidatePath("/tk-console-8462/blogs");
  redirect("/tk-console-8462/blogs");
}

export async function deleteBlog(id: number) {
  if (!(await getAdminEmail())) return;
  const db = await ensureDb();
  await db.delete(blogs).where(eq(blogs.id, id));
  revalidatePath("/blogs");
  revalidatePath("/tk-console-8462/blogs");
  revalidatePath("/tk-console-8462");
}
