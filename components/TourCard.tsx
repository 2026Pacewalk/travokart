import Link from "next/link";
import type { Tour } from "@/lib/types";
import { tourImage, formatPrice, durationLabel } from "@/lib/data";
import { MapPin, Clock, Star, ArrowRight } from "./Icons";

export default function TourCard({ tour }: { tour: Tour }) {
  const price = formatPrice(tour.product_price || tour.price);
  const duration = durationLabel(tour);
  const place = tour.city || tour.destination || tour.categories?.[0]?.name || "";
  const cat = tour.categories?.[0]?.name;

  return (
    <Link
      href={`/tour/${tour.slug}`}
      className="group card-lift block bg-white rounded-2xl overflow-hidden border border-line shadow-[var(--shadow-soft)]"
    >
      <div className="relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tourImage(tour)}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
        {cat && (
          <span className="absolute top-3 left-3 bg-white/95 text-brand-dark text-[11px] font-bold px-3 py-1 rounded-full">
            {cat}
          </span>
        )}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-ink/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
          <Star width={11} height={11} className="text-brand" /> 5.0
        </span>
      </div>

      <div className="p-4">
        {place && (
          <div className="flex items-center gap-1.5 text-muted text-xs mb-1.5">
            <MapPin width={13} height={13} className="text-accent" /> {place}
          </div>
        )}
        <h3 className="font-bold text-[15px] text-ink leading-snug clamp-2 min-h-[42px] group-hover:text-brand-dark transition-colors">
          {tour.title}
        </h3>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-line">
          <div>
            {duration && (
              <div className="flex items-center gap-1 text-muted text-[11px] mb-0.5">
                <Clock width={12} height={12} /> {duration}
              </div>
            )}
            {price && (
              <div className="text-[11px] text-muted">
                From <span className="text-brand-dark font-extrabold text-base">{price}</span>
              </div>
            )}
          </div>
          <span className="grid place-items-center w-9 h-9 rounded-full bg-brand-soft text-brand-dark group-hover:bg-brand group-hover:text-white transition-colors">
            <ArrowRight width={16} height={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
