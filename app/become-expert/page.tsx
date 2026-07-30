import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Check } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Become an Expert",
  description: "Partner with Travokart — list your tour packages and reach more travellers.",
};

export default function BecomeExpertPage() {
  const perks = [
    "List unlimited tour packages",
    "Reach thousands of travellers",
    "Simple, transparent commissions",
    "Dedicated partner support",
    "Fast, secure payouts",
    "Marketing &amp; promotion support",
  ];
  return (
    <>
      <PageHero
        title="Become a Travel Expert"
        subtitle="Partner with Travokart to showcase your tour packages and grow your travel business."
        image="/media/2025/12/thailand-2.jpg"
        crumbs={[{ label: "Become Expert" }]}
      />
      <section className="container-tk py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-ink mb-4">Why Partner With Us?</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-charcoal text-sm">
                <span className="grid place-items-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
                  <Check width={14} height={14} />
                </span>
                <span dangerouslySetInnerHTML={{ __html: p }} />
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-2xl border border-line p-7 shadow-[var(--shadow-soft)]">
          <h3 className="text-xl font-extrabold text-ink mb-5">Apply to Partner</h3>
          <form className="grid gap-4">
            <input placeholder="Full name" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
            <input placeholder="Company / agency" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
            <input placeholder="Email" type="email" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
            <input placeholder="Phone" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
            <button type="submit" className="btn btn-primary w-full">Submit Application</button>
          </form>
        </div>
      </section>
    </>
  );
}
