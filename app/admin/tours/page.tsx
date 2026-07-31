import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import { getAllTourRows, getCategoryRows } from "@/lib/db-content";
import { formatPrice } from "@/lib/data";
import AdminShell from "@/components/admin/AdminShell";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTour } from "./actions";
import { Plus, Pencil } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function AdminToursPage() {
  const email = await requireAdmin();
  const [rows, cats] = await Promise.all([getAllTourRows(), getCategoryRows()]);
  const catName = new Map(cats.map((c) => [c.slug, c.name]));

  return (
    <AdminShell
      email={email}
      title="Tour Packages"
      actions={
        <Link href="/admin/tours/new" className="btn btn-primary py-2 px-4 text-[13px]">
          <Plus width={16} height={16} /> New Tour
        </Link>
      }
    >
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>All Tours</h2>
          <span className="text-[13px] text-[color:var(--muted)]">{rows.length} total</span>
        </div>
        {rows.length === 0 ? (
          <div className="admin-empty">No tours yet. Click “New Tour” to create one.</div>
        ) : (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr><th>Tour</th><th>Category</th><th>Price</th><th>Duration</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {t.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={t.image} alt="" className="w-14 h-11 object-cover rounded-lg border border-[color:var(--line)]" />
                        ) : (
                          <span className="w-14 h-11 rounded-lg bg-[color:var(--cloud)] border border-[color:var(--line)]" />
                        )}
                        <div>
                          <div className="lead-name">{t.title}</div>
                          <div className="text-[12px] text-[color:var(--muted)]">{t.city}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="src-pill">{catName.get(t.categorySlug) || t.categorySlug || "—"}</span></td>
                    <td className="whitespace-nowrap font-bold text-[color:var(--brand-dark)]">{formatPrice(t.price) || "—"}</td>
                    <td className="whitespace-nowrap text-[color:var(--muted)]">{t.durationDays ? `${t.durationDays}D` : ""}{t.durationNights ? ` / ${t.durationNights}N` : ""}</td>
                    <td><span className={`badge ${t.status === "published" ? "badge-closed" : "badge-contacted"}`}>{t.status}</span></td>
                    <td>
                      <div className="flex gap-2">
                        <Link href={`/admin/tours/${t.id}/edit`} className="icon-btn" aria-label="Edit" style={{ color: "var(--sky-dark)" }}>
                          <Pencil width={15} height={15} />
                        </Link>
                        <DeleteButton action={deleteTour.bind(null, t.id)} confirmText={`Delete "${t.title}"?`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
