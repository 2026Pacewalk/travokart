import { eq, sql } from "drizzle-orm";
import { ensureDb } from "@/db/ensure";
import { admins } from "@/db/schema";
import { verifyPassword, createSession, sessionCookie, isSecureRequest } from "@/lib/auth";

// Brute-force protection: max failed attempts per IP within the window.
const MAX_FAILS = 6;
const WINDOW_SECONDS = 900; // 15 minutes

function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown"
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { email?: string; password?: string };
    const email = String(body.email ?? "").toLowerCase().trim();
    const password = String(body.password ?? "");
    const ip = clientIp(request);

    const db = await ensureDb();

    // Opportunistic cleanup of old attempt rows.
    await db.run(sql`DELETE FROM login_attempts WHERE created_at < datetime('now', '-1 day')`).catch(() => {});

    // Count recent failures for this IP.
    const rows = await db.all<{ c: number }>(
      sql`SELECT COUNT(*) AS c FROM login_attempts WHERE ip = ${ip} AND created_at > datetime('now', ${"-" + WINDOW_SECONDS + " seconds"})`
    );
    const fails = Number(rows?.[0]?.c ?? 0);
    if (fails >= MAX_FAILS) {
      return Response.json(
        { ok: false, error: "Too many failed attempts. Please try again in about 15 minutes." },
        { status: 429 }
      );
    }

    const [admin] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
    const valid = admin ? await verifyPassword(password, admin.passwordHash) : false;

    if (!valid) {
      await db.run(sql`INSERT INTO login_attempts (ip) VALUES (${ip})`).catch(() => {});
      // Slow down automated guessing.
      await new Promise((r) => setTimeout(r, 700));
      return Response.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    // Success — clear this IP's failed attempts.
    await db.run(sql`DELETE FROM login_attempts WHERE ip = ${ip}`).catch(() => {});

    const token = await createSession(admin.email);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Set-Cookie": sessionCookie(token, isSecureRequest(request)) },
    });
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : "Server error" }, { status: 500 });
  }
}
