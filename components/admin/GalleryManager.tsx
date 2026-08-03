"use client";

import { useRef, useState } from "react";
import { Star, XMark, Plus } from "@/components/Icons";

export default function GalleryManager({ initial = [] }: { initial?: string[] }) {
  const [images, setImages] = useState<string[]>(initial.filter(Boolean));
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    setBusy(true);
    setError("");
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { ok: boolean; urls?: string[]; error?: string };
      if (data.ok && data.urls) setImages((p) => [...p, ...data.urls!]);
      else setError(data.error || "Upload failed.");
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const remove = (i: number) => setImages((p) => p.filter((_, idx) => idx !== i));
  const setMain = (i: number) =>
    setImages((p) => {
      const a = [...p];
      const [x] = a.splice(i, 1);
      a.unshift(x);
      return a;
    });
  const addUrl = () => {
    if (url.trim()) {
      setImages((p) => [...p, url.trim()]);
      setUrl("");
    }
  };

  return (
    <div>
      {/* First image is the main/featured image; the full list is the gallery */}
      <input type="hidden" name="image" value={images[0] || ""} />
      <input type="hidden" name="gallery" value={images.join("\n")} />

      <div
        className={`gm-drop ${drag ? "drag" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); upload(e.dataTransfer.files); }}
      >
        <input ref={inputRef} type="file" accept="image/*" multiple hidden
          onChange={(e) => { if (e.target.files) upload(e.target.files); e.target.value = ""; }} />
        <div className="text-[color:var(--brand-dark)] font-bold text-sm">
          {busy ? "Uploading…" : "Drag & drop images, or click to browse"}
        </div>
        <div className="text-[color:var(--muted)] text-xs mt-1">JPG, PNG, WebP · up to 8&nbsp;MB each · multiple allowed</div>
      </div>

      {error && <div className="text-sm text-[color:var(--accent)] mt-2">{error}</div>}

      {images.length > 0 && (
        <div className="gm-grid">
          {images.map((src, i) => (
            <div className="gm-thumb" key={src + i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Image ${i + 1}`} />
              {i === 0 && <span className="gm-main">Main</span>}
              <div className="gm-actions">
                {i !== 0 && (
                  <button type="button" title="Set as main" onClick={() => setMain(i)}><Star width={15} height={15} /></button>
                )}
                <button type="button" className="rm" title="Remove" onClick={() => remove(i)}><XMark width={15} height={15} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-3">
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="…or paste an image URL" className="admin-input"
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addUrl(); } }} />
        <button type="button" onClick={addUrl} className="btn btn-outline px-4 text-sm shrink-0"><Plus width={15} height={15} /> Add</button>
      </div>
    </div>
  );
}
