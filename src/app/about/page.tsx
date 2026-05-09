import { ContactCta } from "@/components/ContactCta";
import { ShieldCheck, Users, Target } from "lucide-react";

export const metadata = {
  title: "About",
  description: "We are a senior security and performance engineering team."
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-white/5">
        <div className="section py-14 sm:py-20">
          <span className="tag">About StrikeDefend</span>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl md:text-5xl">
            A small senior team, no junior hand-offs.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/70 sm:text-base">
            StrikeDefend was started by engineers who got tired of generic checklist reports. We do the work
            ourselves: every test is run, reviewed, and reported by a senior engineer.
          </p>
        </div>
      </section>

      <section className="section grid gap-4 py-12 sm:gap-6 sm:py-16 sm:grid-cols-2 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "Senior-only", text: "No interns, no offshore SOC. The person testing your app has shipped production code." },
          { icon: Users, title: "Small by design", text: "We stay small so we can stay sharp. Long client relationships, not a sales pipeline." },
          { icon: Target, title: "Outcomes, not paperwork", text: "Reports developers actually read, with reproduction steps and clear severity ratings." }
        ].map((v) => (
          <div key={v.title} className="card">
            <v.icon className="h-6 w-6 text-brand" />
            <h3 className="mt-4 font-semibold">{v.title}</h3>
            <p className="mt-2 text-sm text-white/70">{v.text}</p>
          </div>
        ))}
      </section>

      <section className="section py-16">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Our principles</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-brand">Truth in reports</h3>
              <p className="mt-2 text-sm text-white/70">
                We rate severity by actual impact, not template defaults. If something is informational, we say
                so — your engineering team's time matters.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-brand">Tools as means</h3>
              <p className="mt-2 text-sm text-white/70">
                Burp, k6, Playwright, custom scripts — we use whatever fits. Our value is judgment, not licenses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-brand">Free retest</h3>
              <p className="mt-2 text-sm text-white/70">
                Every engagement includes one retest after remediation, so you know the fixes actually held.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-brand">Plain English</h3>
              <p className="mt-2 text-sm text-white/70">
                Executive summary for leadership, technical detail for engineers. No jargon for the sake of it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCta headline="Let's talk." subtitle="A 30-minute call is usually enough to scope an engagement." />
    </>
  );
}
