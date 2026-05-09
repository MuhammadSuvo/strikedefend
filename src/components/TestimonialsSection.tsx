import Image from "next/image";
import { Star } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  avatarUrl: string | null;
  rating: number;
};

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials?.length) return null;
  return (
    <section className="border-y border-white/5 bg-ink-800/30">
      <div className="section py-20">
        <div className="mb-12 max-w-2xl">
          <span className="tag">Testimonials</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">What clients say</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.id} className="card flex h-full flex-col">
              <div className="flex gap-1 text-brand">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-white/80">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                {t.avatarUrl ? (
                  <Image src={t.avatarUrl} alt={t.name} width={40} height={40} className="rounded-full" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/20 text-sm font-semibold text-brand">
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                )}
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-white/60">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
