"use client";

import { useMemo, useState } from "react";
import type { Blog } from "@/lib/types";
import BlogCard from "./BlogCard";

export default function BlogsExplorer({ blogs }: { blogs: Blog[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => b.categories?.forEach((c) => set.add(c.name)));
    return ["All", ...Array.from(set)];
  }, [blogs]);

  const [active, setActive] = useState("All");
  const filtered = active === "All" ? blogs : blogs.filter((b) => b.categories?.some((c) => c.name === active));

  return (
    <>
      <div className="blog-filter mb-8">
        {categories.map((c) => (
          <button key={c} className={active === c ? "active" : ""} onClick={() => setActive(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((b) => (
          <BlogCard key={b.slug} blog={b} />
        ))}
      </div>
    </>
  );
}
