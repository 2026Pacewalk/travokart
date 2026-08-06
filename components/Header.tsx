"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { site, mainNav, footerDomestic, footerInternational } from "@/lib/site";
import {
  Phone, Mail, Menu, Close, Chevron, Shield, Check, Star, Search, ArrowRight,
  Facebook, Instagram, Whatsapp, Pinterest,
  Info, Compass, Image as ImageIcon, Newspaper, MapPin, Plane,
} from "./Icons";

const WHATSAPP = "https://wa.me/919872889763";
const NAV_ICONS: Record<string, React.ComponentType<{ width?: number; height?: number }>> = {
  "About Us": Info,
  "Tours": Compass,
  "Gallery": ImageIcon,
  "Blogs": Newspaper,
  "Contact Us": Phone,
};

const POPULAR = ["Himachal", "Bali", "Dubai", "Goa", "Maldives", "Thailand", "Kerala", "Ladakh"];
const SOCIALS = [
  { I: Facebook, href: site.socials.facebook, label: "Facebook" },
  { I: Instagram, href: site.socials.instagram, label: "Instagram" },
  { I: Pinterest, href: site.socials.pinterest, label: "Pinterest" },
  { I: Whatsapp, href: site.socials.whatsapp, label: "Whatsapp" },
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
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label={label}><I width={14} height={14} /></a>
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
        {/* Gradient header */}
        <div className="drawer-head">
          <div className="dh-bg" />
          <div className="drawer-head-row">
            <span className="drawer-logo-chip">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo.png" alt="Travokart" className="h-8 w-auto" />
            </span>
            <button className="drawer-close" aria-label="Close menu" onClick={onClose}><Close width={20} height={20} /></button>
          </div>
          <div className="drawer-welcome">
            <h4>Welcome to Travokart 👋</h4>
            <p>Where would you like to travel today?</p>
          </div>
        </div>

        <div className="drawer-body drawer-stagger">
          {/* Search */}
          <form className="drawer-search" style={{ animationDelay: "40ms" }} onSubmit={(e) => { e.preventDefault(); onClose(); router.push("/tours"); }}>
            <Search width={18} height={18} className="text-[color:var(--muted)]" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destinations, tours…" />
          </form>

          {/* Quick tiles */}
          <div className="drawer-tiles" style={{ animationDelay: "80ms" }}>
            <Link href="/tours" className="drawer-tile t1" onClick={onClose}>
              <span className="tile-ic"><Compass width={20} height={20} /></span> Explore Tours
            </Link>
            <Link href="/contact-us" className="drawer-tile t2" onClick={onClose}>
              <span className="tile-ic"><Phone width={19} height={19} /></span> Contact Us
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="drawer-tile t3" onClick={onClose}>
              <span className="tile-ic"><Whatsapp width={20} height={20} /></span> WhatsApp
            </a>
          </div>

          <p className="drawer-label" style={{ animationDelay: "120ms" }}>Browse</p>

          {mainNav.map((item, i) => {
            const delay = { animationDelay: `${140 + i * 40}ms` };
            if (item.label === "Domestic Packages" || item.label === "International") {
              const items = item.label === "Domestic Packages" ? footerDomestic : footerInternational;
              const isOpen = acc === item.label;
              const AccIcon = item.label === "International" ? Plane : MapPin;
              return (
                <div key={item.label} style={delay}>
                  <button className={`drawer-acc-btn ${isOpen ? "open" : ""}`} onClick={() => setAcc(isOpen ? null : item.label)}>
                    <span className="nav-ic"><AccIcon width={18} height={18} /></span>
                    {item.label}
                    <Chevron width={18} height={18} className="chev" />
                  </button>
                  <div className={`drawer-sub ${isOpen ? "open" : ""}`}>
                    <div>
                      <div className="drawer-chips">
                        {items.map((it) => (
                          <Link key={it.slug} href={`/tour_category/${it.slug}`} onClick={onClose}>{it.label}</Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            const Ic = NAV_ICONS[item.label] || Compass;
            return (
              <Link key={item.label} href={item.href} className={`drawer-link ${isActive(item.href) ? "active" : ""}`} style={delay} onClick={onClose}>
                <span className="nav-ic"><Ic width={18} height={18} /></span>
                {item.label}
                <ArrowRight width={16} height={16} className="arr" />
              </Link>
            );
          })}

          {/* Promo card */}
          <div className="drawer-promo" style={{ animationDelay: "440ms" }}>
            <span className="dp-badge">✦ Partner Program</span>
            <h5>Become a Travel Expert</h5>
            <p>List your packages & reach thousands of travellers.</p>
            <Link href="/become-expert" onClick={onClose}>Join Now <ArrowRight width={14} height={14} /></Link>
          </div>
        </div>

        {/* Footer */}
        <div className="drawer-foot">
          <p className="drawer-follow">Follow us on</p>
          <div className="drawer-socials">
            {SOCIALS.map(({ I, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} data-net={label}><I width={18} height={18} /></a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
