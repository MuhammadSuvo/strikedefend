import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  DEFAULT_SECURITY_CAPABILITIES,
  DEFAULT_SECURITY_HOTSPOTS,
  DEFAULT_SECURITY_STATS,
  DEFAULT_SECURITY_TERMINAL
} from "../src/lib/security-capabilities";
import { SERVICE_PAGES, type ServicePageContent } from "../src/lib/service-pages";
import { CLOUD_SERVICE_EXTRAS, EMPTY_SERVICE_EXTRAS, HOME_AGENT_WORKFLOW, API_SERVICE_EXTRAS, MOBILE_SERVICE_EXTRAS, MONITORING_SERVICE_EXTRAS, NETWORK_SERVICE_EXTRAS, VULN_SERVICE_EXTRAS, WEB_SERVICE_EXTRAS } from "../src/lib/service-extras";

const prisma = new PrismaClient();

function pageToDbService(page: ServicePageContent, order: number) {
  return {
    slug: page.slug,
    title: page.title,
    shortTitle: page.shortTitle,
    shortText: page.heroSubtitle.slice(0, 180),
    metaDescription: page.metaDescription,
    description: page.overviewText,
    icon: page.icon,
    visual: page.visual,
    imageUrl:
      page.slug === "cloud-penetration-testing"
        ? "/images/cloud-penetration-testing.png"
        : page.slug === "web-application-pentesting"
          ? "/images/web-application-pentesting.png"
          : page.slug === "continuous-security-monitoring"
            ? "/images/continuous-security-monitoring.png"
            : page.slug === "mobile-application-pentesting"
              ? "/images/mobile-application-pentesting.png"
              : page.slug === "api-security-testing"
                ? "/images/api-security-testing.png"
                : page.slug === "network-security-testing"
                  ? "/images/network-security-testing.png"
                  : page.slug === "vulnerability-assessment"
                    ? "/images/vulnerability-assessment.png"
                    : null,
    published: true,
    order,
    heroBadge: page.heroBadge,
    heroSubtitle: page.heroSubtitle,
    heroPrimaryCta: page.heroPrimaryCta,
    heroSecondaryCta: page.heroSecondaryCta,
    whyTitle: page.whyTitle,
    whyItems: JSON.stringify(page.whyItems),
    overviewTitle: page.overviewTitle,
    overviewText: page.overviewText,
    overviewList: JSON.stringify(page.overviewList),
    assessTitle: page.assessTitle,
    assessItems: JSON.stringify(page.assessItems),
    standards: JSON.stringify(page.standards),
    processTitle: page.processTitle,
    processSteps: JSON.stringify(page.processSteps),
    tools: JSON.stringify(page.tools),
    industries: JSON.stringify(page.industries),
    deliverables: JSON.stringify(page.deliverables),
    faqs: JSON.stringify(page.faqs),
    ctaHeadline: page.ctaHeadline,
    ctaSubtitle: page.ctaSubtitle,
    ctaText: page.ctaText,
    features: JSON.stringify(page.overviewList.slice(0, 4)),
    extras: JSON.stringify(
      page.slug === "cloud-penetration-testing"
        ? CLOUD_SERVICE_EXTRAS
        : page.slug === "web-application-pentesting"
          ? WEB_SERVICE_EXTRAS
          : page.slug === "continuous-security-monitoring"
            ? MONITORING_SERVICE_EXTRAS
            : page.slug === "mobile-application-pentesting"
              ? MOBILE_SERVICE_EXTRAS
              : page.slug === "api-security-testing"
                ? API_SERVICE_EXTRAS
                : page.slug === "network-security-testing"
                  ? NETWORK_SERVICE_EXTRAS
                  : page.slug === "vulnerability-assessment"
                    ? VULN_SERVICE_EXTRAS
                    : EMPTY_SERVICE_EXTRAS
    )
  };
}

async function main() {
  const email = process.env.SEED_ADMIN_EMAIL || "admin@strikedefend.com";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe123!";
  const name = process.env.SEED_ADMIN_NAME || "Site Admin";

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name, password: passwordHash, role: "ADMIN" }
  });
  console.log(`Admin user ready: ${user.email}`);

  const existingSettings = await prisma.siteSettings.findFirst();
  const settingsData = {
    siteName: "StrikeDefend",
    tagline: "Penetration Testing",
    primaryColor: "#06b6d4",
    accentColor: "#0ea5e9",
    email: "contact@strikedefend.com",
    phone: "+880 1748-801699",
    address: "Remote, Worldwide",
    footerText: "© StrikeDefend. All rights reserved."
  };
  if (existingSettings) {
    await prisma.siteSettings.update({
      where: { id: existingSettings.id },
      data: { tagline: settingsData.tagline, phone: settingsData.phone }
    });
  } else {
    await prisma.siteSettings.create({ data: settingsData });
    console.log("Site settings created.");
  }

  const whyItems = JSON.stringify([
    { title: "Offensive security mindset", text: "We think like attackers so your defenses hold up." },
    { title: "Engineering-led delivery", text: "Senior engineers, not checklists. Reports you can act on." },
    { title: "Manual depth, not scanners", text: "We go beyond automated scans to find business-logic flaws." },
    { title: "Clear, fixed pricing", text: "Scoped engagements with predictable outcomes." }
  ]);
  const processSteps = JSON.stringify([
    { step: "01", title: "Discover", text: "We map your stack, threats, and goals in a kickoff call." },
    { step: "02", title: "Test", text: "Hands-on penetration testing with manual depth and targeted tooling." },
    { step: "03", title: "Report", text: "Actionable findings with severity, evidence, and reproduction." },
    { step: "04", title: "Retest", text: "Free follow-up retest to verify your fixes hold." }
  ]);
  const homeData = {
    heroHeadline: "Find Vulnerabilities Before Attackers Do",
    heroSubtitle:
      "Web, mobile, cloud penetration testing and continuous security monitoring — delivered by senior engineers with reports you can act on.",
    whySubtitle: "A focused offensive security team that tests like attackers and reports like engineers.",
    whyItems,
    processSteps,
    securityEnabled: true,
    securityTag: "End-to-End Security Testing",
    securityTitle: "We test your entire attack surface — not just the homepage.",
    securitySubtitle:
      "From authentication and APIs to business logic and cloud misconfigurations, our penetration testing covers every layer attackers actually target.",
    securityCapabilities: JSON.stringify(DEFAULT_SECURITY_CAPABILITIES),
    securityHotspots: JSON.stringify(DEFAULT_SECURITY_HOTSPOTS),
    securityStats: JSON.stringify(DEFAULT_SECURITY_STATS),
    securityTerminal: JSON.stringify(DEFAULT_SECURITY_TERMINAL),
    securityCtaText: "See our testing scope",
    securityCtaLink: "/services/web-application-pentesting"
  };

  const existingHome = await prisma.homeContent.findFirst();
  if (existingHome) {
    await prisma.homeContent.update({ where: { id: existingHome.id }, data: homeData });
  } else {
    await prisma.homeContent.create({ data: homeData });
    console.log("Home content created.");
  }
  const homeRow = await prisma.homeContent.findFirst();
  if (homeRow) {
    await prisma.$executeRaw`
      UPDATE "HomeContent"
      SET workflowEnabled = 1,
          workflowTitle = ${HOME_AGENT_WORKFLOW.title},
          workflowSubtitle = ${HOME_AGENT_WORKFLOW.subtitle},
          workflowManager = ${HOME_AGENT_WORKFLOW.manager},
          workflowSpecialists = ${JSON.stringify(HOME_AGENT_WORKFLOW.specialists)},
          workflowPipeline = ${JSON.stringify(HOME_AGENT_WORKFLOW.pipeline)}
      WHERE id = ${homeRow.id}
    `;
  }

  for (const [i, page] of SERVICE_PAGES.entries()) {
    const data = pageToDbService(page, i + 1);
    await prisma.service.upsert({ where: { slug: page.slug }, update: data, create: data });
  }
  const removed = await prisma.service.deleteMany({
    where: { slug: { notIn: SERVICE_PAGES.map((p) => p.slug) } }
  });
  console.log(`Services seeded: ${SERVICE_PAGES.length} (removed ${removed.count} other services)`);

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO",
      company: "Northwind SaaS",
      quote:
        "StrikeDefend found a critical IDOR our previous vendor missed. The report read like a senior engineer wrote it — because they did.",
      rating: 5,
      order: 1
    },
    {
      name: "Marcus Reid",
      role: "Head of Engineering",
      company: "Atlas Logistics",
      quote:
        "They found an auth bypass that would have exposed customer data. The retest confirmed our fixes held.",
      rating: 5,
      order: 2
    },
    {
      name: "Priya Natarajan",
      role: "QA Lead",
      company: "Helio Health",
      quote:
        "The pentest report was the first one our developers actually used. Clear severity, reproduction, and next steps.",
      rating: 5,
      order: 3
    }
  ];
  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name, company: t.company } });
    if (existing) {
      await prisma.testimonial.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.testimonial.create({ data: t });
    }
  }
  console.log(`Testimonials seeded: ${testimonials.length}`);

  const faqs = [
    {
      question: "How long does a penetration test take?",
      answer:
        "A typical web application engagement runs 1–2 weeks of testing plus a few days for reporting. We scope precisely after a 30-minute kickoff call.",
      order: 1
    },
    {
      question: "Do you sign NDAs before scoping?",
      answer: "Yes. We're happy to sign your NDA before any technical or commercial discussion.",
      order: 2
    },
    {
      question: "What deliverables do we receive?",
      answer:
        "An executive summary, a detailed technical report with reproduction steps and severity ratings, and a free retest after remediation.",
      order: 3
    },
    {
      question: "Do you test APIs and cloud infrastructure?",
      answer:
        "Yes. Web apps, APIs (REST and GraphQL), and cloud environments are in scope when we agree them during kickoff.",
      order: 4
    }
  ];
  await prisma.fAQ.deleteMany({
    where: { question: "Can you work with our existing CI/CD?" }
  });
  for (const f of faqs) {
    const existing = await prisma.fAQ.findFirst({ where: { question: f.question } });
    if (existing) {
      await prisma.fAQ.update({ where: { id: existing.id }, data: f });
    } else {
      await prisma.fAQ.create({ data: f });
    }
  }
  console.log(`FAQs seeded: ${faqs.length}`);

  await prisma.blogPost.upsert({
    where: { slug: "welcome-to-strikedefend" },
    update: {
      excerpt: "Why we started StrikeDefend and what to expect from our blog.",
      content:
        "StrikeDefend exists because most teams need senior penetration testing without a six-month enterprise procurement cycle.\n\nIn this blog we'll share short, practical posts on offensive security and web application testing — the kind of writing we wish existed when we started.",
      tags: "company,intro"
    },
    create: {
      slug: "welcome-to-strikedefend",
      title: "Welcome to StrikeDefend",
      excerpt: "Why we started StrikeDefend and what to expect from our blog.",
      content:
        "StrikeDefend exists because most teams need senior penetration testing without a six-month enterprise procurement cycle.\n\nIn this blog we'll share short, practical posts on offensive security and web application testing — the kind of writing we wish existed when we started.",
      author: "StrikeDefend Team",
      tags: "company,intro",
      published: true,
      publishedAt: new Date()
    }
  });
  console.log("Sample blog post ready.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
