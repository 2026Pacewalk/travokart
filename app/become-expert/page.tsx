"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import {
  User, AtSign, Mail, Lock, Eye, Check,
  Briefcase, TrendingUp, Wallet, Shield, ArrowRight, Star,
} from "@/components/Icons";

type Role = "customer" | "agent";

export default function BecomeExpertPage() {
  const [role, setRole] = useState<Role>("agent");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!agreed) return;
    setDone(true);
  }

  const benefits =
    role === "agent"
      ? [
          { I: Briefcase, t: "List unlimited packages", d: "Showcase your tours to thousands of travellers." },
          { I: Wallet, t: "Fast, secure payouts", d: "Transparent commissions with no hidden costs." },
          { I: TrendingUp, t: "Grow your business", d: "Marketing & promotion support from our team." },
          { I: Shield, t: "Dedicated support", d: "A partner manager available 24/7." },
        ]
      : [
          { I: Star, t: "Exclusive member deals", d: "Unlock special prices on holiday packages." },
          { I: Wallet, t: "Manage your bookings", d: "Track trips and payments in one place." },
          { I: Shield, t: "Secure & hassle-free", d: "Safe checkout and 24/7 travel assistance." },
          { I: TrendingUp, t: "Personalised trips", d: "Get itineraries tailored to your style." },
        ];

  return (
    <section className="bg-[color:var(--cloud)]">
      <div className="shell py-14">
        <div className="mx-auto max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden bg-white border border-[color:var(--line)]" style={{ boxShadow: "0 30px 70px rgba(20,40,80,.16)" }}>
          {/* ---------- Brand panel ---------- */}
          <div className="relative hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/2025/12/maldives-2.jpg" alt="Join Travokart as a travel expert partner" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(28,36,48,.92), rgba(224,125,26,.78))" }} />
            <div className="relative h-full flex flex-col p-9 text-white">
              <span className="inline-flex bg-white rounded-xl px-4 py-2.5 shadow-lg w-fit">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/logo.png" alt="Travokart" className="h-9 w-auto" />
              </span>
              <div className="mt-10">
                <span className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest">
                  {role === "agent" ? "Partner Program" : "Member Access"}
                </span>
                <h2 className="text-3xl font-extrabold leading-tight mt-4">
                  {role === "agent" ? "Grow your travel business with Travokart" : "Join the Travokart family"}
                </h2>
                <p className="text-white/85 mt-3 text-sm leading-relaxed max-w-sm">
                  {role === "agent"
                    ? "Partner with one of the best travel agencies in Panchkula and reach travellers across India and beyond."
                    : "Create a free account to unlock exclusive deals, manage bookings, and plan unforgettable trips."}
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                {benefits.map((b) => (
                  <li key={b.t} className="flex gap-3">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-white/15 shrink-0">
                      <b.I width={18} height={18} />
                    </span>
                    <div>
                      <div className="font-bold text-[15px]">{b.t}</div>
                      <div className="text-white/75 text-[13px]">{b.d}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8 flex items-center gap-4">
                <div className="flex text-brand">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} width={15} height={15} />
                  ))}
                </div>
                <span className="text-white/85 text-sm">Rated 5.0 by 100+ happy travellers</span>
              </div>
            </div>
          </div>

          {/* ---------- Form panel ---------- */}
          <div className="p-8 sm:p-10">
            {done ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <span className="grid place-items-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-5">
                  <Check width={30} height={30} />
                </span>
                <h1 className="text-2xl font-extrabold text-[color:var(--ink)]">Welcome aboard! 🎉</h1>
                <p className="text-[color:var(--muted)] mt-2 max-w-xs">
                  Your {role} account request has been received. Our team will reach out shortly.
                </p>
                <Link href="/" className="btn btn-primary mt-6">Back to Home <ArrowRight width={17} height={17} /></Link>
              </div>
            ) : (
              <>
                <h1 className="text-[26px] font-extrabold text-[color:var(--ink)]">Create your account</h1>
                <p className="text-[color:var(--muted)] text-sm mt-1">
                  Sign up as a customer or become a travel agent partner.
                </p>

                {/* Role toggle */}
                <div className="mt-6 grid grid-cols-2 gap-1.5 p-1.5 bg-[color:var(--cloud)] rounded-2xl">
                  {(["customer", "agent"] as Role[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${
                        role === r ? "bg-white text-[color:var(--brand-dark)] shadow-[var(--shadow-soft)]" : "text-[color:var(--muted)]"
                      }`}
                    >
                      {r === "agent" ? <Briefcase width={16} height={16} /> : <User width={16} height={16} />}
                      {r}
                    </button>
                  ))}
                </div>

                <form className="mt-6 grid gap-4" onSubmit={submit}>
                  <Field icon={<User width={17} height={17} />} label="Full Name">
                    <input required placeholder="Your name" className="tk-input" />
                  </Field>
                  {role === "agent" && (
                    <Field icon={<Briefcase width={17} height={17} />} label="Agency / Company">
                      <input placeholder="Your agency name" className="tk-input" />
                    </Field>
                  )}
                  <Field icon={<AtSign width={17} height={17} />} label="Username">
                    <input required placeholder="Choose a username" className="tk-input" />
                  </Field>
                  <Field icon={<Mail width={17} height={17} />} label="Email">
                    <input required type="email" placeholder="you@example.com" className="tk-input" />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field icon={<Lock width={17} height={17} />} label="Password" trailing={<button type="button" onClick={() => setShowPass(!showPass)} className="text-[color:var(--muted)] hover:text-[color:var(--brand-dark)]"><Eye width={16} height={16} /></button>}>
                      <input required type={showPass ? "text" : "password"} placeholder="••••••••" className="tk-input" />
                    </Field>
                    <Field icon={<Lock width={17} height={17} />} label="Confirm" trailing={<button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-[color:var(--muted)] hover:text-[color:var(--brand-dark)]"><Eye width={16} height={16} /></button>}>
                      <input required type={showConfirm ? "text" : "password"} placeholder="••••••••" className="tk-input" />
                    </Field>
                  </div>

                  <label className="flex items-start gap-2.5 text-sm text-[color:var(--muted)] cursor-pointer select-none">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 accent-[color:var(--brand)] w-4 h-4" />
                    <span>I agree with the <Link href="/terms-conditions" className="text-[color:var(--brand-dark)] font-semibold">Terms of Service</Link> and <Link href="/privcy-policy" className="text-[color:var(--brand-dark)] font-semibold">Privacy Policy</Link>.</span>
                  </label>

                  <button type="submit" disabled={!agreed} className="btn btn-primary w-full mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    {role === "agent" ? "Register as Agent" : "Create Account"} <ArrowRight width={17} height={17} />
                  </button>
                </form>

                <p className="text-center text-sm text-[color:var(--muted)] mt-6">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="text-[color:var(--brand-dark)] font-bold">Sign In</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  trailing,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[12px] font-semibold text-[color:var(--ink)]">{label}</span>
      <span className="flex items-center gap-2.5 rounded-xl border border-[color:var(--line)] bg-white px-3.5 h-12 focus-within:border-[color:var(--brand)] focus-within:ring-2 focus-within:ring-[color:var(--brand-soft)] transition">
        <span className="text-[color:var(--muted)] shrink-0">{icon}</span>
        {children}
        {trailing}
      </span>
    </label>
  );
}
