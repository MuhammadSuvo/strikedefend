export type UserRecord = {
  id: string;
  email: string;
  name?: string | null;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type SiteSettingsRecord = {
  id: string;
  siteName: string;
  tagline: string;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  primaryColor: string;
  accentColor: string;
  email: string;
  phone: string;
  address: string;
  footerText: string;
  twitterUrl?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  blogPublished: boolean;
  updatedAt: string;
};

export type HomeContentRecord = {
  id: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroImageUrl?: string | null;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  whyTitle: string;
  whySubtitle: string;
  whyItems: unknown;
  processTitle: string;
  processSteps: unknown;
  ctaHeadline: string;
  ctaSubtitle: string;
  videoEnabled: boolean;
  videoTitle: string;
  videoSubtitle: string;
  videoUrl?: string | null;
  securityEnabled: boolean;
  securityTag: string;
  securityTitle: string;
  securitySubtitle: string;
  securityCapabilities: unknown;
  securityHotspots: unknown;
  securityStats: unknown;
  securityTerminal: unknown;
  securityCtaText: string;
  securityCtaLink: string;
  workflowEnabled: boolean;
  workflowTitle: string;
  workflowSubtitle: string;
  workflowManager: string;
  workflowSpecialists: unknown;
  workflowPipeline: unknown;
  updatedAt: string;
};

export type ServiceRecord = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  shortText: string;
  metaDescription: string;
  description: string;
  icon?: string | null;
  imageUrl?: string | null;
  visual: string;
  features: unknown;
  order: number;
  published: boolean;
  heroBadge: string;
  heroSubtitle: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  whyTitle: string;
  whyItems: unknown;
  overviewTitle: string;
  overviewText: string;
  overviewList: unknown;
  assessTitle: string;
  assessItems: unknown;
  standards: unknown;
  processTitle: string;
  processSteps: unknown;
  tools: unknown;
  industries: unknown;
  deliverables: unknown;
  faqs: unknown;
  ctaHeadline: string;
  ctaSubtitle: string;
  ctaText: string;
  extras: unknown;
  createdAt: string;
  updatedAt: string;
};

export type TestimonialRecord = {
  id: string;
  name: string;
  role?: string | null;
  company?: string | null;
  quote: string;
  avatarUrl?: string | null;
  rating: number;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FaqRecord = {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostRecord = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  author: string;
  tags: string;
  published: boolean;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type LeadRecord = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};
