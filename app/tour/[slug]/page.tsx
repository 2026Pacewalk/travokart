import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  mediaUrl,
  tourImage,
  formatPrice,
  durationLabel,
  getItinerary,
} from "@/lib/data";
import { getTourBySlug, toursInCategoryDb, getTours } from "@/lib/db-content";
import { site } from "@/lib/site";
import PageHero from "@/components/PageHero";
import TourCard from "@/components/TourCard";
import { MapPin, Clock, Users, Check, XMark, Star, Phone, ArrowRight, Sparkle, Whatsapp } from "@/components/Icons";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) return { title: "Tour" };
  const desc =
    (tour.excerpt?.slice(0, 155) ||
      `Book the ${tour.title} tour package with Travokart.`).replace(/\s+\S*$/, "") + "…";
  const img = tourImage(tour);
  const path = `/tour/${tour.slug}`;
  return {
    title: `${tour.title} Tour Package`,
    description: desc,
    alternates: { canonical: path },
    openGraph: { title: tour.title, description: desc, url: path, type: "article", images: [{ url: img, alt: tour.title }] },
    twitter: { title: tour.title, description: desc, images: [img] },
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const price = formatPrice(tour.product_price || tour.price);
  const duration = durationLabel(tour);
  const itinerary = getItinerary(tour);
  const gallery = tour.gallery.slice(0, 6).map(mediaUrl);
  const place = [...new Set([tour.city, tour.state].filter(Boolean))].join(", ") || tour.destination;
  const cat = tour.categories?.[0];
  const related = (cat ? await toursInCategoryDb(cat.slug) : await getTours())
    .filter((t) => t.slug !== tour.slug)
    .slice(0, 4);

  // Pre-filled WhatsApp enquiry so the admin instantly knows the request.
  // Plain text (no emojis) to render reliably across all devices.
  const waMessage =
    `Hi Travokart! I'd like to enquire about this tour package.\n\n` +
    `Tour: ${tour.title}\n` +
    (place ? `Location: ${place}\n` : "") +
    (duration ? `Duration: ${duration}\n` : "") +
    (price ? `Price: From ${price} per person\n` : "") +
    `Link: https://travokart.com/tour/${tour.slug}\n\n` +
    `Please share availability and booking details. Thank you!`;
  const waHref = `https://wa.me/919872889763?text=${encodeURIComponent(waMessage)}`;

  return (
    <>
      <PageHero
        title={tour.title}
        image={tourImage(tour)}
        crumbs={[
          { label: "Tours", href: "/tours" },
          ...(cat ? [{ label: cat.name, href: `/tour_category/${cat.slug}` }] : []),
          { label: tour.title },
        ]}
      />

      {/* Quick facts bar */}
      <div className="bg-white border-b border-line">
        <div className="container-tk py-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          {place && (
            <span className="inline-flex items-center gap-2 text-charcoal">
              <MapPin width={16} height={16} className="text-accent" /> {place}
            </span>
          )}
          {duration && (
            <span className="inline-flex items-center gap-2 text-charcoal">
              <Clock width={16} height={16} className="text-sky" /> {duration}
            </span>
          )}
          {tour.people_limit && (
            <span className="inline-flex items-center gap-2 text-charcoal">
              <Users width={16} height={16} className="text-brand" /> Up to {tour.people_limit} guests
            </span>
          )}
          <span className="inline-flex items-center gap-2 text-charcoal">
            <Star width={16} height={16} className="text-brand" /> 5.0 (Trending)
          </span>
        </div>
      </div>

      <section className="container-tk py-12 grid lg:grid-cols-[1.6fr_1fr] gap-10 items-start">
        {/* MAIN */}
        <div>
          {/* Gallery */}
          {gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mb-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gallery[0]}
                alt={tour.title}
                className="col-span-4 sm:col-span-2 row-span-2 h-full min-h-[260px] w-full object-cover rounded-2xl"
              />
              {gallery.slice(1, 5).map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={g}
                  alt={`${tour.title} ${i + 2}`}
                  className="col-span-2 sm:col-span-1 h-32 sm:h-[125px] w-full object-cover rounded-xl"
                />
              ))}
            </div>
          )}

          {/* Overview */}
          {tour.excerpt && (
            <div className="mb-10">
              <h2 className="text-2xl font-extrabold text-ink mb-3">Overview</h2>
              <p className="text-muted leading-relaxed whitespace-pre-line">{tour.excerpt}</p>
            </div>
          )}

          {/* Itinerary */}
          {itinerary.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-extrabold text-ink mb-5">Tour Itinerary</h2>
              <div className="relative border-l-2 border-dashed border-brand/40 ml-3 pl-8 space-y-6">
                {itinerary.map((day, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[42px] grid place-items-center w-8 h-8 rounded-full bg-brand text-white text-xs font-extrabold">
                      {i + 1}
                    </span>
                    <div className="bg-white rounded-2xl border border-line p-5 shadow-[var(--shadow-soft)]">
                      <h3 className="font-bold text-ink mb-2">{day.title || `Day ${i + 1}`}</h3>
                      <p className="text-muted text-sm leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Includes / Excludes */}
          {(tour.includes.length > 0 || tour.excludes.length > 0) && (
            <div className="grid sm:grid-cols-2 gap-6">
              {tour.includes.length > 0 && (
                <div className="bg-white rounded-2xl border border-line p-6">
                  <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
                    <span className="grid place-items-center w-7 h-7 rounded-full bg-emerald-100 text-emerald-600">
                      <Check width={15} height={15} />
                    </span>
                    What&apos;s Included
                  </h3>
                  <ul className="space-y-2.5">
                    {tour.includes.map((x) => (
                      <li key={x.slug} className="flex gap-2 text-sm text-charcoal">
                        <Check width={16} height={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        {x.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tour.excludes.length > 0 && (
                <div className="bg-white rounded-2xl border border-line p-6">
                  <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
                    <span className="grid place-items-center w-7 h-7 rounded-full bg-red-100 text-accent">
                      <XMark width={15} height={15} />
                    </span>
                    What&apos;s Excluded
                  </h3>
                  <ul className="space-y-2.5">
                    {tour.excludes.map((x) => (
                      <li key={x.slug} className="flex gap-2 text-sm text-charcoal">
                        <XMark width={16} height={16} className="text-accent shrink-0 mt-0.5" />
                        {x.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-24 space-y-5">
          <div className="bg-white rounded-2xl border border-line shadow-[var(--shadow-card)] p-6">
            {price && (
              <>
                <div className="text-sm text-muted">Starting from</div>
                <div className="text-4xl font-extrabold text-brand-dark">{price}</div>
                <div className="text-xs text-muted mb-5">per person</div>
              </>
            )}
            <ul className="space-y-3 text-sm border-t border-line pt-5">
              {duration && (
                <li className="flex justify-between">
                  <span className="text-muted flex items-center gap-2"><Clock width={15} height={15} /> Duration</span>
                  <span className="font-semibold text-ink">{duration}</span>
                </li>
              )}
              {place && (
                <li className="flex justify-between">
                  <span className="text-muted flex items-center gap-2"><MapPin width={15} height={15} /> Location</span>
                  <span className="font-semibold text-ink text-right">{place}</span>
                </li>
              )}
              {tour.people_limit && (
                <li className="flex justify-between">
                  <span className="text-muted flex items-center gap-2"><Users width={15} height={15} /> Group size</span>
                  <span className="font-semibold text-ink">{tour.people_limit}</span>
                </li>
              )}
            </ul>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn w-full mt-6" style={{ background: "#25d366", color: "#fff", boxShadow: "0 10px 22px rgba(37,211,102,.32)" }}>
              <Whatsapp width={19} height={19} /> Book on WhatsApp
            </a>
            <a href={site.phoneHref} className="btn btn-primary w-full mt-3">
              Book This Tour <ArrowRight width={18} height={18} />
            </a>
            <a href={site.phoneHref} className="btn btn-outline w-full mt-3">
              <Phone width={16} height={16} /> {site.phone}
            </a>
          </div>

          <div className="bg-gradient-to-br from-sky to-sky-dark rounded-2xl p-6 text-white">
            <Sparkle width={26} height={26} className="mb-3" />
            <h3 className="font-bold text-lg">Need a custom itinerary?</h3>
            <p className="text-white/85 text-sm mt-1">
              Our experts will tailor this trip to your dates, budget and travel style.
            </p>
            <Link href="/contact-us" className="btn w-full mt-4" style={{ background: "#fff", color: "var(--sky-dark)" }}>Enquire Now</Link>
          </div>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cloud">
          <div className="container-tk py-14">
            <h2 className="text-2xl font-extrabold text-ink mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((t) => (
                <TourCard key={t.id} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
