import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { blogs, blogBySlug, mediaUrl, rewriteHtml, readTime, formatDate } from "@/lib/data";
import { site } from "@/lib/site";
import BlogCard from "@/components/BlogCard";
import { Calendar, Clock, ArrowRight, Chevron, Facebook, Whatsapp, Mail, Sparkle } from "@/components/Icons";

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

  const related = blogs.filter((b) => b.slug !== blog.slug && b.featured_image).slice(0, 3);
  const url = `https://travokart.com/${blog.slug}`;
  const cat = blog.categories?.[0]?.name;
  const shares = [
    { I: Facebook, net: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { I: Whatsapp, net: "Whatsapp", href: `https://wa.me/?text=${encodeURIComponent(blog.title + " " + url)}` },
    { I: Mail, net: "Email", href: `mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(url)}` },
  ];

  return (
    <>
      {/* Feature-image hero */}
      <section className="article-hero">
        <div className="ah-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mediaUrl(blog.featured_image)} alt={blog.title} />
        </div>
        <div className="ah-ov" />
        <div className="ah-inner">
          <div className="container-tk">
            <nav className="flex items-center gap-1.5 text-sm text-white/70 mb-5">
              <Link href="/" className="hover:text-brand">Home</Link>
              <Chevron width={14} height={14} className="-rotate-90 text-white/40" />
              <Link href="/blogs" className="hover:text-brand">Blogs</Link>
            </nav>
            {cat && <span className="article-cat">{cat}</span>}
            <h1 className="article-title">{blog.title}</h1>
            <div className="article-meta">
              <span>
                <span className="am-av">{(blog.author || "T").charAt(0)}</span>
                {blog.author || "Travokart"}
              </span>
              <span><Calendar width={16} height={16} /> {formatDate(blog.date)}</span>
              <span><Clock width={16} height={16} /> {readTime(blog.content)} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-tk py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-5xl mx-auto">
          {/* Article */}
          <article>
            <div className="prose-tk" dangerouslySetInnerHTML={{ __html: rewriteHtml(blog.content) }} />

            {/* Share */}
            <div className="flex items-center gap-4 mt-10 pt-8 border-t border-[color:var(--line)]">
              <span className="font-bold text-[color:var(--ink)]">Share this article</span>
              <div className="share-row">
                {shares.map((s) => (
                  <a key={s.net} href={s.href} target="_blank" rel="noopener noreferrer" data-net={s.net} aria-label={`Share on ${s.net}`}>
                    <s.I width={17} height={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Author card */}
            <div className="author-card mt-8">
              <span className="ac-av">{(blog.author || "T").charAt(0)}</span>
              <div>
                <div className="text-[color:var(--muted)] text-xs font-semibold uppercase tracking-wide">Written by</div>
                <div className="font-extrabold text-[color:var(--ink)] text-lg">{blog.author || "Travokart Team"}</div>
                <p className="text-[color:var(--muted)] text-sm mt-1">Travel experts at Travokart, sharing tips and inspiration to make your journeys unforgettable.</p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gradient-to-br from-[color:var(--brand)] to-[color:var(--brand-dark)] rounded-2xl p-6 text-white">
                <Sparkle width={26} height={26} className="mb-3" />
                <h3 className="font-extrabold text-lg leading-tight">Ready to travel?</h3>
                <p className="text-white/85 text-sm mt-1">Browse handpicked tour packages and plan your next trip.</p>
                <Link href="/tours" className="btn bg-white text-[color:var(--brand-dark)] w-full mt-4">Explore Tours</Link>
              </div>
              <div className="bg-white rounded-2xl border border-[color:var(--line)] p-6">
                <h3 className="font-bold text-[color:var(--ink)] mb-2">Need help planning?</h3>
                <p className="text-[color:var(--muted)] text-sm mb-4">Talk to our travel experts today.</p>
                <a href={site.phoneHref} className="font-extrabold text-[color:var(--brand-dark)]">{site.phone}</a>
                <Link href="/contact-us" className="btn btn-outline w-full mt-3">Contact Us</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[color:var(--cloud)]">
          <div className="container-tk py-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[color:var(--brand-dark)] font-extrabold text-xs uppercase tracking-widest">Keep Reading</span>
                <h2 className="text-2xl font-extrabold text-[color:var(--ink)] mt-1">More Travel Stories</h2>
              </div>
              <Link href="/blogs" className="inline-flex items-center gap-2 text-[color:var(--brand-dark)] font-bold text-sm">All Articles <ArrowRight width={16} height={16} /></Link>
            </div>
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
