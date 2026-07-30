import type { Metadata } from "next";
import Link from "next/link";
import { tours, categories } from "@/lib/data";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";

export const metadata: Metadata = {
  title: "All Tour Packages",
  description: "Browse all domestic and international tour packages from Travokart.",
};

export default function ToursPage() {
  const popularCats = categories.filter(
    (c) => !["domestic", "international"].includes(c.slug) && c.count > 0
  );

  return (
    <>
      <PageHero
        title="Explore All Tours"
        subtitle="Handpicked domestic and international holiday packages, crafted to be comfortable, affordable and unforgettable."
        image="/media/2025/12/thailand-2.jpg"
        crumbs={[{ label: "Tours" }]}
      />

      {/* Category chips */}
      <div className="border-b border-line bg-white sticky top-[74px] z-30">
        <div className="container-tk py-4 flex gap-2.5 overflow-x-auto no-scrollbar">
          <span className="btn btn-primary py-2 px-4 text-[13px] shrink-0">All Tours</span>
          {popularCats.map((c) => (
            <Link
              key={c.slug}
              href={`/tour_category/${c.slug}`}
              className="btn btn-outline py-2 px-4 text-[13px] shrink-0"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <section className="container-tk py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted">
            Showing <span className="font-bold text-ink">{tours.length}</span> tour packages
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {tours.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </div>
      </section>
    </>
  );
}
