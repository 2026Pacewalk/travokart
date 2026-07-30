import Link from "next/link";
import { site, footerDomestic, footerInternational } from "@/lib/site";
import { Phone, Mail, MapPin, Facebook, Instagram, Whatsapp, Youtube } from "./Icons";

export default function Footer() {
  return (
    <footer className="footer">
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

        {/* Domestic */}
        <div className="col">
          <h3>Domestic</h3>
          {footerDomestic.map((c) => (
            <Link key={c.slug} href={`/tour_category/${c.slug}`}>{c.label}</Link>
          ))}
        </div>

        {/* International */}
        <div className="col">
          <h3>International</h3>
          {footerInternational.slice(0, 8).map((c) => (
            <Link key={c.slug} href={`/tour_category/${c.slug}`}>{c.label}</Link>
          ))}
        </div>

        {/* Contact */}
        <div className="col">
          <h3>Get in Touch</h3>
          <p className="flex items-start gap-2"><Phone width={15} height={15} className="mt-0.5 shrink-0" /> <a href={site.phoneHref}>{site.phone}</a></p>
          <p className="flex items-start gap-2"><Mail width={15} height={15} className="mt-0.5 shrink-0" /> <a href={site.emailHref}>{site.email}</a></p>
          <p className="flex items-start gap-2"><MapPin width={15} height={15} className="mt-0.5 shrink-0" /> <span>{site.address}</span></p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="shell">{site.copyright}</div>
      </div>
    </footer>
  );
}
