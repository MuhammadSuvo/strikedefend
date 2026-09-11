import type { ServiceRecord } from "@/lib/data-types";
import {
  createService,
  getPublishedServices as getPublishedServiceRecords,
  getServiceById,
  getServiceBySlug,
  getServices,
  saveServices,
  upsertService
} from "@/lib/data";
import { parseJsonArray, toJsonString } from "@/lib/json";
import {
  API_SERVICE_EXTRAS,
  MOBILE_SERVICE_EXTRAS,
  MONITORING_SERVICE_EXTRAS,
  NETWORK_SERVICE_EXTRAS,
  VULN_SERVICE_EXTRAS,
  WEB_SERVICE_EXTRAS,
  parseServiceExtras,
  withHeroVisualDefaults,
  type ServiceExtras
} from "@/lib/service-extras";
import { getServicePage, SERVICE_PAGES } from "@/lib/service-pages";
import {
  longformHasContent,
  API_LONGFORM,
  MOBILE_LONGFORM,
  MONITORING_LONGFORM,
  NETWORK_LONGFORM,
  VULN_LONGFORM,
  WEB_LONGFORM,
  type ServiceLongform
} from "@/lib/service-longform";

export type ServiceVisual = "web" | "mobile" | "cloud" | "monitoring";

export type ProcessStep = { step: string; title: string; text?: string };

export type ServicePageContent = {
  slug: string;
  title: string;
  shortTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  visual: ServiceVisual;
  whyTitle: string;
  whyItems: { title: string; text: string }[];
  overviewTitle: string;
  overviewText: string;
  overviewList: string[];
  assessTitle: string;
  assessItems: string[];
  standards: string[];
  processTitle: string;
  processSteps: ProcessStep[];
  tools: string[];
  industries: string[];
  deliverables: { title: string; items: string[] }[];
  faqs: { question: string; answer: string }[];
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaText: string;
  icon: string;
  imageUrl?: string | null;
  extras: ServiceExtras;
};

export type ServiceNavLink = { slug: string; label: string };

const VISUALS: ServiceVisual[] = ["web", "mobile", "cloud", "monitoring"];

const DEFAULT_IMAGES: Record<string, string> = {
  "web-application-pentesting": "/images/web-application-pentesting.png",
  "mobile-application-pentesting": "/images/mobile-application-pentesting.png",
  "api-security-testing": "/images/api-security-testing.png",
  "cloud-penetration-testing": "/images/cloud-penetration-testing.png",
  "network-security-testing": "/images/network-security-testing.png",
  "vulnerability-assessment": "/images/vulnerability-assessment.png",
  "continuous-security-monitoring": "/images/continuous-security-monitoring.png"
};

const LONGFORM_PACKAGES: Record<string, { extras: ServiceExtras; longform: ServiceLongform }> = {
  "web-application-pentesting": { extras: WEB_SERVICE_EXTRAS, longform: WEB_LONGFORM },
  "mobile-application-pentesting": { extras: MOBILE_SERVICE_EXTRAS, longform: MOBILE_LONGFORM },
  "api-security-testing": { extras: API_SERVICE_EXTRAS, longform: API_LONGFORM },
  "network-security-testing": { extras: NETWORK_SERVICE_EXTRAS, longform: NETWORK_LONGFORM },
  "vulnerability-assessment": { extras: VULN_SERVICE_EXTRAS, longform: VULN_LONGFORM },
  "continuous-security-monitoring": { extras: MONITORING_SERVICE_EXTRAS, longform: MONITORING_LONGFORM }
};

function asVisual(value: string | null | undefined): ServiceVisual {
  const v = (value ?? "web").toLowerCase() as ServiceVisual;
  return VISUALS.includes(v) ? v : "web";
}

function firstText(value: string | null | undefined, fallback: string) {
  return value && value.trim() ? value : fallback;
}

function firstList<T>(value: T[], fallback: T[]) {
  return value.length ? value : fallback;
}

function parseExtrasObject(value: unknown): Record<string, unknown> | null {
  if (!value) return null;
  if (typeof value === "object") return value as Record<string, unknown>;
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const parsed = JSON.parse(value) as unknown;
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/** True once an admin save (or seed) has written longformEnabled into extras. */
export function isLongformConfigured(extrasRaw: unknown) {
  const obj = parseExtrasObject(extrasRaw);
  return Boolean(obj && Object.prototype.hasOwnProperty.call(obj, "longformEnabled"));
}

export function defaultImageForSlug(slug: string) {
  return DEFAULT_IMAGES[slug] ?? null;
}

export function defaultLongformForSlug(slug: string) {
  return LONGFORM_PACKAGES[slug]?.longform ?? null;
}

function resolveExtras(slug: string, visual: ServiceVisual, extrasRaw: unknown): ServiceExtras {
  const extras = withHeroVisualDefaults(parseServiceExtras(extrasRaw), visual);
  const pack = LONGFORM_PACKAGES[slug];
  if (!pack) return extras;

  if (!isLongformConfigured(extrasRaw)) {
    return {
      ...extras,
      ...pack.extras,
      longformEnabled: true,
      longform: longformHasContent(extras.longform) ? extras.longform : pack.longform
    };
  }

  if (extras.longformEnabled && !longformHasContent(extras.longform)) {
    return { ...extras, longform: pack.longform };
  }
  return extras;
}

export async function ensureServiceDefaultsPersisted(record: ServiceRecord) {
  const slug = record.slug;
  const pack = LONGFORM_PACKAGES[slug];
  const defaultImage = defaultImageForSlug(slug);
  if (!pack && !defaultImage) return record;

  const needsImage = Boolean(defaultImage && !record.imageUrl);
  const needsLongform = Boolean(pack && !isLongformConfigured(record.extras));
  if (!needsImage && !needsLongform) return record;

  const nextImage = needsImage ? defaultImage : record.imageUrl;
  const nextExtras = needsLongform
    ? {
        ...withHeroVisualDefaults(parseServiceExtras(record.extras), asVisual(record.visual)),
        ...pack!.extras,
        longformEnabled: true,
        longform: pack!.longform
      }
    : record.extras;

  const updated = {
    ...record,
    imageUrl: nextImage ?? record.imageUrl,
    extras: nextExtras ?? record.extras
  };
  await upsertService(updated);
  return updated;
}

export function parseServiceRecord(record: ServiceRecord): ServicePageContent {
  const tmpl = getServicePage(record.slug);
  const visual = asVisual(
    record.visual ||
      (record.slug === "cloud-penetration-testing"
        ? "cloud"
        : record.slug === "continuous-security-monitoring"
          ? "monitoring"
          : record.slug === "mobile-application-pentesting"
            ? "mobile"
            : "web")
  );
  return {
    slug: record.slug,
    title: record.title,
    shortTitle: firstText(record.shortTitle, tmpl?.shortTitle || record.title),
    metaDescription: firstText(record.metaDescription, tmpl?.metaDescription || record.shortText),
    heroBadge: firstText(record.heroBadge, tmpl?.heroBadge || "AI + Human Penetration Testing Platform"),
    heroTitle: record.title,
    heroSubtitle: firstText(record.heroSubtitle, tmpl?.heroSubtitle || record.shortText),
    heroPrimaryCta: firstText(record.heroPrimaryCta, tmpl?.heroPrimaryCta || "Get Free Consultation"),
    heroSecondaryCta: firstText(record.heroSecondaryCta, tmpl?.heroSecondaryCta || "Contact with Us"),
    visual,
    whyTitle: firstText(record.whyTitle, tmpl?.whyTitle || "Why Choose This Service?"),
    whyItems: firstList(parseJsonArray<{ title: string; text: string }>(record.whyItems), tmpl?.whyItems ?? []),
    overviewTitle: firstText(record.overviewTitle, tmpl?.overviewTitle || "Overview"),
    overviewText: firstText(record.overviewText, tmpl?.overviewText || record.description),
    overviewList: firstList(parseJsonArray<string>(record.overviewList), tmpl?.overviewList ?? []),
    assessTitle: firstText(record.assessTitle, tmpl?.assessTitle || "What We Assess"),
    assessItems: firstList(parseJsonArray<string>(record.assessItems), tmpl?.assessItems ?? []),
    standards: firstList(parseJsonArray<string>(record.standards), tmpl?.standards ?? []),
    processTitle: firstText(record.processTitle, tmpl?.processTitle || "Process"),
    processSteps: firstList(parseJsonArray<ProcessStep>(record.processSteps), tmpl?.processSteps ?? []),
    tools: firstList(parseJsonArray<string>(record.tools), tmpl?.tools ?? []),
    industries: firstList(parseJsonArray<string>(record.industries), tmpl?.industries ?? []),
    deliverables: firstList(
      parseJsonArray<{ title: string; items: string[] }>(record.deliverables),
      tmpl?.deliverables ?? []
    ),
    faqs: firstList(parseJsonArray<{ question: string; answer: string }>(record.faqs), tmpl?.faqs ?? []),
    ctaHeadline: firstText(record.ctaHeadline, tmpl?.ctaHeadline || "Ready to get started?"),
    ctaSubtitle: firstText(record.ctaSubtitle, tmpl?.ctaSubtitle || ""),
    ctaText: firstText(record.ctaText, tmpl?.ctaText || "Request Assessment"),
    icon: record.icon ?? tmpl?.icon ?? "shield",
    imageUrl: record.imageUrl || defaultImageForSlug(record.slug),
    extras: resolveExtras(record.slug, visual, record.extras)
  };
}

export async function ensureServiceCatalog() {
  const existing = await getServices();
  const have = new Set(existing.map((s) => s.slug));
  for (const [index, page] of SERVICE_PAGES.entries()) {
    if (have.has(page.slug)) continue;
    const pack = LONGFORM_PACKAGES[page.slug];
    const imageUrl = defaultImageForSlug(page.slug);
    const extras = pack
      ? { ...pack.extras, longformEnabled: true, longform: pack.longform }
      : {};
    await createService({
      slug: page.slug,
      title: page.title,
      shortTitle: page.shortTitle,
      shortText: page.heroSubtitle.slice(0, 180),
      metaDescription: page.metaDescription,
      description: page.overviewText,
      icon: page.icon,
      visual: page.visual,
      imageUrl,
      published: true,
      order: index + 1,
      heroBadge: page.heroBadge,
      heroSubtitle: page.heroSubtitle,
      heroPrimaryCta: page.heroPrimaryCta,
      heroSecondaryCta: page.heroSecondaryCta,
      whyTitle: page.whyTitle,
      whyItems: page.whyItems,
      overviewTitle: page.overviewTitle,
      overviewText: page.overviewText,
      overviewList: page.overviewList,
      assessTitle: page.assessTitle,
      assessItems: page.assessItems,
      standards: page.standards,
      processTitle: page.processTitle,
      processSteps: page.processSteps,
      tools: page.tools,
      industries: page.industries,
      deliverables: page.deliverables,
      faqs: page.faqs,
      ctaHeadline: page.ctaHeadline,
      ctaSubtitle: page.ctaSubtitle,
      ctaText: page.ctaText,
      features: page.overviewList.slice(0, 4),
      extras
    });
  }
}

export async function getPublishedServices() {
  await ensureServiceCatalog();
  return getPublishedServiceRecords();
}

export async function getPublishedServiceLinks(): Promise<ServiceNavLink[]> {
  const rows = await getPublishedServices();
  return rows.map((s) => ({ slug: s.slug, label: s.title }));
}

export async function getServicePageBySlug(slug: string, publishedOnly = true) {
  await ensureServiceCatalog();
  const record = await getServiceBySlug(slug);
  if (!record) return null;
  if (publishedOnly && !record.published) return null;
  const withDefaults = await ensureServiceDefaultsPersisted(record);
  return parseServiceRecord(withDefaults);
}

export async function getServiceForAdmin(id: string) {
  const record = await getServiceById(id);
  if (!record) return null;
  return ensureServiceDefaultsPersisted(record);
}

export async function getAllPublishedServiceSlugs() {
  const rows = await getPublishedServices();
  return rows.map((s) => s.slug);
}

export function serviceToPageContent(record: ServiceRecord): ServicePageContent {
  return parseServiceRecord(record);
}

export function serviceCardSummary(record: ServiceRecord) {
  return {
    slug: record.slug,
    title: record.title,
    shortTitle: record.shortTitle || record.title,
    shortText: record.shortText,
    icon: record.icon,
    heroSubtitle: record.heroSubtitle || record.shortText
  };
}

export { type ServiceRecord };
