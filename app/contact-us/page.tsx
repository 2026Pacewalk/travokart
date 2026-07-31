import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import { Phone, Mail, MapPin } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Travokart — call +91 98728-89763, email info@travokart.com, or visit us at Sector-14, Panchkula, Haryana. Our travel experts are here to help.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact Travokart",
    description: "Call, email or visit Explore Travokart Vocations LLP in Panchkula, Haryana.",
    url: "/contact-us",
    images: [{ url: "/media/2025/12/bora-bora-pics.jpg", alt: "Contact Travokart" }],
  },
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
            <ContactForm />
          </div>

          <div className="rounded-2xl overflow-hidden border border-line h-full min-h-[420px]">
            <iframe
              title="Explore Travokart Vocations LLP location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.2599345922094!2d76.845535!3d30.682961799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f95a23529b1bb%3A0x4e76b35ca8de755!2sExplore%20travokart%20vocations%20LLP!5e0!3m2!1sen!2sin!4v1785482136229!5m2!1sen!2sin"
              className="w-full h-full min-h-[420px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>
    </>
  );
}
