import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import { getAllBlogRows } from "@/lib/db-content";
import AdminShell from "@/components/admin/AdminShell";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteBlog } from "./actions";
import { Plus, Pencil } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function AdminBlogsPage() {
  const email = await requireAdmin();
  const rows = await getAllBlogRows();

  return (
    <AdminShell
      email={email}
      title="Blogs"
      actions={
        <Link href="/admin/blogs/new" className="btn btn-primary py-2 px-4 text-[13px]">
          <Plus width={16} height={16} /> New Post
        </Link>
      }
    >
      <div className="admin-card">
        <div className="admin-card-head">
          <h2>All Posts</h2>
          <span className="text-[13px] text-[color:var(--muted)]">{rows.length} total</span>
        </div>
        {rows.length === 0 ? (
          <div className="admin-empty">No blog posts yet. Click “New Post” to create one.</div>
        ) : (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr><th>Post</th><th>Category</th><th>Status</th><th>Date</th><th></th></tr>
              </thead>
              <tbody>
                {rows.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {b.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={b.image} alt="" className="w-14 h-11 object-cover rounded-lg border border-[color:var(--line)]" />
                        ) : (
                          <span className="w-14 h-11 rounded-lg bg-[color:var(--cloud)] border border-[color:var(--line)]" />
                        )}
                        <div>
                          <div className="lead-name">{b.title}</div>
                          <div className="text-[12px] text-[color:var(--muted)]">/{b.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="src-pill">{b.category}</span></td>
                    <td><span className={`badge ${b.status === "published" ? "badge-closed" : "badge-contacted"}`}>{b.status}</span></td>
                    <td className="whitespace-nowrap text-[color:var(--muted)]">{b.date}</td>
                    <td>
                      <div className="flex gap-2">
                        <Link href={`/admin/blogs/${b.id}/edit`} className="icon-btn" aria-label="Edit" style={{ color: "var(--sky-dark)", borderColor: "var(--line)" }}>
                          <Pencil width={15} height={15} />
                        </Link>
                        <DeleteButton action={deleteBlog.bind(null, b.id)} confirmText={`Delete "${b.title}"?`} />
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
