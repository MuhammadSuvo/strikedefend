import { getSiteSettings } from "@/lib/settings";

type LeadNotifyInput = {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/**
 * Sends a contact-form alert via Resend (HTTPS — works on Cloudflare Workers).
 * Missing API key = no-op (lead is still saved in admin).
 */
export async function notifyLeadEmail(lead: LeadNotifyInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[notify-lead] RESEND_API_KEY not set — skipping email alert");
    return;
  }

  const settings = await getSiteSettings();
  const to =
    process.env.LEAD_NOTIFY_TO?.trim() ||
    settings.email ||
    "contact@strikedefend.com";
  const from =
    process.env.LEAD_NOTIFY_FROM?.trim() ||
    `${settings.siteName || "StrikeDefend"} <onboarding@resend.dev>`;

  const subject = `New contact lead from ${lead.name}`;
  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.company ? `Company: ${lead.company}` : null,
    lead.service ? `Service: ${lead.service}` : null,
    "",
    "Message:",
    lead.message,
    "",
    "View in admin: /admin/leads"
  ].filter((line) => line !== null);

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#111">
      <h2 style="margin:0 0 12px">New contact form message</h2>
      <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></p>
      ${lead.phone ? `<p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p>` : ""}
      ${lead.company ? `<p><strong>Company:</strong> ${escapeHtml(lead.company)}</p>` : ""}
      ${lead.service ? `<p><strong>Service:</strong> ${escapeHtml(lead.service)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <pre style="white-space:pre-wrap;background:#f4f4f5;padding:12px;border-radius:8px">${escapeHtml(lead.message)}</pre>
      <p style="margin-top:16px;color:#555">Also saved in Admin → Leads.</p>
    </div>
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject,
      text: lines.join("\n"),
      html
    })
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend failed (${res.status}): ${detail.slice(0, 500)}`);
  }
}
