import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
  if (!existingSettings) {
    await prisma.siteSettings.create({
      data: {
        siteName: "StrikeDefend",
        tagline: "Cybersecurity, Performance, Automation",
        primaryColor: "#06b6d4",
        accentColor: "#0ea5e9",
        email: "contact@strikedefend.com",
        phone: "+1 555 000 0000",
        address: "Remote, Worldwide",
        footerText: "© StrikeDefend. All rights reserved."
      }
    });
    console.log("Site settings created.");
  }

  const existingHome = await prisma.homeContent.findFirst();
  if (!existingHome) {
    await prisma.homeContent.create({
      data: {
        heroHeadline: "Secure, Test, and Automate Your Web Platform",
        heroSubtitle:
          "We provide penetration testing, load testing, and Playwright AI automation services to help businesses stay secure, scalable, and efficient.",
        whyItems: [
          { title: "Offensive security mindset", text: "We think like attackers so your defenses hold up." },
          { title: "Engineering-led delivery", text: "Senior engineers, not checklists. Reports you can act on." },
          { title: "Modern automation", text: "Playwright + AI keeps your regression suite small and reliable." },
          { title: "Clear, fixed pricing", text: "Scoped engagements with predictable outcomes." }
        ],
        processSteps: [
          { step: "01", title: "Discover", text: "We map your stack, threats, and goals in a kickoff call." },
          { step: "02", title: "Test", text: "Hands-on testing with manual depth and automated coverage." },
          { step: "03", title: "Report", text: "Actionable findings with severity, evidence, and reproduction." },
          { step: "04", title: "Retest", text: "Free follow-up retest to verify your fixes hold." }
        ]
      }
    });
    console.log("Home content created.");
  }

  const services = [
    {
      slug: "penetration-testing",
      title: "Penetration Testing",
      shortText: "Find vulnerabilities before attackers exploit them.",
      description:
        "Manual and automated penetration testing for web applications, APIs, and cloud infrastructure. Each engagement ends with a developer-friendly report, severity-rated findings, and a free retest.",
      icon: "shield",
      features: [
        "OWASP Top 10 + business logic testing",
        "Authenticated and unauthenticated coverage",
        "API and GraphQL testing",
        "Free retest after remediation"
      ],
      order: 1
    },
    {
      slug: "load-testing",
      title: "Load Testing",
      shortText: "Validate your application under real-world traffic.",
      description:
        "Performance testing with k6 and JMeter to measure throughput, latency, and breakpoints. We model realistic user journeys and identify the exact bottleneck — not just a number.",
      icon: "gauge",
      features: [
        "Realistic user journey modelling",
        "Stress, soak, and spike testing",
        "Database and infrastructure profiling",
        "Capacity and cost recommendations"
      ],
      order: 2
    },
    {
      slug: "web-automation",
      title: "Web Automation",
      shortText: "Automate browser workflows using Playwright and AI.",
      description:
        "Playwright-based automation for end-to-end testing, scraping, and repetitive workflows. We use AI to keep selectors stable, generate test data, and triage failures.",
      icon: "bot",
      features: [
        "End-to-end Playwright suites",
        "AI-assisted selector healing",
        "CI/CD integration",
        "Custom internal tooling"
      ],
      order: 3
    }
  ];

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: {}, create: s });
  }
  console.log(`Services seeded: ${services.length}`);

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
        "Their load test pinpointed a database lock we'd been chasing for months. Saved us a re-platform.",
      rating: 5,
      order: 2
    },
    {
      name: "Priya Natarajan",
      role: "QA Lead",
      company: "Helio Health",
      quote:
        "The Playwright suite they built cut our regression cycle from two days to forty minutes.",
      rating: 5,
      order: 3
    }
  ];
  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: t.name, company: t.company } });
    if (!existing) await prisma.testimonial.create({ data: t });
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
      question: "Can you work with our existing CI/CD?",
      answer:
        "Yes. Our Playwright suites and load tests integrate with GitHub Actions, GitLab CI, CircleCI, and most modern pipelines.",
      order: 4
    }
  ];
  for (const f of faqs) {
    const existing = await prisma.fAQ.findFirst({ where: { question: f.question } });
    if (!existing) await prisma.fAQ.create({ data: f });
  }
  console.log(`FAQs seeded: ${faqs.length}`);

  const post = await prisma.blogPost.findUnique({ where: { slug: "welcome-to-strikedefend" } });
  if (!post) {
    await prisma.blogPost.create({
      data: {
        slug: "welcome-to-strikedefend",
        title: "Welcome to StrikeDefend",
        excerpt: "Why we started StrikeDefend and what to expect from our blog.",
        content:
          "StrikeDefend exists because most teams need senior security and performance work without a six-month enterprise procurement cycle.\n\nIn this blog we'll share short, practical posts on penetration testing, load testing, and web automation — the kind of writing we wish existed when we started.",
        author: "StrikeDefend Team",
        tags: "company,intro",
        published: true,
        publishedAt: new Date()
      }
    });
    console.log("Sample blog post created.");
  }
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
