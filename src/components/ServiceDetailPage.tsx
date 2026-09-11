import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { ContactCta } from "@/components/ContactCta";
import { AgentWorkflow } from "@/components/AgentWorkflow";
import type { ServicePageContent } from "@/lib/service-content";
import { hasServiceExtras } from "@/lib/service-extras";
import { ServiceHeroVisual } from "./ServiceHeroVisual";
import { ServiceLongformPage } from "./ServiceLongformPage";
import { longformHasContent } from "@/lib/service-longform";

export function ServiceDetailPage({ service }: { service: ServicePageContent }) {
  if (service.extras.longformEnabled && longformHasContent(service.extras.longform)) {
    return <ServiceLongformPage service={service} />;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 bg-ink-900">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid-fade opacity-40"
          style={{ backgroundSize: "auto, 40px 40px, 40px 40px" }}
        />
        <div className="section relative grid gap-10 py-14 sm:py-20 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <span className="tag">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              {service.heroBadge}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{service.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">{service.heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary">
                {service.heroPrimaryCta} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-outline">
                {service.heroSecondaryCta}
              </Link>
            </div>
          </div>
          <ServiceHeroVisual
            variant={service.visual}
            imageUrl={service.imageUrl}
            label={service.extras.visualLabel}
            nodes={service.extras.visualNodes}
            command={service.extras.visualCommand}
            lines={service.extras.visualLines}
          />
        </div>
      </section>

      {service.extras.workflowEnabled && (
        <AgentWorkflow
          title={service.extras.workflowTitle}
          subtitle={service.extras.workflowSubtitle}
          manager={service.extras.workflowManager}
          specialists={service.extras.workflowSpecialists}
          pipeline={service.extras.workflowPipeline}
        />
      )}

      {hasServiceExtras(service.extras) && (service.extras.howItWorksItems.length > 0 || service.extras.benefitsItems.length > 0) && (
        <section className="section py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            {service.extras.howItWorksItems.length > 0 && (
              <div>
                <span className="tag">Process</span>
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{service.extras.howItWorksTitle}</h2>
                <div className="mt-6 space-y-4">
                  {service.extras.howItWorksItems.map((item) => (
                    <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <h3 className="font-semibold text-brand">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/70">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {service.extras.benefitsItems.length > 0 && (
              <div>
                <span className="tag">Value</span>
                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{service.extras.benefitsTitle}</h2>
                <div className="mt-6 space-y-4">
                  {service.extras.benefitsItems.map((item) => (
                    <div key={item.title} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/70">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {(service.extras.whyNeededText || service.extras.whyNeededItems.length > 0) && (
        <section className="border-y border-white/5 bg-ink-800/30">
          <div className="section py-16 sm:py-20">
            <span className="tag">Why it matters</span>
            <h2 className="mt-3 max-w-3xl text-2xl font-bold sm:text-3xl">{service.extras.whyNeededTitle}</h2>
            {service.extras.whyNeededText && (
              <p className="mt-4 max-w-3xl text-sm text-white/70 sm:text-base">{service.extras.whyNeededText}</p>
            )}
            {service.extras.whyNeededItems.length > 0 && (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {service.extras.whyNeededItems.map((item) => (
                  <div key={item.title} className="card">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{item.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Why Choose */}
      <section className="border-b border-white/5 bg-ink-800/30">
        <div className="section py-16 sm:py-20">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">{service.whyTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.whyItems.map((item) => (
              <div key={item.title} className="card">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-white/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="section py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <ServiceHeroVisual
            variant={service.visual}
            imageUrl={service.imageUrl}
            compact
            label={service.extras.visualLabel}
            nodes={service.extras.visualNodes}
            command={service.extras.visualCommand}
            lines={service.extras.visualLines}
          />
          <div>
            <span className="tag">Overview</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{service.overviewTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">{service.overviewText}</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {service.overviewList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What We Assess */}
      <section className="border-y border-white/5 bg-ink-800/30">
        <div className="section py-16 sm:py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">{service.assessTitle}</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {service.assessItems.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center text-sm font-medium text-white/90 transition-colors hover:border-brand/30 hover:bg-brand/5"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards */}
      <section className="section py-16 sm:py-20">
        <div className="max-w-3xl">
          <span className="tag">Standards</span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            {service.extras.standardsTitle}
          </h2>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            {service.extras.standardsSubtitle}
          </p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          {service.standards.map((std) => (
            <div
              key={std}
              className="flex items-center justify-center rounded-xl border border-brand/20 bg-brand/5 px-3 py-4 text-center text-xs font-semibold text-brand sm:text-sm"
            >
              {std}
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-white/5 bg-ink-800/30">
        <div className="section py-16 sm:py-20">
          <span className="tag">Process</span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{service.processTitle}</h2>
          {service.extras.processSubtitle && (
            <p className="mt-3 max-w-3xl text-sm text-white/70 sm:text-base">{service.extras.processSubtitle}</p>
          )}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {service.processSteps.map((step) => (
              <div key={`${step.step}-${step.title}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <div className="font-mono text-sm text-brand">{step.step}</div>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                {step.text && <p className="mt-2 text-sm leading-relaxed text-white/60">{step.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="section py-16 sm:py-20">
        <span className="tag">Toolkit</span>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{service.extras.toolsTitle}</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {service.tools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>

      {/* Report Preview */}
      <section className="border-y border-white/5 bg-ink-800/30">
        <div className="section py-16 sm:py-20">
          <span className="tag">Deliverables</span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Professional Security Reports</h2>
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-glow">
            <div className="border-b border-white/10 bg-ink-800 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              </div>
            </div>
            <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_2fr]">
              <div className="space-y-3">
                <div className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs font-medium text-rose-300">
                  Critical — 2 findings
                </div>
                <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs font-medium text-amber-300">
                  High — 4 findings
                </div>
                <div className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-300">
                  Medium — 7 findings
                </div>
                <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs font-medium text-emerald-300">
                  Low — 3 findings
                </div>
              </div>
              <div className="space-y-3 font-mono text-xs text-white/70 sm:text-sm">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-brand">Finding #1 — SQL Injection</div>
                  <div className="mt-1 text-white/50">CVSS 9.1 · Critical · /api/search?q=</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-brand">Finding #2 — IDOR on User Profile</div>
                  <div className="mt-1 text-white/50">CVSS 8.5 · High · /api/users/&#123;id&#125;</div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-white/40">+ 14 more findings with reproduction steps...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section py-16 sm:py-20">
        <h2 className="text-2xl font-bold sm:text-3xl">Industries We Support</h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {service.industries.map((ind) => (
            <div
              key={ind}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center text-sm font-medium"
            >
              {ind}
            </div>
          ))}
        </div>
      </section>

      {/* Deliverables cards */}
      <section className="border-y border-white/5 bg-ink-800/30">
        <div className="section py-16 sm:py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">What You&apos;ll Receive</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((d) => (
              <div key={d.title} className="card">
                <h3 className="font-semibold text-brand">{d.title}</h3>
                <ul className="mt-4 space-y-2">
                  {d.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section py-16 sm:py-20">
        <span className="tag">FAQ</span>
        <h2 className="mt-3 text-2xl font-bold sm:text-3xl">Frequently Asked Questions</h2>
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {service.faqs.map((f, i) => (
            <details
              key={i}
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

      <ContactCta
        headline={service.ctaHeadline}
        subtitle={service.ctaSubtitle}
        ctaText={service.ctaText}
      />
    </>
  );
}
