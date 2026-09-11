import { parseJsonArray } from "@/lib/json";
import {
  getHomeContentRecord,
  getSiteSettingsRecord,
  saveHomeContentRecord,
  saveSiteSettingsRecord
} from "@/lib/data";
import {
  DEFAULT_SECURITY_CAPABILITIES,
  DEFAULT_SECURITY_HOTSPOTS,
  DEFAULT_SECURITY_STATS,
  DEFAULT_SECURITY_TERMINAL,
  type SecurityCapability,
  type SecurityHotspot,
  type SecurityStat,
  type SecurityTerminalLine
} from "@/lib/security-capabilities";
import { HOME_AGENT_WORKFLOW, type ExtraCard } from "@/lib/service-extras";

export async function getSiteSettings() {
  const settings = await getSiteSettingsRecord();
  return {
    ...settings,
    logoUrl: settings.logoUrl ?? null,
    faviconUrl: settings.faviconUrl ?? null,
    twitterUrl: settings.twitterUrl ?? null,
    linkedinUrl: settings.linkedinUrl ?? null,
    githubUrl: settings.githubUrl ?? null
  };
}

export async function setBlogPublished(published: boolean) {
  const settings = await getSiteSettingsRecord();
  await saveSiteSettingsRecord({ ...settings, blogPublished: published });
}

export async function isBlogPublished() {
  const settings = await getSiteSettings();
  return Boolean(settings.blogPublished);
}

export async function getHomeContent() {
  const home = await getHomeContentRecord();
  return {
    ...home,
    heroImageUrl: home.heroImageUrl ?? null,
    videoUrl: home.videoUrl ?? null,
    whyItems: parseJsonArray<{ title: string; text: string }>(home.whyItems),
    processSteps: parseJsonArray<{ step: string; title: string; text: string }>(home.processSteps),
    securityCapabilities: parseJsonArray<SecurityCapability>(
      home.securityCapabilities,
      DEFAULT_SECURITY_CAPABILITIES
    ),
    securityHotspots: parseJsonArray<SecurityHotspot>(home.securityHotspots, DEFAULT_SECURITY_HOTSPOTS),
    securityStats: parseJsonArray<SecurityStat>(home.securityStats, DEFAULT_SECURITY_STATS),
    securityTerminal: parseJsonArray<SecurityTerminalLine>(home.securityTerminal, DEFAULT_SECURITY_TERMINAL),
    workflowSpecialists: parseJsonArray<ExtraCard>(
      home.workflowSpecialists,
      HOME_AGENT_WORKFLOW.specialists
    ),
    workflowPipeline: parseJsonArray<ExtraCard>(home.workflowPipeline, HOME_AGENT_WORKFLOW.pipeline)
  };
}

export async function saveSiteSettings(data: Parameters<typeof saveSiteSettingsRecord>[0]) {
  await saveSiteSettingsRecord(data);
}

export async function saveHomeContent(data: Parameters<typeof saveHomeContentRecord>[0]) {
  await saveHomeContentRecord(data);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
