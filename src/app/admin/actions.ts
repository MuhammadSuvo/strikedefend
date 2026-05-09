"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/settings";

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

// ---------- Site Settings ----------
export async function saveSettings(fd: FormData) {
  await ensureAdmin();
  const existing = await prisma.siteSettings.findFirst();
  const data = {
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
  };
  if (existing) {
    await prisma.siteSettings.update({ where: { id: existing.id }, data });
  } else {
    await prisma.siteSettings.create({ data });
  }
  revalidatePath("/", "layout");
}

// ---------- Home Content ----------
export async function saveHome(fd: FormData) {
  await ensureAdmin();
  const existing = await prisma.homeContent.findFirst();

  const whyItems = parseStructured(str(fd, "whyItems"), ["title", "text"]);
  const processSteps = parseStructured(str(fd, "processSteps"), ["step", "title", "text"]);

  const data = {
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
    videoUrl: nullableStr(fd, "videoUrl")
  };
  if (existing) {
    await prisma.homeContent.update({ where: { id: existing.id }, data });
  } else {
    await prisma.homeContent.create({ data });
  }
  revalidatePath("/");
}

// ---------- Services ----------
export async function saveService(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const title = str(fd, "title");
  const slug = str(fd, "slug") || slugify(title);
  const data = {
    slug,
    title,
    shortText: str(fd, "shortText"),
    description: str(fd, "description"),
    icon: nullableStr(fd, "icon"),
    imageUrl: nullableStr(fd, "imageUrl"),
    features: parseList(str(fd, "features")),
    order: int(fd, "order"),
    published: bool(fd, "published")
  };
  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }
  revalidatePath("/");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteService(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (id) await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
  revalidatePath("/");
}

export async function toggleServicePublish(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const current = await prisma.service.findUnique({ where: { id } });
  if (!current) return;
  await prisma.service.update({ where: { id }, data: { published: !current.published } });
  revalidatePath("/services");
  revalidatePath("/");
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
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (id) await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
}

export async function toggleTestimonialPublish(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const current = await prisma.testimonial.findUnique({ where: { id } });
  if (!current) return;
  await prisma.testimonial.update({ where: { id }, data: { published: !current.published } });
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
    await prisma.fAQ.update({ where: { id }, data });
  } else {
    await prisma.fAQ.create({ data });
  }
  revalidatePath("/");
  redirect("/admin/faq");
}

export async function deleteFaq(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (id) await prisma.fAQ.delete({ where: { id } });
  revalidatePath("/");
}

export async function toggleFaqPublish(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const current = await prisma.fAQ.findUnique({ where: { id } });
  if (!current) return;
  await prisma.fAQ.update({ where: { id }, data: { published: !current.published } });
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
    publishedAt: wantPublished ? new Date() : null
  };
  if (id) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (existing && existing.published && wantPublished && existing.publishedAt) {
      data.publishedAt = existing.publishedAt;
    }
    await prisma.blogPost.update({ where: { id }, data });
  } else {
    await prisma.blogPost.create({ data });
  }
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function deleteBlog(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (id) await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
}

export async function toggleBlogPublish(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const current = await prisma.blogPost.findUnique({ where: { id } });
  if (!current) return;
  const nextPublished = !current.published;
  await prisma.blogPost.update({
    where: { id },
    data: {
      published: nextPublished,
      publishedAt: nextPublished ? current.publishedAt ?? new Date() : current.publishedAt
    }
  });
  revalidatePath("/blog");
}

// ---------- Leads ----------
export async function markLeadRead(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  const current = await prisma.lead.findUnique({ where: { id } });
  if (!current) return;
  await prisma.lead.update({ where: { id }, data: { read: !current.read } });
}

export async function deleteLead(fd: FormData) {
  await ensureAdmin();
  const id = str(fd, "id");
  if (id) await prisma.lead.delete({ where: { id } });
}

export async function updateLead(fd: FormData) {
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
  await prisma.lead.update({ where: { id }, data });
  revalidatePath("/admin/leads");
  redirect("/admin/leads");
}
