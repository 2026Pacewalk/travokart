"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Tour } from "@/lib/types";
import { tourImage, formatPrice, durationLabel } from "@/lib/data";
import { MapPin, Clock, Users, Star, ArrowRight, Heart, Whatsapp } from "./Icons";

const WISHLIST_KEY = "tk_wishlist";

export default function TourCard({ tour, trending = true }: { tour: Tour; trending?: boolean }) {
  const price = formatPrice(tour.product_price || tour.price);
  const duration = durationLabel(tour);
  const place = [...new Set([tour.city, tour.destination].filter(Boolean))][0] || tour.categories?.[0]?.name || "";
  const cat = tour.categories?.[0]?.name;
  const guests = tour.people_limit;

  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      const list: string[] = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      setSaved(list.includes(tour.slug));
    } catch {}
  }, [tour.slug]);

  function toggleSave(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const list: string[] = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
      const next = list.includes(tour.slug) ? list.filter((s) => s !== tour.slug) : [...list, tour.slug];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      setSaved(next.includes(tour.slug));
    } catch {}
  }

  const waMsg =
    `Hi Travokart! I'd like to enquire about this tour package.\n\n` +
    `Tour: ${tour.title}\n` +
    (place ? `Location: ${place}\n` : "") +
    (duration ? `Duration: ${duration}\n` : "") +
    (price ? `Price: From ${price} per person\n` : "") +
    `Link: https://travokart.com/tour/${tour.slug}\n\n` +
    `Please share availability and booking details. Thank you!`;
  const waHref = `https://wa.me/919872889763?text=${encodeURIComponent(waMsg)}`;

  return (
    <article className="tour-card">
      <div className="tc-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={tourImage(tour)} alt={tour.title} loading="lazy" />
        <div className="tc-top">
          {trending && <span className="tc-trend"><Star width={12} height={12} /> Trending</span>}
          <button
            className={`tc-heart ${saved ? "active" : ""}`}
            onClick={toggleSave}
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            aria-pressed={saved}
          >
            <Heart width={17} height={17} />
          </button>
        </div>
        <div className="tc-chips">
          {cat && <span className="tc-cat">{cat}</span>}
          <span className="tc-rate"><Star width={11} height={11} /> 5.0</span>
        </div>
      </div>

      <div className="tc-body">
        {place && <span className="tc-loc"><MapPin width={13} height={13} /> {place}</span>}
        <h3 className="tc-title">{tour.title}</h3>

        <div className="tc-stats">
          {duration && <span className="tc-stat"><Clock width={14} height={14} /> {duration}</span>}
          {guests && <span className="tc-stat"><Users width={14} height={14} /> {guests} Guests</span>}
        </div>

        <div className="tc-foot">
          <div className="tc-price">
            {price ? (
              <>
                <small>Starts from</small>
                <span className="amt">{price}</span> <span className="per">/person</span>
              </>
            ) : (
              <span className="amt">On Request</span>
            )}
          </div>
          <div className="tc-actions">
            <a className="tc-wa" href={waHref} target="_blank" rel="noopener noreferrer" aria-label="Enquire on WhatsApp">
              <Whatsapp width={18} height={18} />
            </a>
            <Link className="tc-view" href={`/tour/${tour.slug}`} aria-label="View tour">
              <ArrowRight width={18} height={18} />
            </Link>
          </div>
        </div>
      </div>

      <Link href={`/tour/${tour.slug}`} className="tc-stretch" aria-label={tour.title} />
    </article>
  );
}
