import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/settings";

/** Canonical public site URL (no trailing slash). */
export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEXTAUTH_URL?.trim() ||
    "https://strikedefend.net";
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

const DEFAULT_KEYWORDS = [
  "penetration testing",
  "pen testing",
  "cybersecurity",
  "web application security",
  "API security testing",
  "mobile app penetration testing",
  "cloud security",
  "vulnerability assessment",
  "StrikeDefend"
];

export async function buildPageMetadata(opts: {
  title?: string;
  description: string;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
  keywords?: string[];
}): Promise<Metadata> {
  const s = await getSiteSettings();
  const url = absoluteUrl(opts.path || "/");
  const title = opts.title;
  const description = opts.description || s.tagline;
  const image = opts.image || s.logoUrl || undefined;
  const images = image
    ? [{ url: image.startsWith("http") ? image : absoluteUrl(image), width: 1200, height: 630, alt: s.siteName }]
    : undefined;

  return {
    ...(title ? { title } : {}),
    description,
    keywords: opts.keywords ?? DEFAULT_KEYWORDS,
    alternates: { canonical: url },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: title ? `${title} — ${s.siteName}` : `${s.siteName} — ${s.tagline}`,
      description,
      url,
      siteName: s.siteName,
      type: "website",
      locale: "en_US",
      images
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: title ? `${title} — ${s.siteName}` : `${s.siteName} — ${s.tagline}`,
      description,
      images: images?.map((i) => i.url)
    }
  };
}

export async function organizationJsonLd() {
  const s = await getSiteSettings();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: s.siteName,
    url: getSiteUrl(),
    email: s.email,
    telephone: s.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: s.address
    },
    sameAs: [s.twitterUrl, s.linkedinUrl, s.githubUrl].filter(Boolean),
    description: s.tagline
  };
}

export async function websiteJsonLd() {
  const s = await getSiteSettings();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: s.siteName,
    url: getSiteUrl(),
    description: s.tagline
  };
}
