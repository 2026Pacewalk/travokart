import { requireAdmin } from "@/lib/admin-session";
import AdminShell from "@/components/admin/AdminShell";
import { Newspaper } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const email = await requireAdmin();
  return (
    <AdminShell email={email} title="Blogs">
      <div className="admin-card">
        <div className="admin-empty">
          <Newspaper width={40} height={40} className="mx-auto mb-3 text-[color:var(--brand)]" />
          <p className="font-bold text-[color:var(--ink)]">Blog management is coming next.</p>
          <p className="text-sm mt-1">Create, edit and publish blog posts from here.</p>
        </div>
      </div>
    </AdminShell>
  );
}
