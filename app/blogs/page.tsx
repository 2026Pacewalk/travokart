import type { Metadata } from "next";
import { blogs } from "@/lib/data";
import PageHero from "@/components/PageHero";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Travel Blogs",
  description: "Travel tips, destination guides and stories from the Travokart team.",
};

export default function BlogsPage() {
  return (
    <>
      <PageHero
        title="Travokart Travel Blog"
        subtitle="Travel tips, destination guides and inspiration for your next journey."
        image="/media/2025/12/bali-1.jpg"
        crumbs={[{ label: "Blogs" }]}
      />
      <section className="container-tk py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((b) => (
            <BlogCard key={b.slug} blog={b} />
          ))}
        </div>
      </section>
    </>
  );
}
