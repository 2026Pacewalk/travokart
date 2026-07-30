"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { site, mainNav, footerDomestic, footerInternational } from "@/lib/site";
import {
  Phone, Mail, Menu, Close, Chevron, Shield, Check, Star, Search, ArrowRight,
  Facebook, Instagram, Whatsapp, Youtube,
} from "./Icons";

const POPULAR = ["Himachal", "Bali", "Dubai", "Goa", "Maldives", "Thailand", "Kerala", "Ladakh"];
const SOCIALS = [
  { I: Facebook, href: "#", label: "Facebook" },
  { I: Instagram, href: "#", label: "Instagram" },
  { I: Whatsapp, href: site.socials.whatsapp, label: "Whatsapp" },
  { I: Youtube, href: "#", label: "Youtube" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="shell topbar-inner">
          <div className="tb-left">
            <a href={site.phoneHref} className="inline-flex items-center gap-2"><Phone width={14} height={14} /> {site.phone}</a>
            <a href={site.emailHref} className="inline-flex items-center gap-2"><Mail width={14} height={14} /> {site.email}</a>
          </div>
          <div className="tb-right flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5"><Shield width={13} height={13} /> Best Price Guarantee</span>
            <span className="hidden xl:inline-flex items-center gap-1.5"><Check width={13} height={13} /> Secure Booking</span>
            <span className="inline-flex items-center gap-2 pl-4 ml-1 border-l border-white/15">
              {SOCIALS.map(({ I, href, label }) => (
                <a key={label} href={href} className="hover:text-brand transition-colors" aria-label={label}><I width={14} height={14} /></a>
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className={`nav-wrap ${scrolled ? "scrolled" : ""}`}>
        <div className="shell nav-inner">
          <Link href="/" aria-label="Travokart home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Travokart" className="brand-logo" />
          </Link>

          <button className="menu-button" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu width={22} height={22} />
          </button>

          <nav className="nav-links">
            {mainNav.map((item) =>
              item.label === "Domestic Packages" ? (
                <Mega key={item.label} label={item.label} href={item.href} items={footerDomestic} active={isActive(item.href)} />
              ) : item.label === "International" ? (
                <Mega key={item.label} label={item.label} href={item.href} items={footerInternational} active={isActive(item.href)} />
              ) : (
                <Link key={item.label} href={item.href} className={isActive(item.href) ? "active" : ""}>
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="nav-actions">
            <button className="nav-icon-btn" aria-label="Search" onClick={() => setSearchOpen((v) => !v)}>
              {searchOpen ? <Close width={18} height={18} /> : <Search width={18} height={18} />}
            </button>
            <Link href="/sign-in" className="sign-btn hidden sm:inline-flex">Sign In</Link>
            <Link href="/become-expert" className="book-button">Become Expert</Link>
          </div>
        </div>

        {/* Search overlay (desktop) */}
        <div className={`search-overlay ${searchOpen ? "open" : ""}`}>
          <div className="shell so-inner">
            <form className="search-bar" onSubmit={(e) => { e.preventDefault(); setSearchOpen(false); router.push("/tours"); }}>
              <Search width={20} height={20} className="text-[color:var(--muted)]" />
              <input autoFocus={searchOpen} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destinations, tours, packages…" />
              <button type="submit" className="btn btn-primary py-2 px-5">Search</button>
            </form>
            <div className="chips-row flex items-center gap-2.5 mt-4 flex-wrap">
              <span className="text-[13px] text-[color:var(--muted)] font-semibold">Popular:</span>
              {POPULAR.map((p) => (
                <Link key={p} href={`/tour_category/${p.toLowerCase()}`} className="chip" onClick={() => setSearchOpen(false)}>{p}</Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && <MobileDrawer onClose={() => setOpen(false)} isActive={isActive} />}
    </>
  );
}

function Mega({ label, href, items, active }: { label: string; href: string; items: { label: string; slug: string }[]; active: boolean }) {
  return (
    <div className={`has-drop ${active ? "active" : ""}`}>
      <Link href={href}>{label} <Chevron width={14} height={14} /></Link>
      <div className="mega">
        <div className="mega-inner">
          <p className="mega-title">{label}</p>
          <div className="mega-grid">
            {items.map((it) => (
              <Link key={it.slug} href={`/tour_category/${it.slug}`}><span className="dot" /> {it.label}</Link>
            ))}
          </div>
          <div className="mega-foot">
            <span className="text-[12px] text-[color:var(--muted)]">{items.length} destinations</span>
            <Link href="/tours">View all packages <ArrowRight width={14} height={14} /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({ onClose, isActive }: { onClose: () => void; isActive: (href: string) => boolean }) {
  const router = useRouter();
  const [acc, setAcc] = useState<string | null>(null);
  const [q, setQ] = useState("");

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-label="Menu">
        <div className="drawer-head">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.png" alt="Travokart" className="h-9 w-auto" />
          <button className="drawer-close" aria-label="Close menu" onClick={onClose}><Close width={20} height={20} /></button>
        </div>

        <div className="drawer-body">
          <form className="drawer-search" onSubmit={(e) => { e.preventDefault(); onClose(); router.push("/tours"); }}>
            <Search width={18} height={18} className="text-[color:var(--muted)]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destinations…" />
          </form>

          {mainNav.map((item) => {
            if (item.label === "Domestic Packages" || item.label === "International") {
              const items = item.label === "Domestic Packages" ? footerDomestic : footerInternational;
              const isOpen = acc === item.label;
              return (
                <div key={item.label}>
                  <button className={`drawer-acc-btn ${isOpen ? "open" : ""}`} onClick={() => setAcc(isOpen ? null : item.label)}>
                    {item.label}
                    <Chevron width={18} height={18} className="chev" />
                  </button>
                  <div className={`drawer-sub ${isOpen ? "open" : ""}`}>
                    <div>
                      {items.map((it) => (
                        <Link key={it.slug} href={`/tour_category/${it.slug}`} onClick={onClose}>
                          <span className="dot" /> {it.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link key={item.label} href={item.href} className={`drawer-link ${isActive(item.href) ? "active" : ""}`} onClick={onClose}>
                {item.label}
                <ArrowRight width={16} height={16} className="text-[color:var(--brand)]" />
              </Link>
            );
          })}
        </div>

        <div className="drawer-foot">
          <div className="drawer-contact">
            <a href={site.phoneHref}><span className="ic"><Phone width={15} height={15} /></span> {site.phone}</a>
            <a href={site.emailHref}><span className="ic"><Mail width={15} height={15} /></span> {site.email}</a>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <Link href="/sign-in" className="btn btn-outline w-full" onClick={onClose}>Sign In</Link>
            <Link href="/become-expert" className="btn btn-primary w-full" onClick={onClose}>Become Expert</Link>
          </div>
          <div className="drawer-socials">
            {SOCIALS.map(({ I, href, label }) => (
              <a key={label} href={href} aria-label={label}><I width={17} height={17} /></a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
