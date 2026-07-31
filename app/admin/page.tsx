import Link from "next/link";
import { desc, eq, sql } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin-session";
import { ensureDb } from "@/db/ensure";
import { leads as leadsTable } from "@/db/schema";
import { tours as toursData, blogs as blogsData } from "@/lib/data";
import AdminShell from "@/components/admin/AdminShell";
import { Users, Newspaper, Compass, Sparkle, ArrowRight, Phone, Mail } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const email = await requireAdmin();
  const db = await ensureDb();

  const [{ total }] = await db.select({ total: sql<number>`count(*)` }).from(leadsTable);
  const [{ fresh }] = await db
    .select({ fresh: sql<number>`count(*)` })
    .from(leadsTable)
    .where(eq(leadsTable.status, "new"));
  const recent = await db.select().from(leadsTable).orderBy(desc(leadsTable.id)).limit(6);

  const stats = [
    { label: "Total Leads", value: total, Icon: Users, bg: "linear-gradient(135deg,var(--brand),var(--brand-dark))" },
    { label: "New Leads", value: fresh, Icon: Sparkle, bg: "linear-gradient(135deg,#fa3e3e,#c92a2a)" },
    { label: "Tour Packages", value: toursData.length, Icon: Compass, bg: "linear-gradient(135deg,var(--sky),var(--sky-dark))" },
    { label: "Blog Posts", value: blogsData.length, Icon: Newspaper, bg: "linear-gradient(135deg,#12b886,#0c8a63)" },
  ];

  return (
    <AdminShell email={email} title="Dashboard">
      <div className="stat-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="sc-ic" style={{ background: s.bg }}><s.Icon width={22} height={22} /></span>
            <div>
              <div className="sc-val">{s.value}</div>
              <div className="sc-lbl">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card mt-6">
        <div className="admin-card-head">
          <h2>Recent Leads</h2>
          <Link href="/admin/leads" className="text-[13px] font-bold text-[color:var(--brand-dark)] inline-flex items-center gap-1.5">
            View all <ArrowRight width={14} height={14} />
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="admin-empty">No leads yet. Enquiries from your website forms will appear here.</div>
        ) : (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr><th>Name</th><th>Contact</th><th>Source</th><th>Message</th><th>Status</th></tr>
              </thead>
              <tbody>
                {recent.map((l) => (
                  <tr key={l.id}>
                    <td className="lead-name">{l.name || "—"}</td>
                    <td className="lead-contact">
                      {l.phone && <a href={`tel:${l.phone}`} className="flex items-center gap-1.5"><Phone width={12} height={12} /> {l.phone}</a>}
                      {l.email && <a href={`mailto:${l.email}`} className="flex items-center gap-1.5 mt-1"><Mail width={12} height={12} /> {l.email}</a>}
                    </td>
                    <td><span className="src-pill">{l.source}</span></td>
                    <td className="max-w-[300px]"><div className="line-clamp-2 text-[color:var(--muted)]">{l.message || "—"}</div></td>
                    <td><span className={`badge badge-${l.status}`}>{l.status}</span></td>
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
