import Link from "next/link";
import { site, footerDomestic, footerInternational } from "@/lib/site";
import { Phone, Mail, MapPin, Facebook, Instagram, Whatsapp, Youtube } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/75 mt-20">
      <div className="container-tk py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
        {/* Brand */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-light.png" alt="Travokart" className="h-11 w-auto mb-5" />
          <p className="text-sm leading-relaxed max-w-xs">
            The Travel &amp; Holidays, has been established by {site.legalName} and we have
            expanded our International Operations in India (North India).
          </p>
          <div className="flex gap-3 mt-6">
            {[
              { I: Facebook, href: site.socials.facebook, label: "Facebook" },
              { I: Instagram, href: site.socials.instagram, label: "Instagram" },
              { I: Whatsapp, href: site.socials.whatsapp, label: "Whatsapp" },
              { I: Youtube, href: site.socials.youtube, label: "Youtube" },
            ].map(({ I, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="grid place-items-center w-9 h-9 rounded-full bg-white/10 hover:bg-brand hover:text-white transition-colors"
              >
                <I width={16} height={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Domestic */}
        <div>
          <h3 className="text-white font-bold mb-4">Domestic</h3>
          <ul className="space-y-2.5 text-sm">
            {footerDomestic.map((c) => (
              <li key={c.slug}>
                <Link href={`/tour_category/${c.slug}`} className="hover:text-brand transition-colors">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* International */}
        <div>
          <h3 className="text-white font-bold mb-4">International</h3>
          <ul className="space-y-2.5 text-sm">
            {footerInternational.map((c) => (
              <li key={c.slug}>
                <Link href={`/tour_category/${c.slug}`} className="hover:text-brand transition-colors">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold mb-4">Get in Touch</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-brand/20 text-brand shrink-0">
                <Phone width={15} height={15} />
              </span>
              <div>
                <div className="text-white/50 text-xs">Customer Support</div>
                <a href={site.phoneHref} className="hover:text-brand">{site.phone}</a>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-sky/20 text-sky shrink-0">
                <Mail width={15} height={15} />
              </span>
              <div>
                <div className="text-white/50 text-xs">Drop Us an Email</div>
                <a href={site.emailHref} className="hover:text-brand">{site.email}</a>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-accent/20 text-accent shrink-0">
                <MapPin width={15} height={15} />
              </span>
              <div>
                <div className="text-white/50 text-xs">Our Location</div>
                <span>{site.address}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-tk py-5 text-center text-xs text-white/55">
          {site.copyright}
        </div>
      </div>
    </footer>
  );
}
