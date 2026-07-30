import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import { whyChoose, homeStats } from "@/lib/content";
import { site } from "@/lib/site";
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
              The Explore Travokart Vocations LLP Travels &amp; Holidays has been officially
              settled by Explore Travokart Vocations LLP Management Pvt Ltd. By providing our
              clients top-notch services and exclusive deals in Holiday Packages (Domestic as
              well as International) with Flight Bookings, we are one of the best service
              providers in India.
            </p>
            <p>
              Now we are counted among the best travel agency in Panchkula because of our finest
              services. We link travellers with carefully chosen tour packages designed to be
              comfortable, affordable and unforgettable.
            </p>
          </div>
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
