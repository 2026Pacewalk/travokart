import type { Metadata } from "next";
import Link from "next/link";
import { blogsWithImages, mediaUrl, readTime, formatDate, authorName } from "@/lib/data";
import PageHero from "@/components/PageHero";
import BlogsExplorer from "@/components/BlogsExplorer";
import { Calendar, Clock, User, ArrowRight } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Travel Blog",
  description: "Travel tips, destination guides and inspiration from the Travokart team.",
};

export default function BlogsPage() {
  const posts = blogsWithImages();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <PageHero
        title="Travokart Travel Blog"
        subtitle="Travel tips, destination guides and inspiration for your next unforgettable journey."
        image="/media/2025/12/bali-1.jpg"
        crumbs={[{ label: "Blogs" }]}
      />

      <section className="container-tk py-12">
        {/* Featured lead post */}
        {featured && (
          <Link href={`/${featured.slug}`} className="blog-featured group mb-12">
            <div className="bf-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mediaUrl(featured.featured_image)} alt={featured.title} />
              {featured.categories?.[0] && <span className="bf-badge">{featured.categories[0].name}</span>}
            </div>
            <div className="bf-body">
              <span className="bf-eyebrow">★ Featured Story</span>
              <h2 className="bf-title group-hover:text-[color:var(--brand-dark)] transition-colors">{featured.title}</h2>
              <p className="bf-excerpt">{featured.excerpt.replace(/\[&hellip;\]|\[…\]/g, "…")}</p>
              <div className="blog-meta mb-5">
                <span><Calendar width={14} height={14} /> {formatDate(featured.date)}</span>
                <span><Clock width={14} height={14} /> {readTime(featured.content)} min read</span>
                <span><User width={14} height={14} /> {authorName(featured.author)}</span>
              </div>
              <span className="btn btn-primary w-fit">Read Full Story <ArrowRight width={17} height={17} /></span>
            </div>
          </Link>
        )}

        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[color:var(--brand-dark)] font-extrabold text-xs uppercase tracking-widest">Latest Articles</span>
            <h2 className="text-2xl font-extrabold text-[color:var(--ink)] mt-1">Explore Our Stories</h2>
          </div>
        </div>

        <BlogsExplorer blogs={rest} />
      </section>
    </>
  );
}
