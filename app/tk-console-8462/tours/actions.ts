"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { ensureDb } from "@/db/ensure";
import { tours } from "@/db/schema";
import { getAdminEmail } from "@/lib/admin-session";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function lines(v: FormDataEntryValue | null): string[] {
  return String(v ?? "").split("\n").map((x) => x.trim()).filter(Boolean);
}
function parseItinerary(v: FormDataEntryValue | null) {
  return lines(v).map((l) => {
    const i = l.indexOf("|");
    return i >= 0
      ? { title: l.slice(0, i).trim(), description: l.slice(i + 1).trim() }
      : { title: l, description: "" };
  });
}

function fromForm(fd: FormData) {
  const title = String(fd.get("title") ?? "").trim();
  return {
    title,
    slug: String(fd.get("slug") ?? "").trim() || slugify(title),
    excerpt: String(fd.get("excerpt") ?? "").trim(),
    content: String(fd.get("content") ?? ""),
    price: String(fd.get("price") ?? "").trim(),
    city: String(fd.get("city") ?? "").trim(),
    state: String(fd.get("state") ?? "").trim(),
    destination: String(fd.get("destination") ?? "").trim(),
    peopleLimit: String(fd.get("peopleLimit") ?? "").trim(),
    durationDays: String(fd.get("durationDays") ?? "").replace(/\D/g, ""),
    durationNights: String(fd.get("durationNights") ?? "").replace(/\D/g, ""),
    image: String(fd.get("image") ?? "").trim(),
    gallery: JSON.stringify(lines(fd.get("gallery"))),
    categorySlug: String(fd.get("categorySlug") ?? "").trim(),
    itinerary: JSON.stringify(parseItinerary(fd.get("itinerary"))),
    includes: JSON.stringify(lines(fd.get("includes"))),
    excludes: JSON.stringify(lines(fd.get("excludes"))),
    status: String(fd.get("status") ?? "published") === "draft" ? "draft" : "published",
  };
}

export async function createTour(fd: FormData) {
  if (!(await getAdminEmail())) return;
  const v = fromForm(fd);
  if (!v.title) return;
  const db = await ensureDb();
  if (!v.image) {
    const g = JSON.parse(v.gallery) as string[];
    if (g[0]) v.image = g[0];
  }
  await db.insert(tours).values(v).onConflictDoNothing();
  revalidatePath("/tours");
  revalidatePath("/");
  revalidatePath("/tk-console-8462/tours");
  revalidatePath("/tk-console-8462");
  redirect("/tk-console-8462/tours");
}

export async function updateTour(id: number, fd: FormData) {
  if (!(await getAdminEmail())) return;
  const v = fromForm(fd);
  if (!v.image) {
    const g = JSON.parse(v.gallery) as string[];
    if (g[0]) v.image = g[0];
  }
  const db = await ensureDb();
  await db.update(tours).set({ ...v, updatedAt: new Date().toISOString() }).where(eq(tours.id, id));
  revalidatePath("/tours");
  revalidatePath(`/tour/${v.slug}`);
  revalidatePath(`/tour_category/${v.categorySlug}`);
  revalidatePath("/tk-console-8462/tours");
  redirect("/tk-console-8462/tours");
}

export async function deleteTour(id: number) {
  if (!(await getAdminEmail())) return;
  const db = await ensureDb();
  await db.delete(tours).where(eq(tours.id, id));
  revalidatePath("/tours");
  revalidatePath("/");
  revalidatePath("/tk-console-8462/tours");
  revalidatePath("/tk-console-8462");
}
