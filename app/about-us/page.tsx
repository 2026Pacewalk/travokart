import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { whyChoose, homeStats, homeFaqs } from "@/lib/content";
import { site } from "@/lib/site";
import Faq from "@/components/Faq";
import { Sparkle, Calendar, Plane, Shield, Check, ArrowRight, Star, Phone, Whatsapp } from "@/components/Icons";

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

      <section className="container-tk py-16 grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start" style={{ overflowX: "clip" }}>
        {/* ---- Creative image collage ---- */}
        <div className="about-collage relative mx-auto w-full max-w-[460px] lg:sticky lg:top-28">
          {/* decorative glows */}
          <span className="pointer-events-none absolute -top-8 -left-8 w-40 h-40 rounded-full bg-brand-soft blur-3xl opacity-70" aria-hidden />
          <span className="pointer-events-none absolute -bottom-10 -right-8 w-48 h-48 rounded-full bg-sky-soft blur-3xl opacity-60" aria-hidden />
          {/* dotted texture */}
          <span
            className="pointer-events-none absolute -top-5 -right-5 w-24 h-24 opacity-60"
            aria-hidden
            style={{
              backgroundImage: "radial-gradient(var(--brand) 1.6px, transparent 1.6px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* main portrait image */}
          <div className="relative rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(6,24,59,.22)] ring-1 ring-black/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/2025/12/about-travokart.jpg"
              alt="Longtail boats at a tropical island beach at sunset — Travokart holidays"
              className="w-full h-[430px] sm:h-[520px] lg:h-[560px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            {/* rating pill */}
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[12px] font-extrabold text-ink shadow-lg">
              <Star width={14} height={14} className="text-brand" /> 5.0 · 100+ Happy Travellers
            </span>
          </div>

          {/* floating secondary image */}
          <div className="hidden sm:block absolute -bottom-9 -left-7 w-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl rotate-[-4deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/2025/12/bali-1.jpg" alt="Bali holiday package by Travokart" className="h-28 w-full object-cover" />
          </div>

          {/* floating stat card */}
          <div className="absolute -bottom-7 right-3 sm:right-5 bg-white rounded-2xl pl-4 pr-5 py-3.5 shadow-xl flex items-center gap-3">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-brand-soft text-brand-dark shrink-0">
              <Plane width={22} height={22} />
            </span>
            <span className="leading-tight">
              <span className="block text-xl font-extrabold text-ink">57+</span>
              <span className="block text-[11px] font-semibold text-muted uppercase tracking-wide">Destinations</span>
            </span>
          </div>
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
              <strong className="text-ink">Explore Travokart Vocations LLP</strong> is a trusted
              travel company based in Panchkula, dedicated to creating unforgettable travel
              experiences across India and around the world. With a passion for travel and a
              commitment to exceptional service, we specialize in planning seamless domestic and
              international holidays tailored to every traveler&apos;s preferences, budget, and
              lifestyle.
            </p>
            <p>
              Whether you&apos;re planning a relaxing family vacation, a romantic honeymoon, an
              adventurous getaway, a corporate tour, or a customized holiday, our experienced travel
              experts ensure every detail is carefully managed. From flight bookings and hotel
              reservations to sightseeing, transportation, visa assistance, and complete itinerary
              planning, we provide end-to-end travel solutions under one roof.
            </p>
            <p>
              At Travokart, we believe every journey should be stress-free, enjoyable, and filled
              with lasting memories. Our customer-first approach, transparent pricing, reliable
              travel partners, and personalized service have earned the trust of travelers across
              Panchkula, Chandigarh, Mohali, and North India.
            </p>
            <p>
              We continuously strive to deliver memorable holidays by combining local expertise,
              global travel knowledge, and carefully curated travel experiences that match the
              unique expectations of every customer.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-brand-soft/60 border border-brand-soft rounded-2xl p-5">
              <h3 className="font-bold text-ink mb-1.5 flex items-center gap-2">
                <Sparkle width={17} height={17} className="text-brand-dark" /> Our Mission
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                To inspire people to explore the world by delivering personalized, affordable, and
                memorable travel experiences through exceptional service, carefully curated holiday
                packages, and complete travel solutions.
              </p>
            </div>
            <div className="bg-sky-soft/60 border border-sky-soft rounded-2xl p-5">
              <h3 className="font-bold text-ink mb-1.5 flex items-center gap-2">
                <Plane width={17} height={17} className="text-sky-dark" /> Our Vision
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                To become one of India&apos;s most trusted and preferred travel companies by setting
                new standards in customer satisfaction, innovation, transparency, and unforgettable
                travel experiences.
              </p>
            </div>
          </div>
          <p className="font-bold text-ink text-base mt-7 mb-1">Why Choose Travokart?</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            {[
              "Domestic & International Holiday Packages",
              "Customized Travel Itineraries",
              "Flight, Hotel & Visa Assistance",
              "Family, Honeymoon & Group Tours",
              "Corporate & Business Travel Solutions",
              "Transparent Pricing with No Hidden Costs",
              "Experienced Travel Consultants",
              "Dedicated Customer Support Throughout Your Journey",
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
      <section className="bg-cloud relative" style={{ overflowX: "clip" }}>
        {/* decorative glows */}
        <span className="pointer-events-none absolute -top-16 -left-20 w-80 h-80 rounded-full bg-brand-soft blur-3xl opacity-50" aria-hidden />
        <span className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-sky-soft blur-3xl opacity-40" aria-hidden />

        <div className="container-tk py-16 lg:py-20 grid lg:grid-cols-[0.82fr_1.18fr] gap-10 lg:gap-14 items-start relative">
          {/* Left sticky panel */}
          <div className="lg:sticky lg:top-28 self-start">
            <span className="inline-flex items-center gap-2 text-brand-dark font-bold text-xs uppercase tracking-widest mb-3">
              <span className="w-6 h-0.5 bg-brand rounded" />
              FAQ
            </span>
            <h2 className="text-[26px] sm:text-[32px] font-extrabold text-ink leading-tight tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted mt-3 leading-relaxed max-w-md">
              All the information you require on Travokart travel services, destinations, and trips —
              answered by our team.
            </p>

            {/* Support card */}
            <div className="mt-8 rounded-3xl bg-ink text-white p-7 relative overflow-hidden max-w-md">
              <span className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand/25 blur-2xl" aria-hidden />
              <div className="relative">
                <span className="inline-flex items-center gap-2 bg-white/12 border border-white/20 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest">
                  <Sparkle width={13} height={13} /> We&apos;re here to help
                </span>
                <h3 className="text-xl font-extrabold mt-4">Still have questions?</h3>
                <p className="text-white/70 text-sm leading-relaxed mt-2">
                  Can&apos;t find the answer you&apos;re looking for? Our travel experts are just a
                  message away and happy to help you plan.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a href={site.phoneHref} className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark transition-colors text-white font-bold text-sm px-4 py-2.5 rounded-xl">
                    <Phone width={16} height={16} /> Call Now
                  </a>
                  <a
                    href="https://wa.me/919872889763?text=Hi%20Travokart!%20I%20have%20a%20question%20about%20your%20tour%20packages."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25d366] hover:brightness-95 transition text-white font-bold text-sm px-4 py-2.5 rounded-xl"
                  >
                    <Whatsapp width={16} height={16} /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
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
