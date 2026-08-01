"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Users, Newspaper, Compass, Sparkle, ArrowRight } from "@/components/Icons";

const NAV = [
  { href: "/admin", label: "Dashboard", Icon: Sparkle },
  { href: "/admin/leads", label: "Leads", Icon: Users },
  { href: "/admin/blogs", label: "Blogs", Icon: Newspaper },
  { href: "/admin/tours", label: "Tours", Icon: Compass },
];

export default function AdminShell({
  email,
  title,
  children,
  actions,
}: {
  email: string;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <div className="admin-wrap">
      <aside className="admin-side">
        <div className="as-logo">
          <span className="chip">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo.png" alt="Travokart" className="h-6 w-auto" />
          </span>
          <span><strong className="text-white text-sm">Admin</strong><small>Control Panel</small></span>
        </div>
        <nav className="admin-nav">
          {NAV.map(({ href, label, Icon }) => (
            <Link key={href} href={href} className={isActive(href) ? "active" : ""}>
              <Icon width={18} height={18} /> {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <Link href="/" target="_blank" className="flex items-center gap-2 text-white/60 hover:text-white text-[13px]">
            <ArrowRight width={15} height={15} /> View website
          </Link>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-top">
          <h1>{title}</h1>
          <div className="admin-user">
            {actions}
            <span className="hidden sm:inline">{email}</span>
            <button onClick={logout} disabled={busy} className="btn btn-outline py-2 px-4 text-[13px]">
              {busy ? "…" : "Logout"}
            </button>
          </div>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
