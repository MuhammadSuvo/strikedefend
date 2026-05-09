import { prisma } from "@/lib/prisma";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ContactCta } from "@/components/ContactCta";
import { Check } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Services",
  description: "Penetration testing, load testing, and Playwright automation services."
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" }
  });

  return (
    <>
      <section className="border-b border-white/5 bg-ink-900">
        <div className="section py-14 sm:py-20">
          <span className="tag">Services</span>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">Senior expertise, focused scope</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            Three services that solve the security, performance, and automation problems most teams face.
          </p>
        </div>
      </section>

      <div className="section space-y-8 py-12 sm:space-y-12 sm:py-16">
        {services.map((s) => {
          const features = (s.features as string[]) || [];
          return (
            <section
              key={s.id}
              id={s.slug}
              className="grid scroll-mt-24 gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:gap-8 sm:p-8 md:grid-cols-[auto_1fr] md:p-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand sm:h-14 sm:w-14">
                <ServiceIcon name={s.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">{s.title}</h2>
                <p className="mt-3 text-sm text-white/70 sm:text-base">{s.description}</p>
                {features.length > 0 && (
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {features.map((f, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <ContactCta
        headline="Need a custom scope?"
        subtitle="Tell us about your stack and goals — we'll respond within one business day."
      />
    </>
  );
}
