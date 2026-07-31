import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const admins = sqliteTable("admins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull().default("Admin"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().default(""),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  message: text("message").notNull().default(""),
  source: text("source").notNull().default("contact"), // contact | become-expert | tour | newsletter
  tourSlug: text("tour_slug").notNull().default(""),
  tourTitle: text("tour_title").notNull().default(""),
  destination: text("destination").notNull().default(""),
  status: text("status").notNull().default("new"), // new | contacted | closed
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  parent: text("parent").notNull().default(""),
  image: text("image").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const tours = sqliteTable("tours", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  price: text("price").notNull().default(""),
  city: text("city").notNull().default(""),
  state: text("state").notNull().default(""),
  destination: text("destination").notNull().default(""),
  peopleLimit: text("people_limit").notNull().default(""),
  durationDays: text("duration_days").notNull().default(""),
  durationNights: text("duration_nights").notNull().default(""),
  image: text("image").notNull().default(""),
  gallery: text("gallery").notNull().default("[]"),
  categorySlug: text("category_slug").notNull().default(""),
  itinerary: text("itinerary").notNull().default("[]"),
  includes: text("includes").notNull().default("[]"),
  excludes: text("excludes").notNull().default("[]"),
  status: text("status").notNull().default("published"), // published | draft
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const blogs = sqliteTable("blogs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull().default(""),
  image: text("image").notNull().default(""),
  author: text("author").notNull().default("Travokart Team"),
  category: text("category").notNull().default("Travel"),
  date: text("date").notNull().default(""),
  status: text("status").notNull().default("published"), // published | draft
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type Lead = typeof leads.$inferSelect;
export type Admin = typeof admins.$inferSelect;
export type TourRow = typeof tours.$inferSelect;
export type BlogRow = typeof blogs.$inferSelect;
export type CategoryRow = typeof categories.$inferSelect;
