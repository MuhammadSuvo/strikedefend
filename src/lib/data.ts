import { newId, readJsonFile, readSingleton, writeJsonFile, writeSingleton } from "@/lib/store";
import type {
  BlogPostRecord,
  FaqRecord,
  HomeContentRecord,
  LeadRecord,
  ServiceRecord,
  SiteSettingsRecord,
  TestimonialRecord,
  UserRecord
} from "@/lib/data-types";

const FILES = {
  users: "users.json",
  siteSettings: "site-settings.json",
  home: "home.json",
  about: "about.json",
  pricing: "pricing.json",
  services: "services.json",
  testimonials: "testimonials.json",
  faqs: "faqs.json",
  blogPosts: "blog-posts.json",
  leads: "leads.json"
} as const;

function now() {
  return new Date().toISOString();
}

function sortByOrder<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

function sortByCreatedDesc<T extends { createdAt: string }>(items: T[]) {
  return [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// ---------- Users ----------
export async function getUsers(): Promise<UserRecord[]> {
  return readJsonFile<UserRecord[]>(FILES.users, []);
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function saveUsers(users: UserRecord[]) {
  await writeJsonFile(FILES.users, users);
}

// ---------- Site settings ----------
const DEFAULT_SITE_SETTINGS: SiteSettingsRecord = {
  id: "settings_1",
  siteName: "StrikeDefend",
  tagline: "Penetration Testing",
  logoUrl: null,
  faviconUrl: null,
  primaryColor: "#06b6d4",
  accentColor: "#0ea5e9",
  email: "contact@strikedefend.com",
  phone: "+880 1748-801699",
  address: "Remote, Worldwide",
  footerText: "© StrikeDefend. All rights reserved.",
  twitterUrl: null,
  linkedinUrl: null,
  githubUrl: null,
  blogPublished: false,
  updatedAt: now()
};

export async function getSiteSettingsRecord(): Promise<SiteSettingsRecord> {
  return readSingleton(FILES.siteSettings, DEFAULT_SITE_SETTINGS);
}

export async function saveSiteSettingsRecord(data: Omit<SiteSettingsRecord, "updatedAt"> & Partial<Pick<SiteSettingsRecord, "updatedAt">>) {
  await writeSingleton(FILES.siteSettings, { ...data, updatedAt: now() } as SiteSettingsRecord);
}

// ---------- Home ----------
const DEFAULT_HOME: HomeContentRecord = {
  id: "home_1",
  heroHeadline: "Find Vulnerabilities Before Attackers Do",
  heroSubtitle:
    "We provide senior penetration testing for web applications, APIs, and cloud infrastructure — with reports you can actually act on.",
  heroImageUrl: null,
  primaryCtaText: "Get a Free Consultation",
  primaryCtaLink: "/contact",
  secondaryCtaText: "Explore Services",
  secondaryCtaLink: "/services",
  whyTitle: "Why teams choose StrikeDefend",
  whySubtitle: "A focused offensive security team that tests like attackers and reports like engineers.",
  whyItems: [],
  processTitle: "How we work",
  processSteps: [],
  ctaHeadline: "Ready to harden your platform?",
  ctaSubtitle: "Book a free 30-minute consultation with our team.",
  videoEnabled: false,
  videoTitle: "See StrikeDefend in action",
  videoSubtitle: "A short walkthrough of how we approach an engagement.",
  videoUrl: null,
  securityEnabled: true,
  securityTag: "End-to-End Security Testing",
  securityTitle: "We test your entire attack surface — not just the homepage.",
  securitySubtitle:
    "From authentication and APIs to business logic and cloud misconfigurations, our penetration testing covers every layer attackers actually target.",
  securityCapabilities: [],
  securityHotspots: [],
  securityStats: [],
  securityTerminal: [],
  securityCtaText: "See our testing scope",
  securityCtaLink: "/services#penetration-testing",
  workflowEnabled: true,
  workflowTitle: "Pentest Agent Workflow",
  workflowSubtitle:
    "A manager agent coordinates specialist agents in parallel, then validates, evidences, and scores findings before a human reviews the report.",
  workflowManager: "Pentest Manager Agent",
  workflowSpecialists: [],
  workflowPipeline: [],
  updatedAt: now()
};

export async function getHomeContentRecord(): Promise<HomeContentRecord> {
  return readSingleton(FILES.home, DEFAULT_HOME);
}

export async function saveHomeContentRecord(data: Omit<HomeContentRecord, "updatedAt"> & Partial<Pick<HomeContentRecord, "updatedAt">>) {
  await writeSingleton(FILES.home, { ...data, updatedAt: now() } as HomeContentRecord);
}

// ---------- About / Pricing (raw JSON blobs) ----------
export async function getAboutJson<T>(fallback: T): Promise<T> {
  return readSingleton<T>(FILES.about, fallback);
}

export async function saveAboutJson<T>(data: T) {
  await writeSingleton(FILES.about, data);
}

export async function getPricingJson<T>(fallback: T): Promise<T> {
  return readSingleton<T>(FILES.pricing, fallback);
}

export async function savePricingJson<T>(data: T) {
  await writeSingleton(FILES.pricing, data);
}

// ---------- Services ----------
export async function getServices(): Promise<ServiceRecord[]> {
  const services = await readJsonFile<ServiceRecord[]>(FILES.services, []);
  return sortByOrder(services);
}

export async function saveServices(services: ServiceRecord[]) {
  await writeJsonFile(FILES.services, services);
}

export async function getServiceBySlug(slug: string) {
  const services = await getServices();
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getServiceById(id: string) {
  const services = await getServices();
  return services.find((s) => s.id === id) ?? null;
}

export async function upsertService(record: ServiceRecord) {
  const services = await getServices();
  const index = services.findIndex((s) => s.id === record.id);
  const next = { ...record, updatedAt: now() };
  if (index >= 0) services[index] = next;
  else services.push(next);
  await saveServices(services);
  return next;
}

export async function createService(data: Omit<ServiceRecord, "id" | "createdAt" | "updatedAt">) {
  const record: ServiceRecord = {
    ...data,
    id: newId("service"),
    createdAt: now(),
    updatedAt: now()
  };
  await upsertService(record);
  return record;
}

export async function updateService(id: string, data: Partial<ServiceRecord>) {
  const current = await getServiceById(id);
  if (!current) return null;
  const record = { ...current, ...data, id, updatedAt: now() };
  await upsertService(record);
  return record;
}

export async function deleteServiceById(id: string) {
  const services = await getServices();
  const next = services.filter((s) => s.id !== id);
  await saveServices(next);
}

export async function getPublishedServices() {
  const services = await getServices();
  return sortByOrder(services.filter((s) => s.published));
}

export async function countServices() {
  return (await getServices()).length;
}

// ---------- Testimonials ----------
export async function getTestimonials() {
  return readJsonFile<TestimonialRecord[]>(FILES.testimonials, []);
}

export async function saveTestimonials(items: TestimonialRecord[]) {
  await writeJsonFile(FILES.testimonials, items);
}

export async function getTestimonialById(id: string) {
  return (await getTestimonials()).find((t) => t.id === id) ?? null;
}

export async function upsertTestimonial(record: TestimonialRecord) {
  const items = await getTestimonials();
  const index = items.findIndex((t) => t.id === record.id);
  const next = { ...record, updatedAt: now() };
  if (index >= 0) items[index] = next;
  else items.push(next);
  await saveTestimonials(items);
  return next;
}

export async function createTestimonial(data: Omit<TestimonialRecord, "id" | "createdAt" | "updatedAt">) {
  const record: TestimonialRecord = { ...data, id: newId("testimonial"), createdAt: now(), updatedAt: now() };
  return upsertTestimonial(record);
}

export async function deleteTestimonialById(id: string) {
  await saveTestimonials((await getTestimonials()).filter((t) => t.id !== id));
}

export async function getPublishedTestimonials() {
  return sortByOrder((await getTestimonials()).filter((t) => t.published)).map((t) => ({
    ...t,
    role: t.role ?? null,
    company: t.company ?? null,
    avatarUrl: t.avatarUrl ?? null
  }));
}

export async function countTestimonials() {
  return (await getTestimonials()).length;
}

// ---------- FAQs ----------
export async function getFaqs() {
  return readJsonFile<FaqRecord[]>(FILES.faqs, []);
}

export async function saveFaqs(items: FaqRecord[]) {
  await writeJsonFile(FILES.faqs, items);
}

export async function getFaqById(id: string) {
  return (await getFaqs()).find((f) => f.id === id) ?? null;
}

export async function upsertFaq(record: FaqRecord) {
  const items = await getFaqs();
  const index = items.findIndex((f) => f.id === record.id);
  const next = { ...record, updatedAt: now() };
  if (index >= 0) items[index] = next;
  else items.push(next);
  await saveFaqs(items);
  return next;
}

export async function createFaq(data: Omit<FaqRecord, "id" | "createdAt" | "updatedAt">) {
  const record: FaqRecord = { ...data, id: newId("faq"), createdAt: now(), updatedAt: now() };
  return upsertFaq(record);
}

export async function deleteFaqById(id: string) {
  await saveFaqs((await getFaqs()).filter((f) => f.id !== id));
}

export async function getPublishedFaqs() {
  return sortByOrder((await getFaqs()).filter((f) => f.published));
}

export async function countFaqs() {
  return (await getFaqs()).length;
}

// ---------- Blog ----------
export async function getBlogPosts() {
  return readJsonFile<BlogPostRecord[]>(FILES.blogPosts, []);
}

export async function saveBlogPosts(items: BlogPostRecord[]) {
  await writeJsonFile(FILES.blogPosts, items);
}

export async function getBlogPostById(id: string) {
  return (await getBlogPosts()).find((p) => p.id === id) ?? null;
}

export async function getBlogPostBySlug(slug: string) {
  return (await getBlogPosts()).find((p) => p.slug === slug) ?? null;
}

export async function upsertBlogPost(record: BlogPostRecord) {
  const items = await getBlogPosts();
  const index = items.findIndex((p) => p.id === record.id);
  const next = { ...record, updatedAt: now() };
  if (index >= 0) items[index] = next;
  else items.push(next);
  await saveBlogPosts(items);
  return next;
}

export async function createBlogPost(data: Omit<BlogPostRecord, "id" | "createdAt" | "updatedAt">) {
  const record: BlogPostRecord = { ...data, id: newId("blog"), createdAt: now(), updatedAt: now() };
  return upsertBlogPost(record);
}

export async function deleteBlogPostById(id: string) {
  await saveBlogPosts((await getBlogPosts()).filter((p) => p.id !== id));
}

export async function getPublishedBlogPosts() {
  return sortByCreatedDesc((await getBlogPosts()).filter((p) => p.published));
}

export async function countBlogPosts() {
  return (await getBlogPosts()).length;
}

// ---------- Leads ----------
export async function getLeads() {
  return readJsonFile<LeadRecord[]>(FILES.leads, []);
}

export async function saveLeads(items: LeadRecord[]) {
  await writeJsonFile(FILES.leads, items);
}

export async function getLeadById(id: string) {
  return (await getLeads()).find((l) => l.id === id) ?? null;
}

export async function createLead(data: Omit<LeadRecord, "id" | "createdAt">) {
  const record: LeadRecord = { ...data, id: newId("lead"), createdAt: now() };
  const items = await getLeads();
  items.unshift(record);
  await saveLeads(items);
  return record;
}

export async function updateLead(id: string, data: Partial<LeadRecord>) {
  const items = await getLeads();
  const index = items.findIndex((l) => l.id === id);
  if (index < 0) return null;
  items[index] = { ...items[index], ...data, id };
  await saveLeads(items);
  return items[index];
}

export async function deleteLeadById(id: string) {
  await saveLeads((await getLeads()).filter((l) => l.id !== id));
}

export async function countLeads() {
  return (await getLeads()).length;
}

export async function countUnreadLeads() {
  return (await getLeads()).filter((l) => !l.read).length;
}
