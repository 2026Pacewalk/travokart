import Link from "next/link";
import type { Blog } from "@/lib/types";
import { mediaUrl } from "@/lib/data";
import { Calendar, ArrowRight } from "./Icons";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/${blog.slug}`}
      className="group card-lift block bg-white rounded-2xl overflow-hidden border border-line shadow-[var(--shadow-soft)]"
    >
      <div className="relative h-48 overflow-hidden bg-cloud">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaUrl(blog.featured_image)}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {blog.categories?.[0] && (
          <span className="absolute top-3 left-3 bg-white/95 text-brand-dark text-[11px] font-bold px-3 py-1 rounded-full">
            {blog.categories[0].name}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-muted text-xs mb-2">
          <Calendar width={13} height={13} /> {blog.date}
        </div>
        <h3 className="font-bold text-ink leading-snug clamp-2 group-hover:text-brand-dark transition-colors">
          {blog.title}
        </h3>
        {blog.excerpt && <p className="text-muted text-sm mt-2 clamp-2">{blog.excerpt}</p>}
        <span className="inline-flex items-center gap-1.5 text-brand-dark font-bold text-sm mt-4 group-hover:gap-2.5 transition-all">
          Read More <ArrowRight width={15} height={15} />
        </span>
      </div>
    </Link>
  );
}
