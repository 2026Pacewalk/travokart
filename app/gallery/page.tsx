import type { Metadata } from "next";
import { tours, mediaUrl } from "@/lib/data";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "A glimpse of the destinations and experiences we craft at Travokart.",
};

export default function GalleryPage() {
  // Collect a unique set of images across all tour galleries.
  const seen = new Set<string>();
  const images: { src: string; alt: string }[] = [];
  for (const t of tours) {
    for (const g of t.gallery) {
      const src = mediaUrl(g);
      if (!seen.has(src)) {
        seen.add(src);
        images.push({ src, alt: t.title });
      }
    }
  }
  const shown = images.slice(0, 40);

  return (
    <>
      <PageHero
        title="Travel Gallery"
        subtitle="A glimpse of the beautiful destinations and experiences we craft for our travellers."
        image="/media/2025/12/bali-1.jpg"
        crumbs={[{ label: "Gallery" }]}
      />
      <section className="container-tk py-12">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {shown.map((img, i) => (
            <div key={i} className="mb-4 break-inside-avoid rounded-2xl overflow-hidden card-lift">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
