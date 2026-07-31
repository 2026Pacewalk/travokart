import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { Phone, Mail, MapPin } from "@/components/Icons";

export type LegalSection = { id: string; heading: string; paras?: string[]; list?: string[] };

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
  image = "/media/2025/12/maldives-2.jpg",
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  image?: string;
}) {
  return (
    <>
      <PageHero title={title} subtitle={`Last updated: ${updated}`} image={image} crumbs={[{ label: title }]} />

      <section className="container-tk py-12 lg:flex lg:gap-10 lg:items-start">
        {/* Sticky table of contents */}
        <aside className="hidden lg:block lg:w-[250px] lg:shrink-0">
          <div className="sticky top-24 bg-[color:var(--cloud)] rounded-2xl p-5 border border-[color:var(--line)]">
            <p className="font-extrabold text-[color:var(--ink)] mb-3 text-xs uppercase tracking-widest">On this page</p>
            <nav className="grid">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="flex items-start gap-2 py-1.5 text-[13.5px] text-[color:var(--muted)] hover:text-[color:var(--brand-dark)] transition-colors"
                >
                  <span className="text-[color:var(--brand)] font-bold">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="max-w-3xl lg:flex-1 mt-8 lg:mt-0">
          <p className="text-lg text-[color:var(--charcoal)] leading-relaxed mb-10">{intro}</p>

          {sections.map((s, i) => (
            <div key={s.id} id={s.id} className="mb-9 scroll-mt-28">
              <h2 className="flex items-center gap-3 text-xl font-extrabold text-[color:var(--ink)] mb-4">
                <span className="grid place-items-center w-8 h-8 rounded-lg bg-[color:var(--brand-soft)] text-[color:var(--brand-dark)] text-sm shrink-0">
                  {i + 1}
                </span>
                {s.heading}
              </h2>
              {s.paras?.map((p, j) => (
                <p key={j} className="text-[color:var(--muted)] leading-relaxed mb-3">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-2 space-y-2">
                  {s.list.map((li, j) => (
                    <li key={j} className="flex gap-2.5 text-[color:var(--muted)] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[color:var(--brand)] shrink-0" />
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Contact box */}
          <div className="mt-10 rounded-2xl border border-[color:var(--line)] bg-[color:var(--cloud)] p-6">
            <h3 className="font-extrabold text-[color:var(--ink)] mb-1">Questions about this policy?</h3>
            <p className="text-[color:var(--muted)] text-sm mb-4">Reach out to our team — we&apos;re happy to help.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <a href={site.phoneHref} className="inline-flex items-center gap-2 text-[color:var(--ink)] hover:text-[color:var(--brand-dark)] font-semibold"><Phone width={15} height={15} className="text-[color:var(--brand)]" /> {site.phone}</a>
              <a href={site.emailHref} className="inline-flex items-center gap-2 text-[color:var(--ink)] hover:text-[color:var(--brand-dark)] font-semibold"><Mail width={15} height={15} className="text-[color:var(--brand)]" /> {site.email}</a>
              <span className="inline-flex items-center gap-2 text-[color:var(--muted)]"><MapPin width={15} height={15} className="text-[color:var(--brand)]" /> {site.address}</span>
            </div>
            <Link href="/contact-us" className="btn btn-primary mt-5">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
