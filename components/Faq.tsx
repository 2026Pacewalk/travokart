"use client";

import { useState } from "react";
import { Chevron } from "./Icons";

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid gap-3.5">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`group rounded-2xl border transition-all duration-200 ${
              isOpen
                ? "border-brand/30 bg-white shadow-[0_14px_34px_rgba(6,24,59,.10)]"
                : "border-line bg-white/70 hover:bg-white hover:border-brand/25 hover:shadow-[0_6px_18px_rgba(6,24,59,.06)]"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center gap-3.5 text-left px-4 sm:px-5 py-4"
              aria-expanded={isOpen}
            >
              <span
                className={`grid place-items-center w-9 h-9 rounded-xl text-[13px] font-extrabold shrink-0 transition-colors ${
                  isOpen ? "bg-brand text-white" : "bg-brand-soft text-brand-dark"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-bold text-ink text-[15px] leading-snug">{it.q}</span>
              <span
                className={`grid place-items-center w-8 h-8 rounded-full shrink-0 transition-all ${
                  isOpen
                    ? "bg-brand text-white rotate-180"
                    : "bg-cloud text-muted group-hover:bg-brand-soft group-hover:text-brand-dark"
                }`}
              >
                <Chevron width={16} height={16} />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pl-[4.25rem] pr-5 pb-5 text-muted text-sm leading-relaxed">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
