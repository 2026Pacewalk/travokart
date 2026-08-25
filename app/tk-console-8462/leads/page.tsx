import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin-session";
import { ensureDb } from "@/db/ensure";
import { leads as leadsTable } from "@/db/schema";
import AdminShell from "@/components/admin/AdminShell";
import LeadRow from "@/components/admin/LeadRow";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const email = await requireAdmin();
  const db = await ensureDb();
  const rows = await db.select().from(leadsTable).orderBy(desc(leadsTable.id)).limit(500);

  return (
    <AdminShell email={email} title="Leads">
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>All Enquiries</h2>
          <span className="text-[13px] text-[color:var(--muted)]">{rows.length} total</span>
        </div>
        {rows.length === 0 ? (
          <div className="admin-empty">No leads yet. Enquiries from your website forms will appear here.</div>
        ) : (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Source</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((lead) => (
                  <LeadRow key={lead.id} lead={lead} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
