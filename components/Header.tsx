"use client";

import { useState } from "react";
import Link from "next/link";
import { site, mainNav, footerDomestic, footerInternational } from "@/lib/site";
import { Phone, Mail, Menu, Close, Chevron, Shield, Check, Star } from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="shell topbar-inner">
          <div className="tb-left">
            <a href={site.phoneHref} className="inline-flex items-center gap-2"><Phone width={14} height={14} /> {site.phone}</a>
            <a href={site.emailHref} className="inline-flex items-center gap-2"><Mail width={14} height={14} /> {site.email}</a>
          </div>
          <div className="tb-right flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5"><Shield width={13} height={13} /> Best Price Guarantee</span>
            <span className="inline-flex items-center gap-1.5"><Check width={13} height={13} /> Secure Booking</span>
            <span className="inline-flex items-center gap-1.5"><Star width={13} height={13} /> 24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="nav-wrap">
        <div className="shell nav-inner">
          <Link href="/" aria-label="Travokart home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Travokart" className="brand-logo" />
          </Link>

          <button className="menu-button" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? <Close width={22} height={22} /> : <Menu width={22} height={22} />}
          </button>

          <nav className={open ? "nav-links open" : "nav-links"}>
            {mainNav.map((item) =>
              item.label === "Domestic Packages" ? (
                <Drop key={item.label} label={item.label} href={item.href} items={footerDomestic} onNav={() => setOpen(false)} />
              ) : item.label === "International" ? (
                <Drop key={item.label} label={item.label} href={item.href} items={footerInternational} onNav={() => setOpen(false)} />
              ) : (
                <Link key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
              )
            )}
          </nav>

          <div className="nav-actions">
            <Link href="/sign-in" className="sign-btn hidden sm:inline-flex">Sign In</Link>
            <Link href="/become-expert" className="book-button">Become Expert</Link>
          </div>
        </div>
      </header>
    </>
  );
}

function Drop({
  label,
  href,
  items,
  onNav,
}: {
  label: string;
  href: string;
  items: { label: string; slug: string }[];
  onNav: () => void;
}) {
  return (
    <div className="has-drop">
      <Link href={href} onClick={onNav}>
        {label} <Chevron width={14} height={14} />
      </Link>
      <div className="drop">
        <div className="drop-inner">
          {items.map((it) => (
            <Link key={it.slug} href={`/tour_category/${it.slug}`} onClick={onNav}>
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
