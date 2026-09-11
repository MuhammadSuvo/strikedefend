"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

const DEFAULT_SERVICES = ["Other"];

export function ContactForm({ services = DEFAULT_SERVICES }: { services?: string[] }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setError(null);
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-brand/30 bg-brand/10 p-6 text-sm text-white">
        Thanks — we received your message and will reply within one business day.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">First Name</label>
          <input name="firstName" required className="input" placeholder="Jane" autoComplete="given-name" />
        </div>
        <div>
          <label className="label">Last Name</label>
          <input name="lastName" required className="input" placeholder="Doe" autoComplete="family-name" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Email</label>
          <input name="email" type="email" required className="input" placeholder="jane@company.com" autoComplete="email" />
        </div>
        <div>
          <label className="label">Phone</label>
          <input name="phone" className="input" placeholder="+880 1748-801699" autoComplete="tel" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label">Company</label>
          <input name="company" className="input" placeholder="Acme Inc." autoComplete="organization" />
        </div>
        <div>
          <label className="label">Service</label>
          <select name="service" defaultValue="" className="input">
            <option value="" disabled>Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="label">Message</label>
        <textarea name="message" required rows={5} className="input" placeholder="Tell us about your project..." />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
        className={`btn btn-primary w-fit ${status === "loading" ? "cursor-not-allowed opacity-60" : ""}`}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}
