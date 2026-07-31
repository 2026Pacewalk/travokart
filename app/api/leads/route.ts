import { ensureDb } from "@/db/ensure";
import { leads } from "@/db/schema";

const clip = (v: unknown, n: number) => String(v ?? "").trim().slice(0, n);

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const name = clip(body.name, 120);
    const email = clip(body.email, 160);
    const phone = clip(body.phone, 40);
    if (!name && !email && !phone) {
      return Response.json({ ok: false, error: "Please provide your name and contact details." }, { status: 400 });
    }

    const db = await ensureDb();
    const [lead] = await db
      .insert(leads)
      .values({
        name,
        email,
        phone,
        message: clip(body.message, 2000),
        source: clip(body.source, 40) || "contact",
        tourSlug: clip(body.tourSlug, 200),
        tourTitle: clip(body.tourTitle, 200),
        destination: clip(body.destination, 160),
      })
      .returning({ id: leads.id });

    return Response.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : "Server error" }, { status: 500 });
  }
}
