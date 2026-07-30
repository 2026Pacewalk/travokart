"use client";

import { useState } from "react";
import Link from "next/link";
import { site, mainNav, footerDomestic, footerInternational } from "@/lib/site";
import { Phone, Mail, Menu, Close, Chevron, ArrowRight } from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top strip */}
      <div className="hidden md:block bg-ink text-white/90 text-[13px]">
        <div className="container-tk flex items-center justify-between h-10">
          <div className="flex items-center gap-6">
            <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-brand">
              <Phone width={15} height={15} /> {site.phone}
            </a>
            <a href={site.emailHref} className="inline-flex items-center gap-2 hover:text-brand">
              <Mail width={15} height={15} /> {site.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <span>{site.legalName}</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white/95 backdrop-blur border-b border-line shadow-[0_4px_20px_rgba(20,40,80,0.06)]">
        <div className="container-tk flex items-center justify-between h-[74px] gap-4">
          <Link href="/" className="flex items-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Travokart" className="h-11 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-[14px] font-semibold text-ink">
            {mainNav.map((item) =>
              item.label === "Domestic Packages" ? (
                <Dropdown key={item.label} label={item.label} href={item.href} items={footerDomestic} />
              ) : item.label === "International" ? (
                <Dropdown key={item.label} label={item.label} href={item.href} items={footerInternational} />
              ) : (
                <Link key={item.label} href={item.href} className="hover:text-brand transition-colors">
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="hidden sm:inline-flex btn btn-dark px-5 py-2.5 text-[13px]">
              Sign In
            </Link>
            <Link href="/become-expert" className="hidden sm:inline-flex btn btn-primary px-5 py-2.5 text-[13px]">
              Become Expert
            </Link>
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="lg:hidden grid place-items-center w-11 h-11 rounded-xl bg-brand-soft text-brand-dark"
            >
              <Menu />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white p-5 overflow-y-auto fade-up">
            <div className="flex items-center justify-between mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo.png" alt="Travokart" className="h-9" />
              <button aria-label="Close" onClick={() => setOpen(false)} className="text-muted">
                <Close />
              </button>
            </div>
            <div className="flex flex-col">
              {mainNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 border-b border-line font-semibold flex items-center justify-between"
                >
                  {item.label} <ArrowRight width={16} height={16} className="text-brand" />
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/sign-in" onClick={() => setOpen(false)} className="btn btn-outline w-full">
                Sign In
              </Link>
              <Link href="/become-expert" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Become Expert
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Dropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: { label: string; slug: string }[];
}) {
  return (
    <div className="relative group">
      <Link href={href} className="inline-flex items-center gap-1 hover:text-brand transition-colors">
        {label} <Chevron width={15} height={15} className="mt-0.5" />
      </Link>
      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="w-56 bg-white rounded-2xl shadow-[0_18px_50px_rgba(20,40,80,0.16)] border border-line p-2 grid">
          {items.map((it) => (
            <Link
              key={it.slug}
              href={`/tour_category/${it.slug}`}
              className="px-3 py-2 rounded-lg text-[13px] font-medium text-charcoal hover:bg-brand-soft hover:text-brand-dark transition-colors"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
