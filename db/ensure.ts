import { sql } from "drizzle-orm";
import { env } from "cloudflare:workers";
import { getDb } from "./index";
import { admins } from "./schema";
import { hashPassword } from "../lib/auth";

const DDL: string[] = [
  `CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT 'Admin',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    phone TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL DEFAULT '',
    source TEXT NOT NULL DEFAULT 'contact',
    tour_slug TEXT NOT NULL DEFAULT '',
    tour_title TEXT NOT NULL DEFAULT '',
    destination TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    parent TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
  )`,
  `CREATE TABLE IF NOT EXISTS tours (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    price TEXT NOT NULL DEFAULT '',
    city TEXT NOT NULL DEFAULT '',
    state TEXT NOT NULL DEFAULT '',
    destination TEXT NOT NULL DEFAULT '',
    people_limit TEXT NOT NULL DEFAULT '',
    duration_days TEXT NOT NULL DEFAULT '',
    duration_nights TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    gallery TEXT NOT NULL DEFAULT '[]',
    category_slug TEXT NOT NULL DEFAULT '',
    itinerary TEXT NOT NULL DEFAULT '[]',
    includes TEXT NOT NULL DEFAULT '[]',
    excludes TEXT NOT NULL DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'published',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    author TEXT NOT NULL DEFAULT 'Travokart Team',
    category TEXT NOT NULL DEFAULT 'Travel',
    date TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'published',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
];

let ready: Promise<void> | null = null;

async function init(): Promise<void> {
  const db = getDb();
  for (const stmt of DDL) {
    await db.run(sql.raw(stmt));
  }
  // Seed a default admin if none exists.
  const existing = await db.select({ id: admins.id }).from(admins).limit(1);
  if (existing.length === 0) {
    const e = env as Record<string, string | undefined>;
    const email = (e.ADMIN_EMAIL || "admin@travokart.com").toLowerCase();
    const password = e.ADMIN_PASSWORD || "Travokart@2025";
    const passwordHash = await hashPassword(password);
    await db.insert(admins).values({ email, passwordHash, name: "Travokart Admin" });
  }
}

/** Ensure schema + seed exist, then return the drizzle db. Runs once per worker instance. */
export async function ensureDb() {
  if (!ready) ready = init();
  await ready;
  return getDb();
}
