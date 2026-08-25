import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import { getCategoryRows } from "@/lib/db-content";
import AdminShell from "@/components/admin/AdminShell";
import TourForm from "@/components/admin/TourForm";
import { createTour } from "../actions";
import { ArrowRight } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function NewTourPage() {
  const email = await requireAdmin();
  const cats = await getCategoryRows();
  return (
    <AdminShell
      email={email}
      title="New Tour Package"
      actions={<Link href="/tk-console-8462/tours" className="text-[13px] font-semibold text-[color:var(--muted)] inline-flex items-center gap-1"><ArrowRight width={14} height={14} className="rotate-180" /> Back</Link>}
    >
      <TourForm action={createTour} categories={cats} />
    </AdminShell>
  );
}
