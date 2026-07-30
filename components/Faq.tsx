"use client";

import { useState } from "react";
import { Chevron } from "./Icons";

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid gap-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border transition-colors ${
              isOpen ? "border-brand/40 bg-brand-soft/50" : "border-line bg-white"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
            >
              <span className="font-bold text-ink text-[15px]">{it.q}</span>
              <span
                className={`grid place-items-center w-8 h-8 rounded-full shrink-0 transition-all ${
                  isOpen ? "bg-brand text-white rotate-180" : "bg-cloud text-muted"
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
                <p className="px-5 pb-5 text-muted text-sm leading-relaxed">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
