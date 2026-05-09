type FAQ = { id: string; question: string; answer: string };

export function FaqSection({ faqs }: { faqs: FAQ[] }) {
  if (!faqs?.length) return null;
  return (
    <section className="section py-20">
      <div className="mb-10 max-w-2xl">
        <span className="tag">FAQ</span>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Common questions</h2>
      </div>
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f) => (
          <details
            key={f.id}
            className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 open:border-brand/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
              {f.question}
              <span className="text-brand transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-white/70">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
