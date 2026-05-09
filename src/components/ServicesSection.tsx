import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "./ServiceIcon";

type Service = {
  id: string;
  slug: string;
  title: string;
  shortText: string;
  icon: string | null;
};

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="section py-16 sm:py-20">
      <div className="mb-10 max-w-2xl sm:mb-12">
        <span className="tag">Our Services</span>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">What we do</h2>
        <p className="mt-3 text-sm text-white/70 sm:text-base">
          Three focused services that cover security, performance, and automation for modern web platforms.
        </p>
      </div>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
        {services.map((s) => (
          <Link href={`/services#${s.slug}`} key={s.id} className="card group">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <ServiceIcon name={s.icon} />
            </div>
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-white/70">{s.shortText}</p>
            <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand">
              Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
