import Link from "next/link";
import { tours, categories, categoryImage } from "@/lib/data";
import { site } from "@/lib/site";
import { homeFaqs, testimonials, homeStats } from "@/lib/content";
import HeroSearch from "@/components/HeroSearch";
import TourCard from "@/components/TourCard";
import Faq from "@/components/Faq";
import NewsletterForm from "@/components/NewsletterForm";
import {
  Plane, ArrowRight, Star, Shield, Check, Clock, Calendar,
  Sparkle, Users, ArrowRight as Arr,
} from "@/components/Icons";

export default function Home() {
  const featuredTours = tours.slice(0, 8);
  const destCats = categories
    .filter((c) => !["domestic", "international", "more-packages"].includes(c.slug) && c.count > 0)
    .slice(0, 8);

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="hero">
        <div className="hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/2025/12/bora-bora-pics.jpg" alt="" />
        </div>
        <div className="hero-overlay" />
        <div className="shell hero-inner">
          <div className="hero-copy fade-up">
            <span className="eyebrow"><Plane width={13} height={13} /> {site.tagline}</span>
            <h1>Explore Exclusive <span className="accent">Tour Packages</span> with Travokart</h1>
            <p>Explore carefully chosen trips in popular locations that are made to be comfortable, affordable, and unforgettable.</p>
            <div className="hero-buttons">
              <Link href="/tours" className="btn btn-primary">Explore Tours <ArrowRight width={17} height={17} /></Link>
              <Link href="/contact-us" className="btn secondary-button">Plan My Trip</Link>
            </div>
            <div className="trust-row">
              <div className="avatar-stack"><span>C</span><span>M</span><span>S</span><span>A</span></div>
              <span>Trusted by 100+ happy travellers · 5.0 ★</span>
            </div>
          </div>
          <div className="offer-card">
            <span>✦ Special Offer</span>
            <small>Get up to</small>
            <strong>30% OFF</strong>
            <small>on holiday packages</small>
          </div>
        </div>
      </section>

      {/* ---------------- SEARCH ---------------- */}
      <section className="shell search-wrap">
        <HeroSearch />
      </section>

      {/* ---------------- POPULAR DESTINATIONS ---------------- */}
      <section className="shell section">
        <div className="section-head">
          <div>
            <span className="eyebrow-line">Top Destinations</span>
            <h2>Popular Destinations to Explore</h2>
            <p>Handpicked domestic and international destinations loved by our travellers.</p>
          </div>
          <Link href="/tours">View All <ArrowRight width={15} height={15} /></Link>
        </div>
        <div className="destination-grid">
          {destCats.map((c) => (
            <Link href={`/tour_category/${c.slug}`} className="destination-card" key={c.slug}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={categoryImage(c)} alt={c.name} loading="lazy" />
              <span className="discount">{c.count} Packages</span>
              <div className="card-shade" />
              <div className="destination-info">
                <h3>{c.name}</h3>
                <p>Explore holiday packages</p>
                <div className="stars">★★★★★ <small>5.0</small></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- FEATURED TOURS ---------------- */}
      <section className="shell section">
        <div className="section-head">
          <div>
            <span className="eyebrow-line">Trending Now</span>
            <h2>Find the Latest Tours Across the Globe</h2>
            <p>A travel marketplace created to link tourists with unique tour packages and life-changing experiences.</p>
          </div>
          <Link href="/tours">View All Tours <ArrowRight width={15} height={15} /></Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredTours.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </div>
      </section>

      {/* ---------------- PERKS ---------------- */}
      <section className="shell">
        <div className="perks">
          {[
            { I: Star, t: "VIP Packages", s: "Curated & luxurious", tone: "" },
            { I: Calendar, t: "Easy Bookings", s: "Fast confirmation", tone: "sky" },
            { I: Plane, t: "Travel Packages", s: "Domestic & global", tone: "purple" },
            { I: Shield, t: "Best Price", s: "Guaranteed value", tone: "green" },
            { I: Check, t: "24/7 Support", s: "Always here", tone: "red" },
          ].map((p) => (
            <div className="perk" key={p.t}>
              <span className={`perk-icon ${p.tone}`}><p.I width={20} height={20} /></span>
              <span><strong>{p.t}</strong><small>{p.s}</small></span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- ABOUT + STATS ---------------- */}
      <section className="shell section">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/2025/12/maldives-2.jpg" alt="Maldives" className="rounded-2xl h-64 w-full object-cover" style={{ boxShadow: "var(--shadow-card)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/2025/12/thailand-2.jpg" alt="Thailand" className="rounded-2xl h-64 w-full object-cover mt-8" style={{ boxShadow: "var(--shadow-card)" }} />
            </div>
          </div>
          <div>
            <span className="eyebrow-line">About Us</span>
            <h2 className="text-[28px] font-extrabold text-[color:var(--ink)] leading-tight mt-2">About Explore Travokart Vocations LLP</h2>
            <p className="text-[color:var(--muted)] mt-4 leading-relaxed">
              The Explore Travokart Vocations LLP Travels &amp; Holidays provides clients top-notch
              services and exclusive deals in Holiday Packages (Domestic as well as International)
              with Flight Bookings. We are counted among the best travel agencies in Panchkula.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-7 pt-7 border-t border-[color:var(--line)]">
              {homeStats.map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold text-[color:var(--brand-dark)]">{s.value}</div>
                  <div className="text-[color:var(--muted)] text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-7">
              <Link href="/about-us" className="btn btn-primary">Read More <Arr width={17} height={17} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- REVIEWS + NEWSLETTER ---------------- */}
      <section className="shell section">
        <div className="section-head section-center" style={{ display: "block", textAlign: "center" }}>
          <span className="eyebrow-line">Testimonials</span>
          <h2>What Our Travelers Say</h2>
          <p style={{ marginInline: "auto" }}>Explore Travokart Vocations LLP — rated 5.0 based on 12 Google reviews.</p>
        </div>
        <div className="reviews-grid">
          {testimonials.slice(0, 3).map((r) => (
            <article className="review-card" key={r.name}>
              <div className="stars" style={{ marginTop: 0 }}>★★★★★</div>
              <p>{r.text}</p>
              <div className="review-person">
                <span className="review-avatar">{r.name.charAt(0)}</span>
                <div><strong>{r.name}</strong><small>{r.when}</small></div>
              </div>
            </article>
          ))}
          <article className="newsletter-card">
            <div className="nl-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/media/2025/12/bali-1.jpg" alt="" />
            </div>
            <div className="nl-ov" />
            <div className="newsletter-content">
              <span>Members-only savings</span>
              <h3>Get Exclusive Offers &amp; Travel Inspiration</h3>
              <p>Subscribe to our newsletter</p>
              <NewsletterForm />
            </div>
          </article>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="shell section">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
          <div>
            <span className="eyebrow-line">FAQ</span>
            <h2 className="text-[28px] font-extrabold text-[color:var(--ink)] leading-tight mt-2">Frequently Asked Questions</h2>
            <p className="text-[color:var(--muted)] mt-3">All the information you require on Travokart travel services, destinations, and trips.</p>
            <div className="mt-6 bg-white rounded-2xl p-6 border border-[color:var(--line)]" style={{ boxShadow: "var(--shadow-soft)" }}>
              <p className="text-sm text-[color:var(--muted)]">Still have questions?</p>
              <a href={site.phoneHref} className="text-xl font-extrabold text-[color:var(--brand-dark)]">{site.phone}</a>
              <Link href="/contact-us" className="btn btn-outline w-full mt-4">Contact Support</Link>
            </div>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="shell" style={{ paddingBottom: 8 }}>
        <div className="relative rounded-3xl overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/2025/12/mauritius-1.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(28,36,48,.92), rgba(224,125,26,.7))" }} />
          <div className="relative px-8 py-14 md:px-16 text-white text-center">
            <Sparkle width={30} height={30} className="mx-auto mb-3 text-white" />
            <h2 className="text-3xl md:text-4xl font-extrabold">Ready for Your Next Adventure?</h2>
            <p className="mt-3 text-white/85 max-w-xl mx-auto">Let our travel experts craft a personalised itinerary for your dream destination.</p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center">
              <Link href="/contact-us" className="btn btn-primary">Get a Free Quote</Link>
              <a href={site.phoneHref} className="btn" style={{ background: "#fff", color: "var(--ink)" }}>Call {site.phone}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
