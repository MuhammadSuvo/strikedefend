type Step = { step: string; title: string; text: string };

export function Process({ title, steps }: { title: string; steps: Step[] }) {
  if (!steps?.length) return null;
  return (
    <section className="section py-16 sm:py-20">
      <div className="mb-10 max-w-2xl sm:mb-12">
        <span className="tag">How we work</span>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
      </div>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-4">
        {steps.map((s) => (
          <div key={s.step} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <div className="text-sm font-mono text-brand">{s.step}</div>
            <h3 className="mt-2 font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-white/60">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
