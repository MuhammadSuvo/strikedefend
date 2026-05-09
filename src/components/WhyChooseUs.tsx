import { Check } from "lucide-react";

type Item = { title: string; text: string };

export function WhyChooseUs({ title, subtitle, items }: { title: string; subtitle: string; items: Item[] }) {
  if (!items?.length) return null;
  return (
    <section className="border-y border-white/5 bg-ink-800/30">
      <div className="section grid gap-8 py-16 sm:gap-10 sm:py-20 md:grid-cols-2">
        <div>
          <span className="tag">Why StrikeDefend</span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
          <p className="mt-3 text-sm text-white/70 sm:text-base">{subtitle}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
              <Check className="h-5 w-5 text-brand" />
              <h3 className="mt-3 font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-white/60">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
