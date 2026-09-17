import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { getSiteSettings } from "@/lib/settings";
import { getPublishedServices } from "@/lib/service-content";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Contact",
    description: "Contact StrikeDefend for a free consultation on penetration testing and security assessments.",
    path: "/contact"
  });
}

export default async function ContactPage() {
  const [s, serviceRows] = await Promise.all([getSiteSettings(), getPublishedServices()]);
  const serviceOptions = [...serviceRows.map((r) => r.title), "Other"];
  return (
    <>
      <section className="border-b border-white/5">
        <div className="section py-14 sm:py-20">
          <span className="tag">Contact</span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">Let&apos;s talk about your project</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            Reply within one business day. NDAs available on request.
          </p>
        </div>
      </section>

      <section className="section grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_420px] lg:gap-12">
        <div>
          <h2 className="text-2xl font-bold">Send us a message</h2>
          <p className="mt-2 text-sm text-white/60">
            We&apos;ll review your message and get back to you with next steps.
          </p>
          <div className="mt-6">
            <ContactForm services={serviceOptions} />
          </div>
        </div>
        <aside className="space-y-4">
          <div className="card">
            <Mail className="h-5 w-5 text-brand" />
            <div className="mt-3 text-sm font-semibold">Email</div>
            <a href={`mailto:${s.email}`} className="text-sm text-white/70 hover:text-white">
              {s.email}
            </a>
          </div>
          <div className="card">
            <Phone className="h-5 w-5 text-brand" />
            <div className="mt-3 text-sm font-semibold">Phone</div>
            <a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} className="text-sm text-white/70 hover:text-white">
              {s.phone}
            </a>
          </div>
          <div className="card">
            <MapPin className="h-5 w-5 text-brand" />
            <div className="mt-3 text-sm font-semibold">Location</div>
            <p className="text-sm text-white/70">{s.address}</p>
          </div>
        </aside>
      </section>
    </>
  );
}
