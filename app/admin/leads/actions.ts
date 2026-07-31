"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { ensureDb } from "@/db/ensure";
import { leads } from "@/db/schema";
import { getAdminEmail } from "@/lib/admin-session";

export async function updateLeadStatus(id: number, status: string) {
  if (!(await getAdminEmail())) return;
  if (!["new", "contacted", "closed"].includes(status)) return;
  const db = await ensureDb();
  await db.update(leads).set({ status }).where(eq(leads.id, id));
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLead(id: number) {
  if (!(await getAdminEmail())) return;
  const db = await ensureDb();
  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
