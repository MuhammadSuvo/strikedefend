import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getPublishedServices, serviceCardSummary } from "@/lib/service-content";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ContactCta } from "@/components/ContactCta";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: "Services",
    description:
      "Penetration testing and continuous security services for web, mobile, API, cloud, and network — delivered by StrikeDefend.",
    path: "/services"
  });
}

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <section className="border-b border-white/5 bg-ink-900">
        <div className="section py-14 sm:py-20">
          <span className="tag">Services</span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">Security services built for modern teams</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            From web and mobile pentesting to cloud assessments and continuous monitoring — senior engineers, actionable reports, free retest included.
          </p>
        </div>
      </section>

      <section className="section py-12 sm:py-16">
        {services.length === 0 ? (
          <p className="text-white/60">No services published yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((s) => {
              const card = serviceCardSummary(s);
              return (
                <Link
                  key={s.id}
                  href={`/services/${card.slug}`}
                  className="group card flex flex-col p-6 sm:p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <ServiceIcon name={card.icon} className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold sm:text-2xl">{card.title}</h2>
                  <p className="mt-3 flex-1 text-sm text-white/70">{card.shortText}</p>
                  <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brand">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <ContactCta
        headline="Not sure which service fits?"
        subtitle="Tell us about your stack and goals — we'll recommend the right engagement."
      />
    </>
  );
}
