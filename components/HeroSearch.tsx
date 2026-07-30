"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Clock, Users, Search } from "./Icons";

export default function HeroSearch() {
  const router = useRouter();
  const [dest, setDest] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/tours");
      }}
      className="bg-white rounded-2xl shadow-[0_22px_60px_rgba(20,40,80,0.20)] border border-line p-2.5 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1fr_auto] gap-1"
    >
      <Field icon={<MapPin width={16} height={16} className="text-brand" />} label="Where would you like to go?">
        <input
          value={dest}
          onChange={(e) => setDest(e.target.value)}
          placeholder="Enter destination"
          className="w-full outline-none text-sm font-semibold text-ink placeholder:text-muted/70 placeholder:font-normal bg-transparent"
        />
      </Field>
      <Field icon={<Calendar width={16} height={16} className="text-sky" />} label="Check In">
        <input type="date" className="w-full outline-none text-sm font-semibold text-ink bg-transparent" />
      </Field>
      <Field icon={<Clock width={16} height={16} className="text-accent" />} label="Duration (Days)">
        <select className="w-full outline-none text-sm font-semibold text-ink bg-transparent">
          <option>Select duration</option>
          {["1-3 Days", "4-6 Days", "7-9 Days", "10+ Days"].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </Field>
      <Field icon={<Users width={16} height={16} className="text-brand" />} label="Travellers">
        <select className="w-full outline-none text-sm font-semibold text-ink bg-transparent">
          {["1 Adult", "2 Adults", "3 Adults", "4+ Adults", "Family"].map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </Field>
      <button type="submit" className="btn btn-primary md:h-full md:px-7 rounded-xl">
        <Search width={18} height={18} />
        <span className="md:hidden lg:inline">Search</span>
      </button>
    </form>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-cloud transition-colors cursor-text min-w-0">
      <span className="grid place-items-center w-9 h-9 rounded-lg bg-cloud shrink-0">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] uppercase tracking-wide text-muted font-semibold">{label}</span>
        {children}
      </span>
    </label>
  );
}
