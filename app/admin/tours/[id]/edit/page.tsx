import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-session";
import { getTourRowById, getCategoryRows } from "@/lib/db-content";
import AdminShell from "@/components/admin/AdminShell";
import TourForm from "@/components/admin/TourForm";
import { updateTour } from "../../actions";
import { ArrowRight } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const email = await requireAdmin();
  const { id } = await params;
  const [row, cats] = await Promise.all([getTourRowById(Number(id)), getCategoryRows()]);
  if (!row) notFound();

  const action = updateTour.bind(null, row.id);

  return (
    <AdminShell
      email={email}
      title="Edit Tour Package"
      actions={
        <div className="flex items-center gap-3">
          <Link href={`/tour/${row.slug}`} target="_blank" className="text-[13px] font-semibold text-[color:var(--sky-dark)]">View</Link>
          <Link href="/admin/tours" className="text-[13px] font-semibold text-[color:var(--muted)] inline-flex items-center gap-1"><ArrowRight width={14} height={14} className="rotate-180" /> Back</Link>
        </div>
      }
    >
      <TourForm action={action} initial={row} categories={cats} />
    </AdminShell>
  );
}
