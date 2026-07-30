import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogs, blogBySlug, mediaUrl, rewriteHtml } from "@/lib/data";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";
import { Calendar, Users } from "@/components/Icons";

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogBySlug(slug);
  if (!blog) return { title: "Not Found" };
  return { title: blog.title, description: blog.excerpt?.slice(0, 160) };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = blogBySlug(slug);
  if (!blog) notFound();

  const related = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3);

  return (
    <>
      <PageHero
        title={blog.title}
        image={mediaUrl(blog.featured_image)}
        crumbs={[{ label: "Blogs", href: "/blogs" }, { label: blog.title }]}
      />

      <article className="container-tk py-12 max-w-3xl">
        <div className="flex items-center gap-5 text-sm text-muted border-b border-line pb-6 mb-8">
          <span className="inline-flex items-center gap-2">
            <Calendar width={15} height={15} className="text-brand" /> {blog.date}
          </span>
          {blog.author && (
            <span className="inline-flex items-center gap-2">
              <Users width={15} height={15} className="text-sky" /> {blog.author}
            </span>
          )}
        </div>

        <div
          className="prose-tk"
          dangerouslySetInnerHTML={{ __html: rewriteHtml(blog.content) }}
        />
      </article>

      {related.length > 0 && (
        <section className="bg-cloud">
          <div className="container-tk py-14">
            <h2 className="text-2xl font-extrabold text-ink mb-8">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((b) => (
                <BlogCard key={b.slug} blog={b} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
