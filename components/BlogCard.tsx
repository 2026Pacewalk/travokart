import Link from "next/link";
import type { Blog } from "@/lib/types";
import { mediaUrl, readTime, formatDate, authorName } from "@/lib/data";
import { Calendar, Clock, ArrowRight, User } from "./Icons";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/${blog.slug}`} className="blog-card group">
      <div className="blog-card-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mediaUrl(blog.featured_image)} alt={blog.title} loading="lazy" />
        {blog.categories?.[0] && <span className="blog-cat">{blog.categories[0].name}</span>}
        <span className="blog-read"><Clock width={12} height={12} /> {readTime(blog.content)} min</span>
      </div>
      <div className="blog-card-body">
        <div className="blog-meta">
          <span><Calendar width={13} height={13} /> {formatDate(blog.date)}</span>
          <span><User width={13} height={13} /> {authorName(blog.author)}</span>
        </div>
        <h3 className="blog-title">{blog.title}</h3>
        {blog.excerpt && <p className="blog-excerpt">{blog.excerpt.replace(/\[&hellip;\]|\[…\]/g, "…")}</p>}
        <span className="blog-more">Read Article <ArrowRight width={15} height={15} /></span>
      </div>
    </Link>
  );
}
