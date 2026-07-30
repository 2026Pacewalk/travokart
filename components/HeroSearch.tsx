"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plane, MapPin, Calendar, Clock, Users, Search } from "./Icons";

export default function HeroSearch() {
  const router = useRouter();

  function submit(e: FormEvent) {
    e.preventDefault();
    router.push("/tours");
  }

  return (
    <form className="search-card" onSubmit={submit}>
      <div className="search-hook">
        <span className="search-hook-ic"><Plane width={18} height={18} /></span>
        <div className="search-hook-text">
          <strong>Your Next Adventure Awaits ✨</strong>
          <span>Search 66+ handpicked tour packages across India &amp; the world</span>
        </div>
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
