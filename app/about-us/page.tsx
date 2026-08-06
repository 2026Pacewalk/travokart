import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { whyChoose, homeStats, homeFaqs } from "@/lib/content";
import { site } from "@/lib/site";
import Faq from "@/components/Faq";
import { Sparkle, Calendar, Plane, Shield, Check, ArrowRight } from "@/components/Icons";

const featureIcons = { sparkle: Sparkle, calendar: Calendar, plane: Plane, shield: Shield };

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Explore Travokart Vocations LLP is a customer-centric travel company serving Tricity & North India, offering curated domestic and international tour packages with end-to-end travel solutions.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Travokart",
    description: "A customer-centric travel company serving Tricity & North India with curated tour packages.",
    url: "/about-us",
    images: [{ url: "/media/2025/12/maldives-2.jpg", alt: "About Explore Travokart Vocations LLP" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Travokart"
        subtitle="A travel marketplace created to link tourists with unique tour packages and life-changing travel experiences."
        image="/media/2025/12/maldives-2.jpg"
        crumbs={[{ label: "About Us" }]}
      />

      <section className="container-tk py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-2 gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/2025/12/thailand-2.jpg" alt="Thailand tour package by Travokart" className="rounded-2xl h-72 w-full object-cover shadow-[var(--shadow-card)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/2025/12/bali-1.jpg" alt="Bali holiday package by Travokart" className="rounded-2xl h-72 w-full object-cover mt-8 shadow-[var(--shadow-card)]" />
        </div>
        <div>
          <span className="inline-flex items-center gap-2 text-brand-dark font-bold text-xs uppercase tracking-widest mb-3">
            <span className="w-6 h-0.5 bg-brand rounded" />
            Who We Are
          </span>
          <h2 className="text-[19px] sm:text-[28px] font-extrabold text-ink leading-tight tracking-tight">
            About <span className="whitespace-nowrap">Explore Travokart Vocations LLP</span>
          </h2>
          <div className="text-muted leading-relaxed mt-4 space-y-4">
            <p>
              <strong className="text-ink">Explore Travokart Vocations LLP</strong> is a
              professionally managed travel and tourism company headquartered in Panchkula, serving
              travellers across Tricity and North India. Since our inception, we have been driven by
              a single commitment — to make quality travel accessible, transparent, and truly
              memorable. We combine local expertise with a global network of trusted partners to
              deliver holidays that consistently exceed expectations.
            </p>
            <p>
              As a full-service travel organisation, we design and operate a comprehensive portfolio
              of domestic and international tour packages — spanning leisure holidays, family
              vacations, honeymoons, corporate group tours, and bespoke itineraries. Every programme
              is engineered around our clients&apos; preferences and budgets, backed by end-to-end
              solutions covering accommodation, transfers, sightseeing, and on-ground support.
            </p>
            <p>
              Our philosophy is built on <strong className="text-ink">integrity, reliability, and
              customer-first service</strong>. From the first enquiry to the final farewell, our
              experienced travel consultants ensure a seamless, stress-free journey — so that every
              trip with Travokart becomes an experience our clients are proud to recommend.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-brand-soft/60 border border-brand-soft rounded-2xl p-5">
              <h3 className="font-bold text-ink mb-1.5 flex items-center gap-2">
                <Sparkle width={17} height={17} className="text-brand-dark" /> Our Mission
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                To craft thoughtfully curated, value-driven travel experiences that turn every
                journey into a lasting memory.
              </p>
            </div>
            <div className="bg-sky-soft/60 border border-sky-soft rounded-2xl p-5">
              <h3 className="font-bold text-ink mb-1.5 flex items-center gap-2">
                <Plane width={17} height={17} className="text-sky-dark" /> Our Vision
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                To be North India&apos;s most trusted travel partner, recognised for service
                excellence and genuine care for every traveller.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-6">
            {[
              "Domestic & International Packages",
              "End-to-End Travel Solutions",
              "Transparent & Competitive Pricing",
              "Customized Itineraries",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2.5">
                <span className="grid place-items-center w-7 h-7 rounded-full bg-sky-soft text-sky-dark shrink-0">
                  <Check width={15} height={15} />
                </span>
                <span className="font-semibold text-ink text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-ink text-white">
        <div className="container-tk py-14 grid grid-cols-3 gap-6 text-center">
          {homeStats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl md:text-5xl font-extrabold text-brand">{s.value}</div>
              <div className="text-white/70 text-sm mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose */}
      <section className="container-tk py-16">
        <SectionHeading center eyebrow="Why Travokart" title="Why Choose Travokart" />
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
      </section>

      {/* FAQ */}
      <section className="bg-cloud">
        <div className="container-tk py-16 grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
          <div>
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              subtitle="All the information you require on Travokart travel services, destinations, and trips."
            />
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="container-tk pb-4">
        <div className="bg-brand-soft rounded-3xl px-8 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-ink">Let&apos;s Plan Your Dream Trip</h2>
          <p className="text-muted mt-2 max-w-xl mx-auto">
            Talk to our travel experts and get a personalised holiday package today.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/contact-us" className="btn btn-primary">Contact Us <ArrowRight width={18} height={18} /></Link>
            <a href={site.phoneHref} className="btn btn-outline">Call {site.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
