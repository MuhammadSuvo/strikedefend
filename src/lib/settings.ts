import { prisma } from "@/lib/prisma";

export async function getSiteSettings() {
  let settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    settings = await prisma.siteSettings.create({ data: {} });
  }
  return settings;
}

export async function getHomeContent() {
  let home = await prisma.homeContent.findFirst();
  if (!home) {
    home = await prisma.homeContent.create({ data: {} });
  }
  return home;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
