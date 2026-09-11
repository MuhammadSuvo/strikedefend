import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Cloud,
  Code2,
  Flag,
  Globe,
  Lock,
  Network,
  RefreshCw,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Smartphone,
  Target,
  UserRound,
  Users,
  Wrench,
  Workflow
} from "lucide-react";
import type { AboutContent } from "@/lib/about";

const WHY_ICONS = [Shield, Target, UserRound, BarChart3, Flag];
const DIFF_ICONS = [Users, Target, BookOpen, RefreshCw];
const PROTECT_ICONS = [Globe, Smartphone, Code2, Cloud, Server, Workflow];
const APPROACH_ICONS = [BookOpen, Search, Code2, CheckCircle2, BarChart3, Wrench, RefreshCw];
const PRINCIPLE_ICONS = [ShieldCheck, BookOpen, Lock, Shield, RefreshCw];

function AboutHeroVisual({ imageUrl }: { imageUrl?: string }) {
  if (imageUrl) {
    return (
      <div className="about-hero-visual">
        <div className="about-hero-image-wrap">
          <Image
            src={imageUrl}
            alt="StrikeDefend cybersecurity team protecting digital infrastructure"
            width={640}
            height={480}
            className="about-hero-image"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="about-hero-art" aria-hidden>
      <div className="about-hero-glow" />
      <div className="about-hero-ring about-hero-ring-1" />
      <div className="about-hero-ring about-hero-ring-2" />
      <div className="about-hero-shield">
        <ShieldCheck className="h-16 w-16 text-white sm:h-20 sm:w-20" />
      </div>
      <span className="about-float about-float-1">
        <Lock className="h-4 w-4" />
      </span>
      <span className="about-float about-float-2">
        <Shield className="h-4 w-4" />
      </span>
      <span className="about-float about-float-3">
        <Network className="h-4 w-4" />
      </span>
    </div>
  );
}

export function AboutPageView({ about }: { about: AboutContent }) {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="section grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="about-kicker">{about.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">
              {about.title}
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">{about.subtitle}</p>
            {about.paragraphs.map((p) => (
              <p key={p} className="mt-3 max-w-xl text-sm text-white/60 sm:text-base">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={about.primaryCtaLink || "/contact"} className="btn bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
                {about.primaryCta} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={about.secondaryCtaLink || "/services"} className="btn btn-outline">
                {about.secondaryCta}
              </Link>
            </div>
          </div>
          <AboutHeroVisual imageUrl={about.heroImageUrl} />
        </div>
      </section>

      <section className="about-light">
        <div className="section py-14 sm:py-20">
          <p className="about-kicker-light">{about.whyEyebrow}</p>
          <h2 className="about-h2">{about.whyTitle}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-slate-600">{about.whyIntro}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {about.whyItems.map((item, i) => {
              const Icon = WHY_ICONS[i] ?? Shield;
              return (
                <article key={item.title} className="text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
          {about.whyClosing && <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-slate-600">{about.whyClosing}</p>}
          {(about.missionTitle || about.missionBody) && (
            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center sm:p-8">
              <h3 className="text-xl font-extrabold text-slate-900">{about.missionTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{about.missionBody}</p>
            </div>
          )}
        </div>
      </section>

      <section className="about-muted">
        <div className="section py-14 sm:py-20">
          <p className="about-kicker-light">{about.differentEyebrow}</p>
          <h2 className="about-h2">{about.differentTitle}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.differentItems.map((item, i) => {
              const Icon = DIFF_ICONS[i] ?? Shield;
              return (
                <article key={item.title} className="about-card">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#eff6ff] text-[#2563eb]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-center text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-center text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-light">
        <div className="section py-14 sm:py-20">
          <p className="about-kicker-light">{about.protectEyebrow}</p>
          <h2 className="about-h2">{about.protectTitle}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {about.protectItems.map((item, i) => {
              const Icon = PROTECT_ICONS[i] ?? Shield;
              return (
                <article key={item.title} className="text-center">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-muted">
        <div className="section py-14 sm:py-20">
          <p className="about-kicker-light">{about.approachEyebrow}</p>
          <h2 className="about-h2">{about.approachTitle}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-slate-600">{about.approachIntro}</p>
          <div className="about-process mt-12">
            {about.approachSteps.map((step, i) => {
              const Icon = APPROACH_ICONS[i] ?? CheckCircle2;
              return (
                <div key={step.title} className="about-process-step">
                  <div className="about-process-icon">
                    <Icon className="h-5 w-5" />
                  </div>
                  {i < about.approachSteps.length - 1 && <span className="about-process-line" />}
                  <h3 className="mt-4 text-sm font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-light">
        <div className="section py-14 sm:py-20">
          <p className="about-kicker-light">{about.principlesEyebrow}</p>
          <h2 className="about-h2">{about.principlesTitle}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {about.principles.map((item, i) => {
              const Icon = PRINCIPLE_ICONS[i] ?? Shield;
              return (
                <article key={item.title} className="flex gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#eff6ff] text-[#2563eb]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {about.services.length > 0 && (
        <section className="about-muted">
          <div className="section py-14 sm:py-16">
            <h2 className="about-h2">{about.servicesTitle}</h2>
            <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2">
              {about.services.map((service) => (
                <li key={service} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2563eb]" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="about-compare">
        <div className="section py-14 sm:py-20">
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{about.beyondTitle}</h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/50">{about.beyondScannerLabel}</p>
              <pre className="mt-3 whitespace-pre-wrap font-mono text-sm text-rose-300">{about.beyondScannerText}</pre>
            </div>
            <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-[#2563eb] text-xs font-extrabold text-white">
              VS
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/50">{about.beyondTesterLabel}</p>
              <pre className="mt-3 whitespace-pre-wrap font-mono text-sm text-emerald-300">{about.beyondTesterText}</pre>
            </div>
          </div>
          <p className="mt-8 text-center text-white/70">{about.beyondIntro}</p>
          <ul className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2">
            {about.beyondItems.map((item) => (
              <li key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/80">
                {item}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-white/65">{about.beyondClose}</p>
        </div>
      </section>

      <section className="about-light">
        <div className="section py-14 sm:py-20">
          <h2 className="about-h2">{about.trustTitle}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-center text-slate-600">{about.trustIntro}</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.trustItems.map((item) => (
              <article key={item.title} className="about-card text-left">
                <h3 className="font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-muted">
        <div className="section grid gap-5 py-14 sm:py-20 lg:grid-cols-2">
          <article className="about-split about-split-dark">
            <h2 className="text-2xl font-extrabold text-white">{about.clientsTitle}</h2>
            <ul className="mt-6 space-y-4">
              {about.clients.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#60a5fa]" />
                  <div>
                    <div className="font-semibold text-white">{item.title}</div>
                    <p className="mt-1 text-sm text-white/65">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
          <article className="about-split about-split-light">
            <h2 className="text-2xl font-extrabold text-slate-900">{about.expectTitle}</h2>
            <ul className="mt-6 space-y-4">
              {about.expectItems.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#2563eb]" />
                  <div>
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="about-light">
        <div className="section max-w-3xl py-12 text-center sm:py-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{about.closingTitle}</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{about.closingBody}</p>
        </div>
      </section>

      <section className="section pb-16">
        <div className="about-cta">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#2563eb] text-white">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">{about.ctaTitle}</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/65 sm:text-base">{about.ctaSubtitle}</p>
              {about.ctaHighlights.length > 0 && (
                <p className="mt-3 text-sm font-medium text-white/85">{about.ctaHighlights.join(" ")}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={about.ctaPrimaryLink || "/contact"} className="btn bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
              {about.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={about.ctaSecondaryLink || "/contact"} className="btn btn-outline">
              {about.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
