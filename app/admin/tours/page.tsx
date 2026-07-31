import { requireAdmin } from "@/lib/admin-session";
import AdminShell from "@/components/admin/AdminShell";
import { Compass } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function AdminToursPage() {
  const email = await requireAdmin();
  return (
    <AdminShell email={email} title="Tour Packages">
      <div className="admin-card">
        <div className="admin-empty">
          <Compass width={40} height={40} className="mx-auto mb-3 text-[color:var(--brand)]" />
          <p className="font-bold text-[color:var(--ink)]">Tour management is coming next.</p>
          <p className="text-sm mt-1">Add, edit and manage tour packages from here.</p>
        </div>
      </div>
    </AdminShell>
  );
}
