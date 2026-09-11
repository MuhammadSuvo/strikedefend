"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createBlogPost,
  createFaq,
  createService,
  createTestimonial,
  deleteBlogPostById,
  deleteFaqById,
  deleteLeadById,
  deleteServiceById,
  deleteTestimonialById,
  getBlogPostById,
  getFaqById,
  getHomeContentRecord,
  getLeadById,
  getServiceById,
  getSiteSettingsRecord,
  getTestimonialById,
  updateLead,
  updateService,
  upsertBlogPost,
  upsertFaq,
  upsertTestimonial
} from "@/lib/data";
import { requireAdmin } from "@/lib/auth";
import { slugify, saveHomeContent, saveSiteSettings, setBlogPublished, isBlogPublished } from "@/lib/settings";
import { HOME_AGENT_WORKFLOW } from "@/lib/service-extras";
import { parseFlow, parseHowSteps, parseTestAreas } from "@/lib/service-longform";
import { parsePlan, parseComparisonRow, savePricingContent, type ComparisonRow, type PricingPlan } from "@/lib/pricing";
import { parseAboutContent, saveAboutContent } from "@/lib/about";

async function ensureAdmin() {
  const session = await requireAdmin();
  if (!session) throw new Error("Unauthorized");
}

function str(fd: FormData, key: string, fallback = "") {
  const v = fd.get(key);
  return typeof v === "string" ? v : fallback;
}
function nullableStr(fd: FormData, key: string) {
  const v = fd.get(key);
  if (typeof v !== "string") return null;
  return v.trim() ? v : null;
}
function bool(fd: FormData, key: string) {
  const v = fd.get(key);
  return v === "on" || v === "true" || v === "1";
}
function int(fd: FormData, key: string, fallback = 0) {
  const v = Number(fd.get(key));
  return Number.isFinite(v) ? v : fallback;
}

function parseList(input: string): string[] {
  return input
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseStructured(input: string, keys: string[]): Record<string, string>[] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((s) => s.trim());
      const obj: Record<string, string> = {};
      keys.forEach((k, i) => (obj[k] = parts[i] ?? ""));
      return obj;
    });
}

function parseDeliverables(input: string): { title: string; items: string[] }[] {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((s) => s.trim());
      const title = parts[0] ?? "";
      const items = (parts[1] ?? "")
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
      return { title, items };
    });
}

function revalidateServicePaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/services");
  if (slug) revalidatePath(`/services/${slug}`);
}

// ---------- Site Settings ----------
export async function saveSettings(fd: FormData) {
  await ensureAdmin();
  const existing = await getSiteSettingsRecord();
  await saveSiteSettings({
    ...existing,
    siteName: str(fd, "siteName"),
    tagline: str(fd, "tagline"),
    logoUrl: nullableStr(fd, "logoUrl"),
    faviconUrl: nullableStr(fd, "faviconUrl"),
    primaryColor: str(fd, "primaryColor"),
    accentColor: str(fd, "accentColor"),
    email: str(fd, "email"),
    phone: str(fd, "phone"),
    address: str(fd, "address"),
    footerText: str(fd, "footerText"),
    twitterUrl: nullableStr(fd, "twitterUrl"),
    linkedinUrl: nullableStr(fd, "linkedinUrl"),
    githubUrl: nullableStr(fd, "githubUrl")
  });
  revalidatePath("/", "layout");
}

// ---------- Home Content ----------
export async function saveHome(fd: FormData) {
  await ensureAdmin();
  const existing = await getHomeContentRecord();

  const whyItems = parseStructured(str(fd, "whyItems"), ["title", "text"]);
  const processSteps = parseStructured(str(fd, "processSteps"), ["step", "title", "text"]);
  const securityCapabilities = parseStructured(str(fd, "securityCapabilities"), [
    "icon",
    "color",
    "title",
    "text"
  ]);
  const securityHotspots = parseStructured(str(fd, "securityHotspots"), ["label", "color", "x", "y"]);
  const securityStats = parseStructured(str(fd, "securityStats"), ["value", "label"]);
  const securityTerminal = str(fd, "securityTerminal")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [status, ...rest] = line.split("|").map((s) => s.trim());
      return { status: status === "!" ? "!" : "+", text: rest.join("|").trim() };
    });

  await saveHomeContent({
    ...existing,
    heroHeadline: str(fd, "heroHeadline"),
    heroSubtitle: str(fd, "heroSubtitle"),
    heroImageUrl: nullableStr(fd, "heroImageUrl"),
    primaryCtaText: str(fd, "primaryCtaText"),
    primaryCtaLink: str(fd, "primaryCtaLink"),
    secondaryCtaText: str(fd, "secondaryCtaText"),
    secondaryCtaLink: str(fd, "secondaryCtaLink"),
    whyTitle: str(fd, "whyTitle"),
    whySubtitle: str(fd, "whySubtitle"),
    whyItems,
    processTitle: str(fd, "processTitle"),
    processSteps,
    ctaHeadline: str(fd, "ctaHeadline"),
    ctaSubtitle: str(fd, "ctaSubtitle"),
    videoEnabled: bool(fd, "videoEnabled"),
    videoTitle: str(fd, "videoTitle"),
    videoSubtitle: str(fd, "videoSubtitle"),
    videoUrl: nullableStr(fd, "videoUrl"),
    securityEnabled: bool(fd, "securityEnabled"),
    securityTag: str(fd, "securityTag"),
    securityTitle: str(fd, "securityTitle"),
    securitySubtitle: str(fd, "securitySubtitle"),
    securityCapabilities,
    securityHotspots,
    securityStats,
    securityTerminal,
    securityCtaText: str(fd, "securityCtaText"),
    securityCtaLink: str(fd, "securityCtaLink"),
    workflowEnabled: bool(fd, "workflowEnabled"),
    workflowTitle: str(fd, "workflowTitle", HOME_AGENT_WORKFLOW.title),
    workflowSubtitle: str(fd, "workflowSubtitle"),
    workflowManager: str(fd, "workflowManager", HOME_AGENT_WORKFLOW.manager),
    workflowSpecialists: parseStructured(str(fd, "workflowSpecialists"), ["title", "text"]),
    workflowPipeline: parseStructured(str(fd, "workflowPipeline"), ["title", "text"])
  });
  revalidatePath("/");
}

// ---------- About ----------
export async function saveAbout(fd: FormData) {
  await ensureAdmin();
  const cards = (key: string) =>
    parseStructured(str(fd, key), ["title", "text"]).map((row) => ({
      title: row.title,
      text: row.text
    }));
  const content = parseAboutContent({
    eyebrow: str(fd, "eyebrow"),
    title: str(fd, "title"),
    subtitle: str(fd, "subtitle"),
    paragraphs: parseList(str(fd, "paragraphs")),
    heroImageUrl: nullableStr(fd, "heroImageUrl") || "/images/strikedefend_cybersecurity_hero.png",
    primaryCta: str(fd, "primaryCta"),
    primaryCtaLink: str(fd, "primaryCtaLink", "/contact"),
    secondaryCta: str(fd, "secondaryCta"),
    secondaryCtaLink: str(fd, "secondaryCtaLink", "/services"),
    whyEyebrow: str(fd, "whyEyebrow"),
    whyTitle: str(fd, "whyTitle"),
    whyIntro: str(fd, "whyIntro"),
    whyItems: cards("whyItems"),
    whyClosing: str(fd, "whyClosing"),
    missionTitle: str(fd, "missionTitle"),
    missionBody: str(fd, "missionBody"),
    differentEyebrow: str(fd, "differentEyebrow"),
    differentTitle: str(fd, "differentTitle"),
    differentItems: cards("differentItems"),
    protectEyebrow: str(fd, "protectEyebrow"),
    protectTitle: str(fd, "protectTitle"),
    protectItems: cards("protectItems"),
    approachEyebrow: str(fd, "approachEyebrow"),
    approachTitle: str(fd, "approachTitle"),
    approachIntro: str(fd, "approachIntro"),
    approachSteps: cards("approachSteps"),
    principlesEyebrow: str(fd, "principlesEyebrow"),
    principlesTitle: str(fd, "principlesTitle"),
    principles: cards("principles"),
    servicesTitle: str(fd, "servicesTitle"),
    services: parseList(str(fd, "services")),
    beyondTitle: str(fd, "beyondTitle"),
    beyondScannerLabel: str(fd, "beyondScannerLabel"),
    beyondScannerText: str(fd, "beyondScannerText"),
    beyondTesterLabel: str(fd, "beyondTesterLabel"),
    beyondTesterText: str(fd, "beyondTesterText"),
    beyondIntro: str(fd, "beyondIntro"),
    beyondItems: parseList(str(fd, "beyondItems")),
    beyondClose: str(fd, "beyondClose"),
    trustTitle: str(fd, "trustTitle"),
    trustIntro: str(fd, "trustIntro"),
    trustItems: cards("trustItems"),
    clientsTitle: str(fd, "clientsTitle"),
    clients: cards("clients"),
    expectTitle: str(fd, "expectTitle"),
    expectItems: cards("expectItems"),
    closingTitle: str(fd, "closingTitle"),
    closingBody: str(fd, "closingBody"),
    ctaTitle: str(fd, "ctaTitle"),
    ctaSubtitle: str(fd, "ctaSubtitle"),
    ctaHighlights: parseList(str(fd, "ctaHighlights")),
    ctaPrimary: str(fd, "ctaPrimary"),
    ctaPrimaryLink: str(fd, "ctaPrimaryLink", "/contact"),
    ctaSecondary: str(fd, "ctaSecondary"),
    ctaSecondaryLink: str(fd, "ctaSecondaryLink", "/contact")
  });
  await saveAboutContent(content);
  revalidatePath("/about");
  redirect("/admin/about");
}

// ---------- Pricing ----------
export async function savePricing(fd: FormData) {
  await ensureAdmin();
  let rawPlans: unknown[] = [];
  let rawComparison: unknown[] = [];
  try {
    rawPlans = JSON.parse(str(fd, "plansJson", "[]")) as unknown[];
  } catch {
    rawPlans = [];
  }
  try {
    rawComparison = JSON.parse(str(fd, "comparisonJson", "[]")) as unknown[];
  } catch {
    rawComparison = [];
  }
  const plans = rawPlans
    .map((plan, i) => parsePlan(plan, i))
    .filter((plan): plan is PricingPlan => Boolean(plan))
    .map((plan) => ({
      ...plan,
      items: plan.items.map((item) => item.trim()).filter(Boolean)
    }));
  const comparison = rawComparison
    .map((row) => parseComparisonRow(row, plans.length))
    .filter((row): row is ComparisonRow => Boolean(row));
  await savePricingContent({
    eyebrow: str(fd, "eyebrow"),
    title: str(fd, "title"),
    subtitle: str(fd, "subtitle"),
    imageUrl: str(fd, "imageUrl"),
    plans,
    comparisonTitle: str(fd, "comparisonTitle"),
    comparison,
    ctaHeadline: str(fd, "ctaHeadline"),
    ctaSubtitle: str(fd, "ctaSubtitle"),
    ctaText: str(fd, "ctaText", "Talk to a Security Expert"),
    ctaLink: str(fd, "ctaLink", "/contact")
  });
  revalidatePath("/pricing");
  redirect("/admin/pricing");
}

// ---------- Services ----------
export async function saveService(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const slug = str(fd, "slug") || slugify(title);

  const extras = {
    workflowEnabled: bool(fd, "workflowEnabled"),
    workflowTitle: str(fd, "workflowTitle", "Agent Workflow"),
    workflowSubtitle: str(fd, "workflowSubtitle"),
    workflowManager: str(fd, "workflowManager", "Pentest Manager Agent"),
    workflowSpecialists: parseStructured(str(fd, "workflowSpecialists"), ["title", "text"]),
    workflowPipeline: parseStructured(str(fd, "workflowPipeline"), ["title", "text"]),
    howItWorksTitle: str(fd, "howItWorksTitle", "How it works"),
    howItWorksItems: parseStructured(str(fd, "howItWorksItems"), ["title", "text"]),
    benefitsTitle: str(fd, "benefitsTitle", "Benefits"),
    benefitsItems: parseStructured(str(fd, "benefitsItems"), ["title", "text"]),
    whyNeededTitle: str(fd, "whyNeededTitle", "Why your applications need this"),
    whyNeededText: str(fd, "whyNeededText"),
    whyNeededItems: parseStructured(str(fd, "whyNeededItems"), ["title", "text"]),
    visualLabel: str(fd, "visualLabel"),
    visualNodes: parseStructured(str(fd, "visualNodes"), ["text", "color", "x", "y"]),
    visualCommand: str(fd, "visualCommand"),
    visualLines: parseList(str(fd, "visualLines")),
    standardsTitle: str(fd, "standardsTitle", "Aligned with Industry Standards"),
    standardsSubtitle: str(fd, "standardsSubtitle"),
    processSubtitle: str(fd, "processSubtitle"),
    toolsTitle: str(fd, "toolsTitle", "Tools & Technologies"),
    longformEnabled: bool(fd, "longformEnabled"),
    longform: {
      introHeadline: str(fd, "introHeadline"),
      introParagraphs: parseList(str(fd, "introParagraphs")),
      platformBadge: str(fd, "platformBadge", "AI + Human Penetration Testing Platform"),
      platformTitle: str(fd, "platformTitle", "AI + Human Penetration Testing Platform"),
      platformIntro: str(fd, "platformIntro"),
      platformItems: parseStructured(str(fd, "platformItems"), ["title", "text"]),
      heroCta: parseList(str(fd, "heroCtas"))[0] || "Request a Security Assessment",
      secondaryCta: parseList(str(fd, "heroCtas"))[1] || "View Our Process",
      bottomCta: parseList(str(fd, "heroCtas"))[2] || "Get Started Now",
      heroHighlights: parseStructured(str(fd, "heroHighlights"), ["title", "text"]),
      heroTags: parseList(str(fd, "heroTags")),
      whatWeTestTitle: str(fd, "whatWeTestTitle", "What We Test"),
      whatWeTestIntro: str(fd, "whatWeTestIntro"),
      testAreas: parseTestAreas(str(fd, "testAreas")),
      howTitle: str(fd, "howTitle", "How Our Penetration Testing Works"),
      howIntro: str(fd, "howIntro"),
      howFlow: parseFlow(str(fd, "howFlow")),
      howSteps: parseHowSteps(str(fd, "howSteps")),
      processOverview: parseStructured(str(fd, "processOverview"), ["step", "title", "text"]),
      findingIntro: str(fd, "findingIntro"),
      finding: {
        vulnerabilityLabel: "Vulnerability",
        vulnerability: str(fd, "findingVulnerability"),
        severityLabel: "Severity",
        severity: str(fd, "findingSeverity"),
        componentLabel: "Affected Component",
        component: str(fd, "findingComponent"),
        riskLabel: "Risk",
        risk: str(fd, "findingRisk"),
        evidenceLabel: "Evidence",
        evidence: str(fd, "findingEvidence"),
        recommendationLabel: "Recommendation",
        recommendation: str(fd, "findingRecommendation")
      },
      findingToFixTitle: str(fd, "findingToFixTitle", "From Finding to Fix"),
      findingToFixIntro: str(fd, "findingToFixIntro"),
      findingToFixFlow: parseFlow(str(fd, "findingToFixFlow")),
      receiveTitle: str(fd, "receiveTitle", "What You Receive"),
      receiveIntro: str(fd, "receiveIntro"),
      receiveItems: parseList(str(fd, "receiveItems")),
      receiveCards: parseStructured(str(fd, "receiveCards"), ["title", "text"]),
      comparisonTitle: str(fd, "comparisonTitle", "Beyond Automated Scanning"),
      comparisonBlurb: str(fd, "comparisonBlurb"),
      comparisonCta: str(fd, "comparisonCta", "Learn How We Think"),
      scannerCode: str(fd, "scannerCode"),
      testerCode: str(fd, "testerCode"),
      scannerResult: str(fd, "scannerResult"),
      testerResult: str(fd, "testerResult"),
      whyManualTitle: str(fd, "whyManualTitle"),
      whyManualIntro: str(fd, "whyManualIntro"),
      scannerTitle: str(fd, "scannerTitle", "Scanner"),
      scannerFlow: parseFlow(str(fd, "scannerFlow")),
      testerTitle: str(fd, "testerTitle", "Penetration tester"),
      testerFlow: parseFlow(str(fd, "testerFlow")),
      whyManualConclusion: str(fd, "whyManualConclusion"),
      contextTitle: str(fd, "contextTitle"),
      contextQuote1: str(fd, "contextQuote1"),
      contextQuote2: str(fd, "contextQuote2"),
      contextIntro: str(fd, "contextIntro"),
      contextItems: parseList(str(fd, "contextItems")),
      questionsTitle: str(fd, "questionsTitle"),
      questionsIntro: str(fd, "questionsIntro"),
      questions: parseList(str(fd, "questions")),
      closeTitle: str(fd, "closeTitle"),
      closeBody: str(fd, "closeBody"),
      closeHighlights: parseList(str(fd, "closeHighlights")),
      closeQuestion: str(fd, "closeQuestion")
    }
  };

  const payload = {
    slug,
    title,
    shortTitle: str(fd, "shortTitle"),
    shortText: str(fd, "shortText"),
    metaDescription: str(fd, "metaDescription"),
    description: str(fd, "description"),
    icon: nullableStr(fd, "icon"),
    imageUrl: nullableStr(fd, "imageUrl"),
    visual: str(fd, "visual", "web"),
    features: parseList(str(fd, "features")),
    order: int(fd, "order"),
    published: bool(fd, "published"),
    heroBadge: str(fd, "heroBadge"),
    heroSubtitle: str(fd, "heroSubtitle"),
    heroPrimaryCta: str(fd, "heroPrimaryCta"),
    heroSecondaryCta: str(fd, "heroSecondaryCta"),
    whyTitle: str(fd, "whyTitle"),
    whyItems: parseStructured(str(fd, "whyItems"), ["title", "text"]),
    overviewTitle: str(fd, "overviewTitle"),
    overviewText: str(fd, "overviewText"),
    overviewList: parseList(str(fd, "overviewList")),
    assessTitle: str(fd, "assessTitle"),
    assessItems: parseList(str(fd, "assessItems")),
    standards: parseList(str(fd, "standards")),
    processTitle: str(fd, "processTitle"),
    processSteps: parseStructured(str(fd, "processSteps"), ["step", "title", "text"]),
    tools: parseList(str(fd, "tools")),
    industries: parseList(str(fd, "industries")),
    deliverables: parseDeliverables(str(fd, "deliverables")),
    faqs: parseStructured(str(fd, "faqs"), ["question", "answer"]),
    ctaHeadline: str(fd, "ctaHeadline"),
    ctaSubtitle: str(fd, "ctaSubtitle"),
    ctaText: str(fd, "ctaText"),
    extras
  };

  if (id) {
    await updateService(id, payload);
  } else {
    await createService(payload);
  }
  revalidateServicePaths(slug);
  redirect("/admin/services");
}

export async function deleteService(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (id) {
    const current = await getServiceById(id);
    await deleteServiceById(id);
    revalidateServicePaths(current?.slug);
  }
}

export async function toggleServicePublish(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const current = await getServiceById(id);
  if (!current) return;
  await updateService(id, { published: !current.published });
  revalidateServicePaths(current.slug);
}

// ---------- Testimonials ----------
export async function saveTestimonial(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const data = {
    name: str(fd, "name"),
    role: nullableStr(fd, "role"),
    company: nullableStr(fd, "company"),
    quote: str(fd, "quote"),
    avatarUrl: nullableStr(fd, "avatarUrl"),
    rating: Math.min(5, Math.max(1, int(fd, "rating", 5))),
    order: int(fd, "order"),
    published: bool(fd, "published")
  };
  if (id) {
    const existing = await getTestimonialById(id);
    if (!existing) return;
    await upsertTestimonial({ ...existing, ...data });
  } else {
    await createTestimonial(data);
  }
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (id) await deleteTestimonialById(id);
  revalidatePath("/");
}

export async function toggleTestimonialPublish(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const current = await getTestimonialById(id);
  if (!current) return;
  await upsertTestimonial({ ...current, published: !current.published });
  revalidatePath("/");
}

// ---------- FAQ ----------
export async function saveFaq(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const data = {
    question: str(fd, "question"),
    answer: str(fd, "answer"),
    order: int(fd, "order"),
    published: bool(fd, "published")
  };
  if (id) {
    const existing = await getFaqById(id);
    if (!existing) return;
    await upsertFaq({ ...existing, ...data });
  } else {
    await createFaq(data);
  }
  revalidatePath("/");
  redirect("/admin/faq");
}

export async function deleteFaq(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (id) await deleteFaqById(id);
  revalidatePath("/");
}

export async function toggleFaqPublish(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const current = await getFaqById(id);
  if (!current) return;
  await upsertFaq({ ...current, published: !current.published });
  revalidatePath("/");
}

// ---------- Blog ----------
export async function saveBlog(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const slug = str(fd, "slug") || slugify(title);
  const wantPublished = bool(fd, "published");
  const data = {
    slug,
    title,
    excerpt: str(fd, "excerpt"),
    content: str(fd, "content"),
    coverImage: nullableStr(fd, "coverImage"),
    author: str(fd, "author") || "StrikeDefend Team",
    tags: str(fd, "tags"),
    published: wantPublished,
    publishedAt: wantPublished ? new Date().toISOString() : null
  };
  if (id) {
    const existing = await getBlogPostById(id);
    if (!existing) return;
    if (existing.published && wantPublished && existing.publishedAt) {
      data.publishedAt = existing.publishedAt;
    }
    await upsertBlogPost({ ...existing, ...data, id });
  } else {
    await createBlogPost(data);
  }
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlog(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (id) await deleteBlogPostById(id);
  revalidatePath("/blog");
}

export async function toggleBlogPublish(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const current = await getBlogPostById(id);
  if (!current) return;
  const nextPublished = !current.published;
  await upsertBlogPost({
    ...current,
    published: nextPublished,
    publishedAt: nextPublished ? current.publishedAt ?? new Date().toISOString() : current.publishedAt
  });
  revalidatePath("/blog");
}

export async function toggleBlogPagePublish() {
  await ensureAdmin();
  const next = !(await isBlogPublished());
  await setBlogPublished(next);
  revalidatePath("/", "layout");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

// ---------- Leads ----------
export async function markLeadRead(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const current = await getLeadById(id);
  if (!current) return;
  await updateLead(id, { read: !current.read });
}

export async function deleteLead(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (id) await deleteLeadById(id);
}

export async function updateLeadAction(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (!id) return;
  const data = {
    name: str(fd, "name").trim(),
    email: str(fd, "email").trim().toLowerCase(),
    phone: nullableStr(fd, "phone"),
    company: nullableStr(fd, "company"),
    service: nullableStr(fd, "service"),
    message: str(fd, "message").trim(),
    read: bool(fd, "read")
  };
  if (!data.name || !data.email || !data.message) {
    throw new Error("Name, email, and message are required.");
  }
  await updateLead(id, data);
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}
