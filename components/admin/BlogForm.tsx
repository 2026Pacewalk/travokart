"use client";

import { useState } from "react";
import type { BlogRow } from "@/db/schema";
import GalleryManager from "./GalleryManager";

const CATEGORIES = ["Travel", "Guide", "Tips", "Destinations", "News"];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function BlogForm({
  action,
  initial,
}: {
  action: (fd: FormData) => void | Promise<void>;
  initial?: Partial<BlogRow>;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(initial?.slug));

  return (
    <form action={action} className="grid lg:grid-cols-[1fr_330px] gap-5 items-start">
      {/* Main */}
      <div className="admin-card p-6 grid gap-4">
        <Field label="Title">
          <input
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugEdited) setSlug(slugify(e.target.value));
            }}
            required
            placeholder="Blog post title"
            className="admin-input"
          />
        </Field>
        <Field label="Slug (URL)">
          <div className="flex items-center gap-2">
            <span className="text-[color:var(--muted)] text-sm">/</span>
            <input
              name="slug"
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
              placeholder="auto-generated-from-title"
              className="admin-input"
            />
          </div>
        </Field>
        <Field label="Excerpt (short summary)">
          <textarea name="excerpt" defaultValue={initial?.excerpt ?? ""} rows={2} placeholder="A short summary shown on cards…" className="admin-input" />
        </Field>
        <Field label="Content (HTML supported)">
          <textarea name="content" defaultValue={initial?.content ?? ""} rows={16} placeholder="<p>Write your article here…</p>" className="admin-input font-mono text-[13px]" />
        </Field>
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
            <select name="category" defaultValue={initial?.category ?? "Travel"} className="admin-input">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Author">
            <input name="author" defaultValue={initial?.author ?? "Travokart Team"} className="admin-input" />
          </Field>
          <Field label="Date">
            <input name="date" type="date" defaultValue={initial?.date ?? ""} className="admin-input" />
          </Field>
          <button type="submit" className="btn btn-primary w-full">Save Post</button>
        </div>

        <div className="admin-card p-6 grid gap-2">
          <span className="text-[13px] font-bold text-[color:var(--ink)]">Featured Image</span>
          <p className="text-[12px] text-[color:var(--muted)] -mt-1 mb-1">Upload or drag &amp; drop. The first image is used as the featured image.</p>
          <GalleryManager initial={initial?.image ? [initial.image] : []} />
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
