"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Plane, MapPin, Calendar, Clock, Users, Search } from "./Icons";

const TABS = [
  { key: "Tours", icon: "tours" },
  { key: "Hotels", icon: "hotels" },
  { key: "Flights", icon: "flights" },
  { key: "Activities", icon: "activities" },
] as const;

export default function HeroSearch() {
  const router = useRouter();
  const [active, setActive] = useState("Tours");

  function submit(e: FormEvent) {
    e.preventDefault();
    router.push("/tours");
  }

  return (
    <form className="search-card" onSubmit={submit}>
      <div className="search-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            type="button"
            key={t.key}
            className={active === t.key ? "active" : ""}
            onClick={() => setActive(t.key)}
          >
            <span className={`tab-icon ${t.icon}`}><Plane width={16} height={16} /></span>
            {t.key}
          </button>
        ))}
      </div>
      <div className="search-fields">
        <label>
          <span>Where would you like to go?</span>
          <span className="val"><MapPin width={14} height={14} className="text-[color:var(--accent)]" />
            <input placeholder="Enter destination" />
          </span>
        </label>
        <label>
          <span>Check In</span>
          <span className="val"><Calendar width={14} height={14} className="text-[color:var(--sky)]" />
            <input type="date" />
          </span>
        </label>
        <label>
          <span>Duration</span>
          <span className="val"><Clock width={14} height={14} className="text-[color:var(--brand)]" />
            <select>
              <option>Select duration</option>
              <option>1-3 Days</option>
              <option>4-6 Days</option>
              <option>7-9 Days</option>
              <option>10+ Days</option>
            </select>
          </span>
        </label>
        <label>
          <span>Travellers</span>
          <span className="val"><Users width={14} height={14} className="text-[color:var(--brand)]" />
            <select>
              <option>1 Adult</option>
              <option>2 Adults</option>
              <option>3 Adults</option>
              <option>Family</option>
            </select>
          </span>
        </label>
        <button className="btn btn-primary search-button" type="submit">
          <Search width={17} height={17} /> Search
        </button>
      </div>
    </form>
  );
}
