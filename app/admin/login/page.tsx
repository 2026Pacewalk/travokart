"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "@/components/Icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Login failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-[color:var(--cloud)] p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.png" alt="Travokart" className="h-11 mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold text-[color:var(--ink)]">Admin Login</h1>
          <p className="text-[color:var(--muted)] text-sm mt-1">Sign in to manage your website.</p>
        </div>

        <form onSubmit={submit} className="bg-white rounded-2xl border border-[color:var(--line)] p-7 shadow-[var(--shadow-card)] grid gap-4">
          {error && (
            <div className="text-sm text-[color:var(--accent)] bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>
          )}
          <label className="grid gap-1.5">
            <span className="text-[13px] font-semibold text-[color:var(--ink)]">Email</span>
            <span className="flex items-center gap-2.5 admin-input" style={{ padding: 0, paddingInline: 14 }}>
              <Mail width={17} height={17} className="text-[color:var(--muted)]" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="admin@travokart.com" className="w-full py-3 outline-none bg-transparent text-sm" />
            </span>
          </label>
          <label className="grid gap-1.5">
            <span className="text-[13px] font-semibold text-[color:var(--ink)]">Password</span>
            <span className="flex items-center gap-2.5 admin-input" style={{ padding: 0, paddingInline: 14 }}>
              <Lock width={17} height={17} className="text-[color:var(--muted)]" />
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="••••••••" className="w-full py-3 outline-none bg-transparent text-sm" />
            </span>
          </label>
          <button type="submit" disabled={busy} className="btn btn-primary w-full mt-1 disabled:opacity-60">
            {busy ? "Signing in…" : <>Sign In <ArrowRight width={17} height={17} /></>}
          </button>
        </form>
        <p className="text-center text-xs text-[color:var(--muted)] mt-5">Travokart Admin · Explore Travokart Vocations LLP</p>
      </div>
    </div>
  );
}
