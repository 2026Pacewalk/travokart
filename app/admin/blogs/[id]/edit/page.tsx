import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-session";
import { getBlogRowById } from "@/lib/db-content";
import AdminShell from "@/components/admin/AdminShell";
import BlogForm from "@/components/admin/BlogForm";
import { updateBlog } from "../../actions";
import { ArrowRight } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const email = await requireAdmin();
  const { id } = await params;
  const row = await getBlogRowById(Number(id));
  if (!row) notFound();

  const action = updateBlog.bind(null, row.id);

  return (
    <AdminShell
      email={email}
      title="Edit Blog Post"
      actions={
        <div className="flex items-center gap-3">
          <Link href={`/${row.slug}`} target="_blank" className="text-[13px] font-semibold text-[color:var(--sky-dark)]">View</Link>
          <Link href="/admin/blogs" className="text-[13px] font-semibold text-[color:var(--muted)] inline-flex items-center gap-1"><ArrowRight width={14} height={14} className="rotate-180" /> Back</Link>
        </div>
      }
    >
      <BlogForm action={action} initial={row} />
    </AdminShell>
  );
}
