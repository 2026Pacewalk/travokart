"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Close, Sparkle, ArrowRight, Whatsapp } from "./Icons";

const WHATSAPP =
  "https://wa.me/919872889763?text=" +
  encodeURIComponent("Hi Travokart! I'd like to know more about the Monsoon Offer (up to 20% OFF on holiday packages).");

const DISMISS_KEY = "tk_offer_monsoon_dismissed";

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    // Only show once per browser session
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    const t = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function close() {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch {}
    }, 220);
  }

  if (!open) return null;

  return (
    <div className={`offer-pop ${closing ? "is-closing" : ""}`} role="dialog" aria-modal="true" aria-label="Monsoon Offer">
      <div className="offer-pop-backdrop" onClick={close} />
      <div className="offer-pop-card">
        <button className="offer-pop-close" aria-label="Close offer" onClick={close}>
          <Close width={18} height={18} />
        </button>

        {/* Visual side */}
        <div className="offer-pop-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/2025/12/maldives-2.jpg" alt="Monsoon holiday offer by Travokart" />
          <div className="offer-pop-media-ov" />
          <span className="offer-pop-ribbon"><Sparkle width={13} height={13} /> Limited Time</span>
        </div>

        {/* Content side */}
        <div className="offer-pop-body">
          <span className="offer-pop-badge"><Sparkle width={14} height={14} /> Monsoon Offer</span>
          <h3 className="offer-pop-title">
            Get up to <span className="offer-pop-percent">20% OFF</span>
          </h3>
          <p className="offer-pop-sub">on all domestic &amp; international holiday packages this season.</p>

          <ul className="offer-pop-list">
            <li>Handpicked monsoon getaways</li>
            <li>Free personalised itinerary</li>
            <li>Best-price guarantee</li>
          </ul>

          <div className="offer-pop-actions">
            <Link href="/tours" className="btn btn-primary" onClick={close}>
              Explore Tours <ArrowRight width={16} height={16} />
            </Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="offer-pop-wa" onClick={close}>
              <Whatsapp width={17} height={17} /> Enquire Now
            </a>
          </div>
          <p className="offer-pop-fine">*T&amp;C apply. Offer valid on select bookings.</p>
        </div>
      </div>
    </div>
  );
}
