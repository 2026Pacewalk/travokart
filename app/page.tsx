import Link from "next/link";
import { tours, categories } from "@/lib/data";
import { site } from "@/lib/site";
import { homeFaqs, testimonials, whyChoose, homeStats } from "@/lib/content";
import HeroSearch from "@/components/HeroSearch";
import TourCard from "@/components/TourCard";
import CategoryCard from "@/components/CategoryCard";
import SectionHeading from "@/components/SectionHeading";
import Faq from "@/components/Faq";
import { Star, Sparkle, Calendar, Plane, Shield, Check, ArrowRight } from "@/components/Icons";

const featureIcons = { sparkle: Sparkle, calendar: Calendar, plane: Plane, shield: Shield };

export default function Home() {
  const featuredTours = tours.slice(0, 8);
  const popularCats = categories.filter(
    (c) => !["domestic", "international", "more-packages"].includes(c.slug) && c.count > 0
  );

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="relative">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/2025/12/bora-bora-pics.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/25" />
        </div>

        <div className="relative container-tk pt-20 pb-40 md:pt-28 md:pb-48">
          <div className="max-w-2xl text-white fade-up">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <Plane width={14} height={14} className="text-brand" /> {site.tagline}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Explore Exclusive <span className="text-gradient">Tour Packages</span> with Travokart
            </h1>
            <p className="mt-5 text-lg text-white/85 max-w-xl">
              Explore carefully chosen trips in popular locations that are made to be comfortable,
              affordable, and unforgettable.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/tours" className="btn btn-primary">
                Explore Tours <ArrowRight width={18} height={18} />
              </Link>
              <Link href="/contact-us" className="btn bg-white/15 backdrop-blur border border-white/25 text-white hover:bg-white/25">
                Plan My Trip
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex text-brand">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} width={16} height={16} />
                  ))}
                </div>
                <span className="font-semibold">5.0 · 100+ Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar overlapping */}
        <div className="relative container-tk -mt-24 md:-mt-20 pb-4 z-10">
          <HeroSearch />
        </div>
      </section>

      {/* ---------------- POPULAR DESTINATIONS ---------------- */}
      <section className="container-tk pt-16">
        <SectionHeading
          eyebrow="Top Destinations"
          title="Popular Destinations to Explore"
          subtitle="Handpicked domestic and international destinations loved by our travellers."
          linkHref="/tours"
          linkLabel="View All"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {popularCats.slice(0, 8).map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* ---------------- FEATURED TOURS ---------------- */}
      <section className="container-tk pt-16">
        <SectionHeading
          eyebrow="Trending Now"
          title="Find the Latest Tours Across the Globe"
          subtitle="A travel marketplace created to link tourists with unique tour packages and life-changing travel experiences."
          linkHref="/tours"
          linkLabel="View All Tours"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {featuredTours.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </div>
      </section>

      {/* ---------------- WHY CHOOSE ---------------- */}
      <section className="bg-cloud mt-16">
        <div className="container-tk py-16">
          <SectionHeading
            center
            eyebrow="Why Travokart"
            title="Why Choose Travokart"
            subtitle="To guarantee a stress-free travel experience, Travokart offers dependable travel services, well chosen tour packages, and total assistance."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {whyChoose.map((f) => {
              const Icon = featureIcons[f.icon];
              return (
                <div key={f.title} className="bg-white rounded-2xl p-6 border border-line card-lift">
                  <div className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-soft text-brand-dark mb-4">
                    <Icon width={26} height={26} />
                  </div>
                  <h3 className="font-bold text-lg text-ink mb-2">{f.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT + STATS ---------------- */}
      <section className="container-tk py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/2025/12/maldives-2.jpg" alt="Maldives" className="rounded-2xl h-64 w-full object-cover shadow-[var(--shadow-card)]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/2025/12/thailand-2.jpg" alt="Thailand" className="rounded-2xl h-64 w-full object-cover mt-8 shadow-[var(--shadow-card)]" />
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-[var(--shadow-card)] px-6 py-4 flex items-center gap-3 border border-line">
              <span className="grid place-items-center w-11 h-11 rounded-full bg-brand text-white font-extrabold">5.0</span>
              <div className="text-sm">
                <div className="font-bold text-ink">Excellent</div>
                <div className="text-muted text-xs">Based on 12+ Google reviews</div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="About Us"
              title="About Explore Travokart Vocations LLP"
              subtitle="The Explore Travokart Vocations LLP Travels & Holidays provides clients top-notch services and exclusive deals in Holiday Packages (Domestic as well as International) with Flight Bookings. We are counted among the best travel agencies in Panchkula because of our finest services."
            />
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                { t: "Convenient Locations", d: "Simple options for pick-up and drop-off make traveling hassle-free." },
                { t: "Customer-Centric Service", d: "Amiable assistance to help you at every stage of the process." },
              ].map((x) => (
                <div key={x.t} className="flex gap-3">
                  <span className="grid place-items-center w-9 h-9 rounded-full bg-sky-soft text-sky-dark shrink-0">
                    <Check width={16} height={16} />
                  </span>
                  <div>
                    <div className="font-bold text-ink text-sm">{x.t}</div>
                    <div className="text-muted text-xs mt-0.5">{x.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-line">
              {homeStats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold text-brand-dark">{s.value}</div>
                  <div className="text-muted text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/about-us" className="btn btn-primary">
                Read More <ArrowRight width={18} height={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="bg-cloud">
        <div className="container-tk py-16 grid lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              subtitle="All the information you require on Travokart travel services, destinations, and trips."
            />
            <div className="mt-6 bg-white rounded-2xl p-6 border border-line">
              <p className="text-sm text-muted">Still have questions?</p>
              <a href={site.phoneHref} className="text-xl font-extrabold text-brand-dark">{site.phone}</a>
              <Link href="/contact-us" className="btn btn-outline w-full mt-4">Contact Support</Link>
            </div>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="container-tk py-16">
        <SectionHeading
          center
          eyebrow="Testimonials"
          title="What Our Travelers Say"
          subtitle="Explore Travokart Vocations LLP — rated 5.0 based on 12 Google reviews."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {testimonials.map((r) => (
            <div key={r.name} className="bg-white rounded-2xl p-6 border border-line shadow-[var(--shadow-soft)]">
              <div className="flex text-brand mb-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} width={16} height={16} />
                ))}
              </div>
              <p className="text-charcoal text-sm leading-relaxed clamp-3 min-h-[63px]">{r.text}</p>
              <div className="flex items-center gap-3 mt-5 pt-5 border-t border-line">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br from-brand to-accent text-white font-extrabold">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <div className="font-bold text-ink text-sm">{r.name}</div>
                  <div className="text-muted text-xs">{r.when}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="container-tk pb-4">
        <div className="relative rounded-3xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/2025/12/bali-1.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 to-brand-dark/70" />
          <div className="relative px-8 py-14 md:px-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold">Ready for Your Next Adventure?</h2>
            <p className="mt-3 text-white/85 max-w-xl mx-auto">
              Let our travel experts craft a personalised itinerary for your dream destination.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link href="/contact-us" className="btn btn-primary">Get a Free Quote</Link>
              <a href={site.phoneHref} className="btn bg-white text-ink hover:bg-white/90">Call {site.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
