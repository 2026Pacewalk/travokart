"use client";

import { FormEvent, useState } from "react";
import { Check } from "./Icons";

export default function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          destination: fd.get("destination"),
          message: fd.get("message"),
          source: "contact",
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) setDone(true);
      else setError(data.error || "Could not send. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <span className="grid place-items-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto mb-4">
          <Check width={30} height={30} />
        </span>
        <h3 className="text-xl font-extrabold text-ink">Thank you! 🎉</h3>
        <p className="text-muted mt-2">Your message has been received. Our team will reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      {error && <div className="text-sm text-[color:var(--accent)] bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input name="name" label="Full Name" placeholder="Your name" required />
        <Input name="phone" label="Phone" placeholder="+91 00000 00000" />
      </div>
      <Input name="email" label="Email" placeholder="you@example.com" type="email" />
      <Input name="destination" label="Destination" placeholder="Where would you like to go?" />
      <label className="grid gap-1.5">
        <span className="text-sm font-semibold text-ink">Message</span>
        <textarea name="message" rows={4} placeholder="Tell us about your trip…" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
      </label>
      <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-60">
        {busy ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Input({ name, label, placeholder, type = "text", required }: { name: string; label: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input name={name} type={type} required={required} placeholder={placeholder} className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
    </label>
  );
}
