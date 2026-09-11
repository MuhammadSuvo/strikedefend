/**
 * One-time export: SQLite (Prisma) -> data/*.json
 * Run: npx tsx scripts/export-db-to-json.ts
 */
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
import path from "path";
import { DEFAULT_ABOUT } from "../src/lib/about";
import { DEFAULT_PRICING } from "../src/lib/pricing";

const prisma = new PrismaClient();
const DATA_DIR = path.join(process.cwd(), "data");

function iso(d: Date | string | null | undefined) {
  if (!d) return new Date().toISOString();
  return d instanceof Date ? d.toISOString() : String(d);
}

function parseJson(value: unknown, fallback: unknown = null) {
  if (value == null) return fallback;
  if (typeof value === "object") return value;
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

async function write(name: string, data: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(path.join(DATA_DIR, name), `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("wrote", name);
}

async function main() {
  const users = await prisma.user.findMany();
  await write(
    "users.json",
    users.map((u) => ({
      ...u,
      createdAt: iso(u.createdAt),
      updatedAt: iso(u.updatedAt)
    }))
  );

  const settings = await prisma.siteSettings.findFirst();
  let blogPublished = false;
  if (settings) {
    try {
      const rows = await prisma.$queryRaw<{ blogPublished: number | boolean | null }[]>`
        SELECT blogPublished FROM "SiteSettings" WHERE id = ${settings.id} LIMIT 1
      `;
      const value = rows[0]?.blogPublished;
      blogPublished = value === true || value === 1;
    } catch {
      blogPublished = false;
    }
  }
  await write("site-settings.json", {
    ...(settings ?? {
      id: "settings_1",
      siteName: "StrikeDefend",
      tagline: "Penetration Testing",
      primaryColor: "#06b6d4",
      accentColor: "#0ea5e9",
      email: "contact@strikedefend.com",
      phone: "+880 1748-801699",
      address: "Remote, Worldwide",
      footerText: "© StrikeDefend. All rights reserved."
    }),
    blogPublished,
    updatedAt: iso(settings?.updatedAt)
  });

  const home = await prisma.homeContent.findFirst();
  let workflow = {
    workflowEnabled: true,
    workflowTitle: "Pentest Agent Workflow",
    workflowSubtitle: "",
    workflowManager: "Pentest Manager Agent",
    workflowSpecialists: [],
    workflowPipeline: []
  };
  if (home) {
    try {
      const rows = await prisma.$queryRaw<
        {
          workflowEnabled: number | boolean | null;
          workflowTitle: string | null;
          workflowSubtitle: string | null;
          workflowManager: string | null;
          workflowSpecialists: string | null;
          workflowPipeline: string | null;
        }[]
      >`SELECT workflowEnabled, workflowTitle, workflowSubtitle, workflowManager, workflowSpecialists, workflowPipeline FROM "HomeContent" LIMIT 1`;
      const row = rows[0];
      if (row) {
        workflow = {
          workflowEnabled: row.workflowEnabled === true || row.workflowEnabled === 1,
          workflowTitle: row.workflowTitle || "Pentest Agent Workflow",
          workflowSubtitle: row.workflowSubtitle || "",
          workflowManager: row.workflowManager || "Pentest Manager Agent",
          workflowSpecialists: parseJson(row.workflowSpecialists, []),
          workflowPipeline: parseJson(row.workflowPipeline, [])
        };
      }
    } catch {
      // ignore
    }
  }
  await write("home.json", {
    ...(home ?? { id: "home_1" }),
    whyItems: parseJson(home?.whyItems, []),
    processSteps: parseJson(home?.processSteps, []),
    securityCapabilities: parseJson(home?.securityCapabilities, []),
    securityHotspots: parseJson(home?.securityHotspots, []),
    securityStats: parseJson(home?.securityStats, []),
    securityTerminal: parseJson(home?.securityTerminal, []),
    ...workflow,
    updatedAt: iso(home?.updatedAt)
  });

  try {
    const aboutRows = await prisma.$queryRaw<{ content: string }[]>`SELECT content FROM "AboutPage" LIMIT 1`;
    const about = aboutRows[0]?.content ? JSON.parse(aboutRows[0].content) : DEFAULT_ABOUT;
    await write("about.json", about);
  } catch {
    await write("about.json", DEFAULT_ABOUT);
  }

  try {
    const pricingRows = await prisma.$queryRaw<Record<string, unknown>[]>`SELECT * FROM "PricingPage" LIMIT 1`;
    const row = pricingRows[0];
    if (row) {
      await write("pricing.json", {
        eyebrow: row.eyebrow ?? DEFAULT_PRICING.eyebrow,
        title: row.title ?? DEFAULT_PRICING.title,
        subtitle: row.subtitle ?? DEFAULT_PRICING.subtitle,
        imageUrl: row.imageUrl ?? "",
        plans: parseJson(row.plans, DEFAULT_PRICING.plans),
        comparisonTitle: row.comparisonTitle ?? DEFAULT_PRICING.comparisonTitle,
        comparison: parseJson(row.comparison, DEFAULT_PRICING.comparison),
        ctaHeadline: row.ctaHeadline ?? DEFAULT_PRICING.ctaHeadline,
        ctaSubtitle: row.ctaSubtitle ?? DEFAULT_PRICING.ctaSubtitle,
        ctaText: row.ctaText ?? DEFAULT_PRICING.ctaText,
        ctaLink: row.ctaLink ?? DEFAULT_PRICING.ctaLink
      });
    } else {
      await write("pricing.json", DEFAULT_PRICING);
    }
  } catch {
    await write("pricing.json", DEFAULT_PRICING);
  }

  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  await write(
    "services.json",
    services.map((s) => {
      const sql = s as Record<string, unknown>;
      return {
        ...s,
        features: parseJson(s.features, []),
        whyItems: parseJson(s.whyItems, []),
        overviewList: parseJson(s.overviewList, []),
        assessItems: parseJson(s.assessItems, []),
        standards: parseJson(s.standards, []),
        processSteps: parseJson(s.processSteps, []),
        tools: parseJson(s.tools, []),
        industries: parseJson(s.industries, []),
        deliverables: parseJson(s.deliverables, []),
        faqs: parseJson(s.faqs, []),
        extras: parseJson((s as { extras?: string }).extras, {}),
        createdAt: iso(s.createdAt),
        updatedAt: iso(s.updatedAt)
      };
    })
  );

  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  await write(
    "testimonials.json",
    testimonials.map((t) => ({ ...t, createdAt: iso(t.createdAt), updatedAt: iso(t.updatedAt) }))
  );

  const faqs = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });
  await write(
    "faqs.json",
    faqs.map((f) => ({ ...f, createdAt: iso(f.createdAt), updatedAt: iso(f.updatedAt) }))
  );

  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  await write(
    "blog-posts.json",
    posts.map((p) => ({
      ...p,
      publishedAt: p.publishedAt ? iso(p.publishedAt) : null,
      createdAt: iso(p.createdAt),
      updatedAt: iso(p.updatedAt)
    }))
  );

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  await write(
    "leads.json",
    leads.map((l) => ({ ...l, createdAt: iso(l.createdAt) }))
  );

  await prisma.$disconnect();
  console.log("Export complete -> data/");
}

main().catch(async (err) => {
  console.error(err);
  await prisma.$disconnect();
  process.exit(1);
});
