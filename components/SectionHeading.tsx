import Link from "next/link";
import { ArrowRight } from "./Icons";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  linkHref,
  linkLabel,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  linkHref?: string;
  linkLabel?: string;
  center?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-4 ${center ? "flex-col items-center text-center" : ""}`}>
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-brand-dark font-bold text-xs uppercase tracking-widest mb-3">
            <span className="w-6 h-0.5 bg-brand rounded" />
            {eyebrow}
          </span>
        )}
        <h2 className="text-[26px] sm:text-[32px] font-extrabold text-ink leading-tight tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="text-muted mt-3 leading-relaxed">{subtitle}</p>}
      </div>
      {linkHref && linkLabel && (
        <Link
          href={linkHref}
          className="inline-flex items-center gap-2 text-brand-dark font-bold text-sm hover:gap-3 transition-all shrink-0"
        >
          {linkLabel} <ArrowRight width={16} height={16} />
        </Link>
      )}
    </div>
  );
}
