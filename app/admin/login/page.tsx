"use client";

import { FormEvent, useState } from "react";
import { Lock, Mail, Eye, ArrowRight, Users, Newspaper, Compass, Shield, Star } from "@/components/Icons";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (data.ok) {
        window.location.href = "/admin";
        return;
      } else setError(data.error || "Login failed.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[color:var(--cloud)]">
      {/* Brand panel */}
      <div className="admin-login-panel relative hidden lg:flex flex-col justify-between p-12 overflow-hidden">
        <div className="al-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/2025/12/bora-bora-pics.jpg" alt="Travokart admin" />
        </div>
        <div className="al-ov" />
        <div className="al-orb al-orb-1" />
        <div className="al-orb al-orb-2" />

        <div className="relative z-10">
          <span className="inline-flex bg-white rounded-xl px-4 py-2.5 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Travokart" className="h-8 w-auto" />
          </span>
        </div>

        <div className="relative z-10 text-white max-w-md">
          <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-5">
            <Shield width={13} height={13} /> Control Panel
          </span>
          <h2 className="text-4xl font-extrabold leading-tight">Manage your travel business, effortlessly.</h2>
          <p className="text-white/85 mt-3">One dashboard for your leads, blog and tour packages — updates go live instantly.</p>

          <ul className="mt-8 grid gap-3">
            {[
              { I: Users, t: "Track & manage every enquiry" },
              { I: Newspaper, t: "Write and publish blog posts" },
              { I: Compass, t: "Add & edit tour packages" },
            ].map((f) => (
              <li key={f.t} className="flex items-center gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-xl bg-white/15"><f.I width={17} height={17} /></span>
                <span className="text-[15px] font-medium">{f.t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-white/85 text-sm">
          <div className="flex text-brand">{[0, 1, 2, 3, 4].map((i) => <Star key={i} width={15} height={15} />)}</div>
          Explore Travokart Vocations LLP
        </div>
      </div>

      {/* Form */}
      <div className="grid place-items-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Travokart" className="h-11 mx-auto mb-5 lg:hidden" />
            <h1 className="text-[28px] font-extrabold text-[color:var(--ink)]">Welcome back 👋</h1>
            <p className="text-[color:var(--muted)] text-sm mt-1.5">Sign in to your Travokart admin panel.</p>
          </div>

          <form onSubmit={submit} className="bg-white rounded-2xl border border-[color:var(--line)] p-7 shadow-[0_20px_50px_rgba(20,40,80,.12)] grid gap-4">
            {error && (
              <div className="text-sm text-[color:var(--accent)] bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>
            )}
            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-[color:var(--ink)]">Email address</span>
              <span className="al-field">
                <Mail width={17} height={17} className="text-[color:var(--muted)]" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="admin@travokart.com" />
              </span>
            </label>
            <label className="grid gap-1.5">
              <span className="text-[13px] font-bold text-[color:var(--ink)]">Password</span>
              <span className="al-field">
                <Lock width={17} height={17} className="text-[color:var(--muted)]" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={show ? "text" : "password"} required placeholder="••••••••" />
                <button type="button" onClick={() => setShow(!show)} className="text-[color:var(--muted)] hover:text-[color:var(--brand-dark)]" aria-label="Toggle password">
                  <Eye width={17} height={17} />
                </button>
              </span>
            </label>
            <button type="submit" disabled={busy} className="btn btn-primary w-full mt-1 disabled:opacity-60">
              {busy ? "Signing in…" : <>Sign In <ArrowRight width={17} height={17} /></>}
            </button>
          </form>
          <p className="text-center text-xs text-[color:var(--muted)] mt-6">🔒 Secured admin access · Travokart</p>
        </div>
      </div>
    </div>
  );
}
