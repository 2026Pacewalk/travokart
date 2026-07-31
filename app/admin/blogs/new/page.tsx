import Link from "next/link";
import { requireAdmin } from "@/lib/admin-session";
import AdminShell from "@/components/admin/AdminShell";
import BlogForm from "@/components/admin/BlogForm";
import { createBlog } from "../actions";
import { ArrowRight } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function NewBlogPage() {
  const email = await requireAdmin();
  return (
    <AdminShell
      email={email}
      title="New Blog Post"
      actions={<Link href="/admin/blogs" className="text-[13px] font-semibold text-[color:var(--muted)] inline-flex items-center gap-1"><ArrowRight width={14} height={14} className="rotate-180" /> Back</Link>}
    >
      <BlogForm action={createBlog} />
    </AdminShell>
  );
}
