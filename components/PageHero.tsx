import Link from "next/link";
import { Chevron } from "./Icons";

export default function PageHero({
  title,
  subtitle,
  image,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  image?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-ink" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />
      </div>
      <div className="relative container-tk py-16 md:py-20 text-white">
        <nav className="flex items-center gap-1.5 text-sm text-white/70 mb-3">
          <Link href="/" className="hover:text-brand">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <Chevron width={14} height={14} className="-rotate-90 text-white/40" />
              {c.href ? (
                <Link href={c.href} className="hover:text-brand">{c.label}</Link>
              ) : (
                <span className="text-white">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-3 text-white/80 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
