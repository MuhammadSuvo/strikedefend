import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const message = String(body.message ?? "").trim();
    const phone = String(body.phone ?? "").trim() || null;
    const company = String(body.company ?? "").trim() || null;
    const service = String(body.service ?? "").trim() || null;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }
    if (message.length > 5000 || name.length > 200) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    await prisma.lead.create({
      data: { name, email, phone, company, service, message }
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("/api/leads error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
