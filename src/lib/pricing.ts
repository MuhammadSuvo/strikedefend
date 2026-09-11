import { getPricingJson, savePricingJson } from "@/lib/data";
import { parseJsonArray, toJsonString } from "@/lib/json";

export type PricingTheme = "blue" | "gold" | "purple";

export type PricingPlan = {
  title: string;
  tagline: string;
  text: string;
  includesFrom: string;
  items: string[];
  price: string;
  priceNote: string;
  ctaText: string;
  ctaLink: string;
  theme: PricingTheme;
  featured: boolean;
  badge: string;
};

export type ComparisonRow = {
  feature: string;
  icon: string;
  values: string[];
};

export type PricingContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  plans: PricingPlan[];
  comparisonTitle: string;
  comparison: ComparisonRow[];
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaText: string;
  ctaLink: string;
};

const THEMES: PricingTheme[] = ["blue", "gold", "purple"];

export const DEFAULT_PRICING: PricingContent = {
  eyebrow: "Pricing Plans",
  title: "Choose the Right Security Assessment",
  subtitle:
    "Flexible penetration testing packages designed for startups, growing businesses, and organizations that need deeper security coverage.",
  imageUrl: "",
  plans: [
    {
      title: "Basic",
      tagline: "Essential Security Check",
      text: "Best for small websites, landing pages, MVPs, and applications with limited functionality.",
      includesFrom: "",
      items: [
        "1 Web Application / Domain",
        "Basic Reconnaissance",
        "Authentication Testing",
        "Common OWASP Top 10 Checks",
        "Input Validation Testing",
        "Security Header Review",
        "Basic API Testing",
        "Automated Vulnerability Scanning",
        "Manual Validation of Findings",
        "Vulnerability Severity Classification",
        "Technical Security Report",
        "Remediation Recommendations",
        "1 Retest After Fixes"
      ],
      price: "$499",
      priceNote: "One-time Assessment",
      ctaText: "Get Basic Assessment",
      ctaLink: "/contact",
      theme: "blue",
      featured: false,
      badge: ""
    },
    {
      title: "Golden",
      tagline: "Advanced Security Assessment",
      text: "Best for production applications that include APIs, multiple user roles, sensitive information, or business-critical workflows.",
      includesFrom: "Everything in Basic, plus:",
      items: [
        "Extended Web Application Testing",
        "Advanced API Security Testing",
        "Authorization & IDOR / BOLA Testing",
        "Role & Privilege Escalation Testing",
        "Session & Token Security",
        "File Upload Security Testing",
        "Business Logic Testing",
        "Rate Limiting & Abuse Testing",
        "Sensitive Data Exposure Review",
        "Security Misconfiguration Testing",
        "Manual Exploitation & Impact Validation",
        "Developer-Friendly Evidence",
        "Executive Summary",
        "Risk Prioritization",
        "Up to 2 Retest Cycles"
      ],
      price: "$1,299",
      priceNote: "One-time Assessment",
      ctaText: "Choose Golden",
      ctaLink: "/contact",
      theme: "gold",
      featured: true,
      badge: "Popular Choice"
    },
    {
      title: "Platinum",
      tagline: "Complete Security Assessment",
      text: "Designed for organizations requiring comprehensive application, API, infrastructure, and cloud security coverage.",
      includesFrom: "Everything in Golden, plus:",
      items: [
        "Multiple Web Applications / Domains",
        "Comprehensive API Assessment",
        "Advanced Business Logic Testing",
        "Complex Authorization Testing",
        "Cloud Security Assessment",
        "Cloud Configuration Review",
        "IAM & Privilege Review",
        "Public Exposure Assessment",
        "Storage & Database Security Review",
        "Network & Service Exposure Review",
        "Vulnerability Chaining Analysis",
        "Attack Path Analysis",
        "Advanced Manual Penetration Testing",
        "High-Risk Finding Prioritization",
        "Detailed Evidence & Proof of Impact",
        "Security Improvement Recommendations",
        "Management / Executive Report",
        "Developer Remediation Session",
        "Priority Support",
        "Up to 3 Retest Cycles"
      ],
      price: "$2,499",
      priceNote: "One-time Assessment",
      ctaText: "Request Platinum Assessment",
      ctaLink: "/contact",
      theme: "purple",
      featured: false,
      badge: ""
    }
  ],
  comparisonTitle: "Quick Comparison",
  comparison: [
    { feature: "Web Application Testing", icon: "globe", values: ["check", "check", "check"] },
    { feature: "OWASP Top 10", icon: "shield", values: ["check", "check", "check"] },
    { feature: "Automated Scanning", icon: "scan", values: ["check", "check", "check"] },
    { feature: "Manual Validation", icon: "check", values: ["check", "check", "check"] },
    { feature: "API Security", icon: "api", values: ["Basic", "Advanced", "Comprehensive"] },
    { feature: "Authentication Testing", icon: "lock", values: ["check", "check", "check"] },
    { feature: "Authorization / IDOR", icon: "key", values: ["Basic", "check", "Advanced"] },
    { feature: "Business Logic Testing", icon: "workflow", values: ["dash", "check", "Advanced"] },
    { feature: "Session / Token Testing", icon: "key", values: ["Basic", "check", "check"] },
    { feature: "Cloud Security", icon: "cloud", values: ["dash", "dash", "check"] },
    { feature: "IAM Review", icon: "users", values: ["dash", "dash", "check"] },
    { feature: "Attack Path Analysis", icon: "path", values: ["dash", "dash", "check"] },
    { feature: "Executive Report", icon: "file", values: ["dash", "check", "check"] },
    { feature: "Retesting", icon: "refresh", values: ["1 Cycle", "2 Cycles", "3 Cycles"] },
    { feature: "Priority Support", icon: "headset", values: ["dash", "dash", "check"] }
  ],
  ctaHeadline: "Not Sure Which Plan You Need?",
  ctaSubtitle:
    "Every application has a different attack surface. Tell us about your application, APIs, cloud environment, user roles, and security requirements, and we'll recommend the right level of assessment.",
  ctaText: "Talk to a Security Expert",
  ctaLink: "/contact"
};

function asString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function normalizeTheme(value: unknown, index = 0): PricingTheme {
  if (value === "blue" || value === "gold" || value === "purple") return value;
  return THEMES[index % THEMES.length];
}

export function parsePlan(raw: unknown, index = 0): PricingPlan | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Record<string, unknown>;
  const title = asString(p.title).trim();
  if (!title) return null;
  const fallback = DEFAULT_PRICING.plans[index] ?? DEFAULT_PRICING.plans[0];
  return {
    title,
    tagline: asString(p.tagline, fallback.tagline),
    text: asString(p.text, fallback.text),
    includesFrom: asString(p.includesFrom),
    items: Array.isArray(p.items)
      ? p.items.map((item) => String(item).trim()).filter(Boolean)
      : fallback.items,
    price: asString(p.price, fallback.price),
    priceNote: asString(p.priceNote, fallback.priceNote),
    ctaText: asString(p.ctaText, fallback.ctaText),
    ctaLink: asString(p.ctaLink, "/contact") || "/contact",
    theme: normalizeTheme(p.theme, index),
    featured: Boolean(p.featured),
    badge: asString(p.badge)
  };
}

export function parseComparisonRow(raw: unknown, planCount: number): ComparisonRow | null {
  if (!raw || typeof raw !== "object") return null;
  const row = raw as Record<string, unknown>;
  const feature = asString(row.feature).trim();
  if (!feature) return null;
  const values = Array.isArray(row.values)
    ? row.values.map((v) => String(v ?? "").trim())
    : asString(row.values)
        .split("|")
        .map((v) => v.trim());
  while (values.length < planCount) values.push("dash");
  return {
    feature,
    icon: asString(row.icon, "shield"),
    values: values.slice(0, Math.max(planCount, values.length))
  };
}

function looksLegacy(plans: unknown[]): boolean {
  return plans.every((p) => {
    if (!p || typeof p !== "object") return true;
    const row = p as Record<string, unknown>;
    return !row.tagline && !row.theme;
  });
}

export async function getPricingContent(): Promise<PricingContent> {
  try {
    const row = await getPricingJson<PricingContent | null>(null);
    if (!row) return DEFAULT_PRICING;

    const rawPlans = Array.isArray(row.plans) ? row.plans : DEFAULT_PRICING.plans;
    const parsedPlans = (looksLegacy(rawPlans) ? DEFAULT_PRICING.plans : rawPlans)
      .map((plan, i) => parsePlan(plan, i))
      .filter((plan): plan is PricingPlan => Boolean(plan));
    const plans = parsedPlans.length ? parsedPlans : DEFAULT_PRICING.plans;

    const rawComparison = Array.isArray(row.comparison) ? row.comparison : DEFAULT_PRICING.comparison;
    const comparison = (rawComparison.length ? rawComparison : DEFAULT_PRICING.comparison)
      .map((item) => parseComparisonRow(item, plans.length))
      .filter((item): item is ComparisonRow => Boolean(item));

    const oldTitle = "Clear scoping. No surprise invoices.";
    return {
      eyebrow: asString(row.eyebrow, DEFAULT_PRICING.eyebrow) || DEFAULT_PRICING.eyebrow,
      title: !row.title || row.title === oldTitle ? DEFAULT_PRICING.title : row.title,
      subtitle: asString(row.subtitle, DEFAULT_PRICING.subtitle) || DEFAULT_PRICING.subtitle,
      imageUrl: asString(row.imageUrl),
      plans,
      comparisonTitle: asString(row.comparisonTitle, DEFAULT_PRICING.comparisonTitle) || DEFAULT_PRICING.comparisonTitle,
      comparison: comparison.length ? comparison : DEFAULT_PRICING.comparison,
      ctaHeadline: asString(row.ctaHeadline, DEFAULT_PRICING.ctaHeadline) || DEFAULT_PRICING.ctaHeadline,
      ctaSubtitle: asString(row.ctaSubtitle, DEFAULT_PRICING.ctaSubtitle) || DEFAULT_PRICING.ctaSubtitle,
      ctaText: asString(row.ctaText, DEFAULT_PRICING.ctaText) || DEFAULT_PRICING.ctaText,
      ctaLink: asString(row.ctaLink, DEFAULT_PRICING.ctaLink) || DEFAULT_PRICING.ctaLink
    };
  } catch {
    return DEFAULT_PRICING;
  }
}

export async function savePricingContent(data: PricingContent) {
  await savePricingJson(data);
}
