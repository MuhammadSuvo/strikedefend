import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedServices, serviceCardSummary } from "@/lib/service-content";
import { ServiceIcon } from "./ServiceIcon";

export async function ServicesSection() {
  const services = await getPublishedServices();
  if (!services.length) return null;

  return (
    <section className="section py-16 sm:py-20">
      <div className="mb-10 max-w-2xl sm:mb-12">
        <span className="tag">Our Services</span>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">What we do</h2>
        <p className="mt-3 text-sm text-white/70 sm:text-base">
          Focused security services covering web, mobile, cloud, and continuous monitoring.
        </p>
      </div>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        {services.map((s) => {
          const card = serviceCardSummary(s);
          return (
            <Link href={`/services/${card.slug}`} key={s.id} className="card group">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <ServiceIcon name={card.icon} />
              </div>
              <h3 className="text-lg font-semibold">{card.shortTitle}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/70">{card.shortText}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
