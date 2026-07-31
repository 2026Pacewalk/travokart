import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { categories, categoryBySlug, toursInCategory, categoryImage } from "@/lib/data";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";
import { MapPin } from "@/components/Icons";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) return { title: "Category" };
  const count = toursInCategory(slug).length;
  const desc =
    cat.description ||
    `Explore ${count}+ handpicked ${cat.name} tour packages with Travokart — comfortable, affordable and unforgettable holidays.`;
  const img = categoryImage(cat);
  const path = `/tour_category/${cat.slug}`;
  return {
    title: `${cat.name} Tour Packages`,
    description: desc,
    alternates: { canonical: path },
    openGraph: { title: `${cat.name} Tour Packages`, description: desc, url: path, images: [{ url: img, alt: `${cat.name} tour packages` }] },
    twitter: { title: `${cat.name} Tour Packages`, description: desc, images: [img] },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  if (!cat) notFound();

  const catTours = toursInCategory(slug);

  return (
    <>
      <PageHero
        title={`${cat.name} Tour Packages`}
        subtitle={cat.description || `Discover our handpicked ${cat.name} holiday packages.`}
        image={categoryImage(cat)}
        crumbs={[{ label: "Tours", href: "/tours" }, { label: cat.name }]}
      />

      <section className="container-tk py-12">
        <div className="flex items-center gap-2 text-muted mb-8">
          <MapPin width={18} height={18} className="text-brand" />
          <span className="font-bold text-ink">{catTours.length}</span>
          {catTours.length === 1 ? "tour" : "tours"} found in {cat.name}
        </div>

        {catTours.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {catTours.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted">
            No tours in this category yet. Please check back soon.
          </div>
        )}
      </section>
    </>
  );
}
