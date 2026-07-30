import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { Phone, Mail, MapPin } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Travokart — call, email or visit us in Panchkula, Haryana.",
};

export default function ContactPage() {
  const cards = [
    { I: Phone, label: "Customer Support", value: site.phone, href: site.phoneHref, tone: "bg-brand-soft text-brand-dark" },
    { I: Mail, label: "Drop Us an Email", value: site.email, href: site.emailHref, tone: "bg-sky-soft text-sky-dark" },
    { I: MapPin, label: "Our Location", value: site.address, href: undefined, tone: "bg-red-50 text-accent" },
  ];

  return (
    <>
      <PageHero
        title="Get in Touch"
        subtitle="Have a question or ready to book? Our travel experts are here to help."
        image="/media/2025/12/bora-bora-pics.jpg"
        crumbs={[{ label: "Contact Us" }]}
      />

      <section className="container-tk py-16">
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {cards.map(({ I, label, value, href, tone }) => (
            <div key={label} className="bg-white rounded-2xl border border-line p-6 card-lift">
              <div className={`grid place-items-center w-12 h-12 rounded-xl mb-4 ${tone}`}>
                <I width={22} height={22} />
              </div>
              <div className="text-muted text-sm">{label}</div>
              {href ? (
                <a href={href} className="font-bold text-ink hover:text-brand-dark">{value}</a>
              ) : (
                <div className="font-bold text-ink">{value}</div>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="bg-white rounded-2xl border border-line p-7 shadow-[var(--shadow-soft)]">
            <h2 className="text-2xl font-extrabold text-ink mb-1">Send Us a Message</h2>
            <p className="text-muted text-sm mb-6">We&apos;ll get back to you within 24 hours.</p>
            <form className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="Your name" />
                <Input label="Phone" placeholder="+91 00000 00000" />
              </div>
              <Input label="Email" placeholder="you@example.com" type="email" />
              <Input label="Destination" placeholder="Where would you like to go?" />
              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-ink">Message</span>
                <textarea
                  rows={4}
                  placeholder="Tell us about your trip…"
                  className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand"
                />
              </label>
              <button type="submit" className="btn btn-primary w-full">Send Message</button>
            </form>
          </div>

          <div className="rounded-2xl overflow-hidden border border-line h-full min-h-[420px]">
            <iframe
              title="Travokart location"
              src="https://www.google.com/maps?q=Sector%2014%20Panchkula%20Haryana&output=embed"
              className="w-full h-full min-h-[420px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Input({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand"
      />
    </label>
  );
}
