import { eq } from "drizzle-orm";
import { ensureDb } from "@/db/ensure";
import { admins } from "@/db/schema";
import { verifyPassword, createSession, sessionCookie, isSecureRequest } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { email?: string; password?: string };
    const email = String(body.email ?? "").toLowerCase().trim();
    const password = String(body.password ?? "");

    const db = await ensureDb();
    const [admin] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);

    if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
      return Response.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    const token = await createSession(admin.email);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Set-Cookie": sessionCookie(token, isSecureRequest(request)) },
    });
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : "Server error" }, { status: 500 });
  }
}
