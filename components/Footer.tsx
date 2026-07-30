"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { site, footerDomestic, footerInternational, mainNav } from "@/lib/site";
import {
  Phone, Mail, MapPin, Facebook, Instagram, Whatsapp, Youtube,
  Shield, Check, Star, Sparkle, ArrowRight, Chevron,
} from "./Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function subscribe(e: FormEvent) {
    e.preventDefault();
    if (email.includes("@")) setSubscribed(true);
  }

  return (
    <>
      {/* ---------- Pre-footer CTA / newsletter band ---------- */}
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
          {/* Brand */}
          <div className="col">
            <span className="inline-flex bg-white rounded-xl px-4 py-2.5 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo.png" alt="Travokart" className="h-9 w-auto" />
            </span>
            <p className="fp" style={{ maxWidth: 260 }}>
              The Travel &amp; Holidays, has been established by {site.legalName} and we have
              expanded our International Operations in India (North India).
            </p>
            <div className="socials">
              <a href={site.socials.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Facebook width={16} height={16} /></a>
              <a href={site.socials.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Instagram width={16} height={16} /></a>
              <a href={site.socials.whatsapp} aria-label="Whatsapp" target="_blank" rel="noopener noreferrer"><Whatsapp width={16} height={16} /></a>
              <a href={site.socials.youtube} aria-label="Youtube" target="_blank" rel="noopener noreferrer"><Youtube width={16} height={16} /></a>
            </div>
          </div>

          {/* Quick links */}
          <div className="col">
            <h3>Quick Links</h3>
            {mainNav.filter((m) => !m.label.includes("Packages") && m.label !== "International").map((m) => (
              <Link key={m.href} href={m.href}>{m.label}</Link>
            ))}
          </div>

          {/* Destinations */}
          <div className="col">
            <h3>Top Destinations</h3>
            {[...footerDomestic.slice(0, 3), ...footerInternational.slice(0, 4)].map((c) => (
              <Link key={c.slug} href={`/tour_category/${c.slug}`}>{c.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div className="col">
            <h3>Get in Touch</h3>
            <p className="flex items-start gap-2.5"><Phone width={15} height={15} className="mt-0.5 shrink-0 text-brand" /> <a href={site.phoneHref}>{site.phone}</a></p>
            <p className="flex items-start gap-2.5"><Mail width={15} height={15} className="mt-0.5 shrink-0 text-brand" /> <a href={site.emailHref}>{site.email}</a></p>
            <p className="flex items-start gap-2.5"><MapPin width={15} height={15} className="mt-0.5 shrink-0 text-brand" /> <span>{site.address}</span></p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="shell" style={{ justifyContent: "space-between" }}>
            <span>
              © 2025 Travokart Tour and Travel. Developed by{" "}
              <a href="https://pacewalk.com" target="_blank" rel="noopener noreferrer" className="font-bold text-[color:var(--brand)] hover:underline">
                PACEWALK
              </a>
            </span>
            <button className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <Chevron width={18} height={18} className="rotate-180" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
