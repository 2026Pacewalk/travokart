"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { site, footerDomestic, footerInternational, mainNav } from "@/lib/site";
import {
  Phone, Mail, MapPin, Facebook, Instagram, Whatsapp, Youtube,
  Shield, Check, Star, Sparkle, ArrowRight, Chevron,
} from "./Icons";
import { PAYMENT_LOGOS } from "./PaymentIcons";

const SOCIALS = [
  { I: Facebook, href: site.socials.facebook, label: "Facebook" },
  { I: Instagram, href: site.socials.instagram, label: "Instagram" },
  { I: Whatsapp, href: site.socials.whatsapp, label: "Whatsapp" },
  { I: Youtube, href: site.socials.youtube, label: "Youtube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function subscribe(e: FormEvent) {
    e.preventDefault();
    if (email.includes("@")) setSubscribed(true);
  }

  return (
    <>
      {/* ---------- Newsletter CTA band ---------- */}
      <div className="shell">
        <div className="footer-cta">
          <div className="fc-bg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/2025/12/maldives-2.jpg" alt="" />
          </div>
          <div className="fc-ov" />
          <div className="footer-cta-inner">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest text-white">
                <Sparkle width={13} height={13} /> Members-only savings
              </span>
              <h3 className="mt-3">Get Exclusive Offers &amp; Travel Inspiration</h3>
              <p>Subscribe to the Travokart newsletter — no spam, just great deals.</p>
            </div>
            {subscribed ? (
              <p className="text-white font-bold flex items-center gap-2"><Check width={20} height={20} /> You&apos;re subscribed! 🎉</p>
            ) : (
              <form onSubmit={subscribe}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" aria-label="Email" />
                <button type="submit" className="btn" style={{ background: "#fff", color: "var(--ink)" }}>
                  Subscribe <ArrowRight width={16} height={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        {/* Trust strip */}
        <div className="shell">
          <div className="trust-strip">
            {[
              { I: Shield, t: "Best Price Guarantee", s: "Transparent pricing" },
              { I: Check, t: "Secure Booking", s: "100% safe & protected" },
              { I: Star, t: "5.0 Rated Service", s: "Loved by 100+ travellers" },
              { I: Phone, t: "24/7 Support", s: "Always here to help" },
            ].map((x) => (
              <div className="trust-item" key={x.t}>
                <span className="ti-icon"><x.I width={20} height={20} /></span>
                <span><strong>{x.t}</strong><small>{x.s}</small></span>
              </div>
            ))}
          </div>
        </div>

        <div className="shell footer-grid">
          {/* Brand + contact */}
          <div className="col">
            <span className="inline-flex bg-white rounded-xl px-4 py-2.5 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo.png" alt="Travokart" className="h-9 w-auto" />
            </span>
            <p className="fp" style={{ maxWidth: 280 }}>
              The Travel &amp; Holidays, established by {site.legalName} — one of the best travel
              agencies in Panchkula, with international operations across North India.
            </p>
            <div className="foot-contacts">
              <a href={site.phoneHref} className="foot-contact"><span className="fc-ic"><Phone width={16} height={16} /></span> {site.phone}</a>
              <a href={site.emailHref} className="foot-contact"><span className="fc-ic"><Mail width={16} height={16} /></span> {site.email}</a>
              <span className="foot-contact"><span className="fc-ic"><MapPin width={16} height={16} /></span> {site.address}</span>
            </div>
            <div className="socials">
              {SOCIALS.map(({ I, href, label }) => (
                <a key={label} href={href} data-net={label} aria-label={label} target="_blank" rel="noopener noreferrer"><I width={17} height={17} /></a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="col">
            <h3>Quick Links</h3>
            <nav className="footer-links">
              {mainNav.filter((m) => !m.label.includes("Packages") && m.label !== "International").map((m) => (
                <Link key={m.href} href={m.href}><Chevron width={13} height={13} className="lchev -rotate-90" />{m.label}</Link>
              ))}
            </nav>
          </div>

          {/* Destinations */}
          <div className="col">
            <h3>Top Destinations</h3>
            <nav className="footer-links">
              {[...footerDomestic.slice(0, 3), ...footerInternational.slice(0, 4)].map((c) => (
                <Link key={c.slug} href={`/tour_category/${c.slug}`}><Chevron width={13} height={13} className="lchev -rotate-90" />{c.label}</Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div className="col">
            <h3>Support</h3>
            <nav className="footer-links">
              {[
                { href: "/faq", label: "FAQs" },
                { href: "/become-expert", label: "Become an Expert" },
                { href: "/sign-in", label: "Sign In" },
                { href: "/privcy-policy", label: "Privacy Policy" },
                { href: "/terms-conditions", label: "Terms & Conditions" },
              ].map((l) => (
                <Link key={l.href} href={l.href}><Chevron width={13} height={13} className="lchev -rotate-90" />{l.label}</Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Payment strip */}
        <div className="footer-pay">
          <div className="shell">
            <span className="pay-label">💳 We Accept</span>
            <div className="pay-badges">
              {PAYMENT_LOGOS.map((Logo, i) => (
                <span className="pay-badge" key={i}><Logo /></span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="shell">
            <span>
              © 2025 Travokart Tour and Travel. Developed by{" "}
              <a href="https://pacewalk.com" target="_blank" rel="noopener noreferrer" className="font-bold text-[color:var(--brand)] hover:underline">
                PACEWALK
              </a>
            </span>
            <div className="footer-legal">
              <Link href="/privcy-policy">Privacy</Link>
              <Link href="/terms-conditions">Terms</Link>
              <button className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Chevron width={18} height={18} className="rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
