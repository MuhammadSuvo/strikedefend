import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ContactCta({
  headline,
  subtitle,
  ctaText = "Get in touch",
  ctaLink = "/contact"
}: {
  headline: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
}) {
  return (
    <section className="section py-20">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-900 p-10 md:p-14">
        <div
          aria-hidden
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
        />
        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">{headline}</h2>
            <p className="mt-3 max-w-xl text-white/70">{subtitle}</p>
          </div>
          <Link href={ctaLink} className="btn btn-primary w-fit">
            {ctaText} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
