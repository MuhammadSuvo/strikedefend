import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Cloud,
  FileText,
  Globe,
  Headphones,
  KeyRound,
  Lock,
  RefreshCw,
  ScanSearch,
  Share2,
  ShieldCheck,
  Users,
  Workflow,
  Braces
} from "lucide-react";
import type { ComparisonRow, PricingContent, PricingPlan, PricingTheme } from "@/lib/pricing";

const THEME: Record<
  PricingTheme,
  {
    name: string;
    accent: string;
    check: string;
    button: string;
    icon: string;
    includes: string;
    badge: string;
    ring: string;
  }
> = {
  blue: {
    name: "text-[#3b82f6]",
    accent: "text-[#3b82f6]",
    check: "text-[#3b82f6]",
    button: "bg-[#2563eb] text-white hover:bg-[#1d4ed8]",
    icon: "bg-[#2563eb]",
    includes: "text-[#3b82f6]",
    badge: "bg-[#2563eb] text-white",
    ring: "border-white/10"
  },
  gold: {
    name: "text-[#eab308]",
    accent: "text-[#eab308]",
    check: "text-[#eab308]",
    button: "bg-[#eab308] text-white hover:bg-[#ca8a04]",
    icon: "bg-[#eab308]",
    includes: "text-[#eab308]",
    badge: "bg-[#eab308] text-ink-900",
    ring: "border-[#eab308]/50"
  },
  purple: {
    name: "text-[#8b5cf6]",
    accent: "text-[#8b5cf6]",
    check: "text-[#8b5cf6]",
    button: "bg-[#7c3aed] text-white hover:bg-[#6d28d9]",
    icon: "bg-[#7c3aed]",
    includes: "text-[#8b5cf6]",
    badge: "bg-[#7c3aed] text-white",
    ring: "border-white/10"
  }
};

const ICONS: Record<string, typeof Globe> = {
  globe: Globe,
  shield: ShieldCheck,
  scan: ScanSearch,
  check: Check,
  api: Braces,
  lock: Lock,
  key: KeyRound,
  workflow: Workflow,
  cloud: Cloud,
  users: Users,
  path: Share2,
  file: FileText,
  refresh: RefreshCw,
  headset: Headphones
};

function isCheck(value: string) {
  const v = value.trim().toLowerCase();
  return v === "check" || v === "yes" || v === "true" || v === "✓";
}

function isDash(value: string) {
  const v = value.trim().toLowerCase();
  return !v || v === "dash" || v === "-" || v === "—" || v === "no" || v === "false";
}

function PricingHeroArt() {
  return (
    <div className="pricing-hero-art" aria-hidden>
      <div className="pricing-hero-glow" />
      <svg viewBox="0 0 520 360" className="pricing-hero-svg">
        <defs>
          <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10203a" />
            <stop offset="100%" stopColor="#0a1428" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="70" y="28" width="380" height="230" rx="18" fill="#1b2a44" />
        <rect x="86" y="44" width="348" height="198" rx="10" fill="url(#screen)" />
        <g filter="url(#glow)" transform="translate(210 78)">
          <path
            d="M50 8 L92 24 V52 C92 78 74 98 50 108 C26 98 8 78 8 52 V24 Z"
            fill="#1d4ed8"
          />
          <path
            d="M50 20 L80 32 V52 C80 72 67 88 50 96 C33 88 20 72 20 52 V32 Z"
            fill="#2563eb"
          />
          <path d="M38 58 L47 67 L64 46" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <rect x="40" y="258" width="440" height="28" rx="8" fill="#24344f" />
        <rect x="160" y="286" width="200" height="10" rx="5" fill="#1a2740" />
      </svg>
    </div>
  );
}

function PlanCard({ plan }: { plan: PricingPlan }) {
  const theme = THEME[plan.theme] ?? THEME.blue;
  return (
    <article className={`pricing-card ${plan.featured ? "pricing-card-featured" : ""} ${theme.ring}`}>
      {plan.badge && (
        <div className={`pricing-card-badge ${theme.badge}`}>
          <span aria-hidden>★</span> {plan.badge}
        </div>
      )}
      <div className={`pricing-card-icon ${theme.icon}`}>
        <ShieldCheck className="h-7 w-7 text-white" />
      </div>
      <h2 className={`text-center text-3xl font-extrabold ${theme.name}`}>{plan.title}</h2>
      <p className="mt-2 text-center text-lg font-semibold text-white">{plan.tagline}</p>
      <p className="mt-3 text-center text-sm leading-6 text-white/65">{plan.text}</p>
      {plan.includesFrom && (
        <p className={`mt-5 text-sm font-semibold ${theme.includes}`}>{plan.includesFrom}</p>
      )}
      <ul className={`space-y-2.5 text-sm text-white/80 ${plan.includesFrom ? "mt-3" : "mt-5"}`}>
        {plan.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${theme.check}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8 text-center">
        <p className={`text-4xl font-extrabold tracking-tight ${theme.accent}`}>{plan.price}</p>
        {plan.priceNote && <p className="mt-1 text-sm text-white/45">{plan.priceNote}</p>}
        <Link href={plan.ctaLink || "/contact"} className={`btn mt-5 w-full ${theme.button}`}>
          {plan.ctaText}
        </Link>
      </div>
    </article>
  );
}

function ComparisonValue({ value, theme }: { value: string; theme: PricingTheme }) {
  const color = THEME[theme]?.check ?? THEME.blue.check;
  if (isCheck(value)) return <Check className={`mx-auto h-5 w-5 ${color}`} />;
  if (isDash(value)) return <span className="text-slate-300">—</span>;
  return <span className="text-sm font-medium text-slate-600">{value}</span>;
}

function ComparisonTable({ title, plans, rows }: { title: string; plans: PricingPlan[]; rows: ComparisonRow[] }) {
  if (!rows.length) return null;
  return (
    <section className="pricing-compare">
      <div className="section py-14 sm:py-20">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">Features</th>
                {plans.map((plan) => (
                  <th
                    key={plan.title}
                    className={`px-5 py-4 text-center text-sm font-extrabold uppercase tracking-wide ${THEME[plan.theme]?.name ?? "text-slate-700"}`}
                  >
                    {plan.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const Icon = ICONS[row.icon] ?? ShieldCheck;
                return (
                  <tr key={row.feature} className="border-b border-slate-100 last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-100 text-slate-500">
                          <Icon className="h-4 w-4" />
                        </span>
                        {row.feature}
                      </div>
                    </td>
                    {plans.map((plan, i) => (
                      <td key={`${row.feature}-${plan.title}`} className="px-5 py-4 text-center">
                        <ComparisonValue value={row.values[i] ?? "dash"} theme={plan.theme} />
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function PricingPageView({ pricing }: { pricing: PricingContent }) {
  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="section grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="pricing-kicker">{pricing.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {pricing.title}
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/65 sm:text-lg">{pricing.subtitle}</p>
          </div>
          <div className="relative">
            {pricing.imageUrl ? (
              <Image
                src={pricing.imageUrl}
                alt=""
                width={720}
                height={480}
                className="relative z-10 mx-auto w-full max-w-md object-contain"
                unoptimized
              />
            ) : (
              <PricingHeroArt />
            )}
          </div>
        </div>
      </section>

      <section className="section grid gap-6 py-10 sm:py-14 lg:grid-cols-3">
        {pricing.plans.map((plan) => (
          <PlanCard key={plan.title} plan={plan} />
        ))}
      </section>

      <ComparisonTable title={pricing.comparisonTitle} plans={pricing.plans} rows={pricing.comparison} />

      <section className="section pb-16 pt-4">
        <div className="pricing-cta">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#2563eb] text-white">
              <Headphones className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold sm:text-3xl">{pricing.ctaHeadline}</h2>
              <p className="mt-2 max-w-2xl text-sm text-white/65 sm:text-base">{pricing.ctaSubtitle}</p>
            </div>
          </div>
          <Link href={pricing.ctaLink || "/contact"} className="btn shrink-0 bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
            {pricing.ctaText} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
