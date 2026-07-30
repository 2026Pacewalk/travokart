import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <section className="relative min-h-[70vh] grid place-items-center py-16">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/2025/12/maldives-2.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/80" />
      </div>
      <div className="w-[min(420px,calc(100%-32px))] bg-white rounded-2xl shadow-[var(--shadow-card)] p-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo.png" alt="Travokart" className="h-10 mx-auto mb-6" />
        <h1 className="text-xl font-extrabold text-ink text-center mb-1">Welcome Back</h1>
        <p className="text-muted text-sm text-center mb-6">Sign in to manage your bookings.</p>
        <form className="grid gap-4">
          <input placeholder="Email" type="email" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
          <input placeholder="Password" type="password" className="rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-brand" />
          <button type="submit" className="btn btn-primary w-full">Sign In</button>
        </form>
        <p className="text-center text-sm text-muted mt-5">
          New to Travokart?{" "}
          <Link href="/become-expert" className="text-brand-dark font-bold">Become an Expert</Link>
        </p>
      </div>
    </section>
  );
}
