"use client";

import { useState } from "react";
import type { TourRow, CategoryRow } from "@/db/schema";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function toLines(json: string | undefined): string {
  try {
    const a = JSON.parse(json || "[]");
    return Array.isArray(a) ? a.join("\n") : "";
  } catch {
    return "";
  }
}
function itineraryToText(json: string | undefined): string {
  try {
    const a = JSON.parse(json || "[]") as { title: string; description: string }[];
    return a.map((d) => `${d.title} | ${d.description}`).join("\n");
  } catch {
    return "";
  }
}

export default function TourForm({
  action,
  initial,
  categories,
}: {
  action: (fd: FormData) => void | Promise<void>;
  initial?: Partial<TourRow>;
  categories: CategoryRow[];
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(initial?.slug));
  const [image, setImage] = useState(initial?.image ?? "");

  return (
    <form action={action} className="grid lg:grid-cols-[1fr_330px] gap-5 items-start">
      {/* Main */}
      <div className="grid gap-5">
        <div className="admin-card p-6 grid gap-4">
          <Field label="Tour Title">
            <input name="title" value={title} required
              onChange={(e) => { setTitle(e.target.value); if (!slugEdited) setSlug(slugify(e.target.value)); }}
              placeholder="e.g. Kullu Manali Volvo Tour" className="admin-input" />
          </Field>
          <Field label="Slug (URL)">
            <div className="flex items-center gap-2 text-sm text-[color:var(--muted)]">/tour/
              <input name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }} className="admin-input" />
            </div>
          </Field>
          <Field label="Overview / Excerpt">
            <textarea name="excerpt" defaultValue={initial?.excerpt ?? ""} rows={4} placeholder="Short overview of the tour…" className="admin-input" />
          </Field>
        </div>

        <div className="admin-card p-6 grid gap-4">
          <Field label="Itinerary — one day per line, format: Title | Description">
            <textarea name="itinerary" defaultValue={itineraryToText(initial?.itinerary)} rows={8}
              placeholder={"DAY 1 Arrival | Meet & greet at the airport, transfer to hotel.\nDAY 2 Sightseeing | Full-day city tour…"}
              className="admin-input font-mono text-[13px]" />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="What's Included (one per line)">
              <textarea name="includes" defaultValue={toLines(initial?.includes)} rows={6} placeholder={"Accommodation\nBreakfast\nTransfers"} className="admin-input text-[13px]" />
            </Field>
            <Field label="What's Excluded (one per line)">
              <textarea name="excludes" defaultValue={toLines(initial?.excludes)} rows={6} placeholder={"Flights\nVisa fees\nPersonal expenses"} className="admin-input text-[13px]" />
            </Field>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="grid gap-5">
        <div className="admin-card p-6 grid gap-4">
          <Field label="Status">
            <select name="status" defaultValue={initial?.status ?? "published"} className="admin-input">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </Field>
          <Field label="Category">
            <select name="categorySlug" defaultValue={initial?.categorySlug ?? ""} className="admin-input">
              <option value="">— Select —</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Price (₹ per person)">
            <input name="price" defaultValue={initial?.price ?? ""} placeholder="9167" className="admin-input" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Days"><input name="durationDays" defaultValue={initial?.durationDays ?? ""} placeholder="4" className="admin-input" /></Field>
            <Field label="Nights"><input name="durationNights" defaultValue={initial?.durationNights ?? ""} placeholder="3" className="admin-input" /></Field>
          </div>
          <Field label="City / Location"><input name="city" defaultValue={initial?.city ?? ""} placeholder="Kullu Manali" className="admin-input" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="State"><input name="state" defaultValue={initial?.state ?? ""} className="admin-input" /></Field>
            <Field label="Guests"><input name="peopleLimit" defaultValue={initial?.peopleLimit ?? ""} placeholder="20" className="admin-input" /></Field>
          </div>
          <input type="hidden" name="destination" defaultValue={initial?.destination ?? ""} />
          <button type="submit" className="btn btn-primary w-full">Save Tour</button>
        </div>

        <div className="admin-card p-6 grid gap-3">
          <Field label="Main Image URL">
            <input name="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/media/2025/12/tour.jpg" className="admin-input" />
          </Field>
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="Preview" className="w-full h-36 object-cover rounded-xl border border-[color:var(--line)]" />
          ) : (
            <div className="w-full h-36 rounded-xl border border-dashed border-[color:var(--line)] grid place-items-center text-[color:var(--muted)] text-sm">Image preview</div>
          )}
          <Field label="Gallery — one image URL per line">
            <textarea name="gallery" defaultValue={toLines(initial?.gallery)} rows={4} placeholder={"/media/2025/12/img1.jpg\n/media/2025/12/img2.jpg"} className="admin-input text-[12px]" />
          </Field>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[13px] font-bold text-[color:var(--ink)]">{label}</span>
      {children}
    </label>
  );
}
