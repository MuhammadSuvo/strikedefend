import { NextResponse } from "next/server";
import { createLead } from "@/lib/data";
import { notifyLeadEmail } from "@/lib/notify-lead";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const name =
      [firstName, lastName].filter(Boolean).join(" ") ||
      String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const message = String(body.message ?? "").trim();
    const phone = String(body.phone ?? "").trim() || null;
    const company = String(body.company ?? "").trim() || null;
    const service = String(body.service ?? "").trim() || null;

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "First name, last name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }
    if (message.length > 5000 || name.length > 200) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    const lead = { name, email, phone, company, service, message, read: false };
    await createLead(lead);

    try {
      await notifyLeadEmail(lead);
    } catch (err) {
      // Lead is already saved — don't fail the visitor's form submit.
      console.error("[notify-lead] email alert failed", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/leads error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
