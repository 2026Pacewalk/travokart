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
  description: "Learn about Explore Travokart Vocations LLP — one of the best travel agencies in Panchkula.",
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
          <img src="/media/2025/12/thailand-2.jpg" alt="" className="rounded-2xl h-72 w-full object-cover shadow-[var(--shadow-card)]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/2025/12/bali-1.jpg" alt="" className="rounded-2xl h-72 w-full object-cover mt-8 shadow-[var(--shadow-card)]" />
        </div>
        <div>
          <SectionHeading
            eyebrow="Who We Are"
            title="About Explore Travokart Vocations LLP Travels"
          />
          <div className="text-muted leading-relaxed mt-4 space-y-4">
            <p>
              Explore Travokart Vocations LLP is a customer-centric travel company serving
              Tricity &amp; North India, committed to delivering seamless, memorable, and
              well-organized travel experiences. With a strong focus on quality, reliability, and
              customer satisfaction, we specialize in offering thoughtfully curated domestic and
              international tour packages designed to suit diverse travel needs. Whether it&apos;s
              leisure travel, family vacations, romantic getaways, or group tours, we ensure every
              journey is planned with precision, comfort, and care.
            </p>
            <p>
              Backed by an experienced team of travel professionals, Explore Travokart Vocations
              LLP collaborates with trusted partners to provide end-to-end travel solutions,
              including accommodation, sightseeing, transportation, and customized itineraries. Our
              approach is rooted in transparency, competitive pricing, and personalized service,
              ensuring our clients enjoy stress-free travel experiences from planning to
              completion. At Explore Travokart Vocations LLP, we strive to turn every trip into a
              rewarding and unforgettable experience.
            </p>
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
