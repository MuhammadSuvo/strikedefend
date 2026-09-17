import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "@/lib/settings";
import { getPublishedServiceLinks } from "@/lib/service-content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import { absoluteUrl, getSiteUrl, organizationJsonLd, websiteJsonLd } from "@/lib/seo";

function hexToChannels(hex: string, fallback: string): string {
  const m = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex.trim());
  if (!m) return fallback;
  const h = m[1].length === 3 ? m[1].split("").map((c) => c + c).join("") : m[1];
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  const siteUrl = getSiteUrl();
  const titleDefault = `${s.siteName} — ${s.tagline}`;
  const description =
    "StrikeDefend provides web, mobile, API, and cloud penetration testing plus continuous security monitoring. Find vulnerabilities before attackers do.";
  const ogImage = s.logoUrl
    ? s.logoUrl.startsWith("http")
      ? s.logoUrl
      : absoluteUrl(s.logoUrl)
    : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: titleDefault, template: `%s — ${s.siteName}` },
    description,
    applicationName: s.siteName,
    keywords: [
      "penetration testing",
      "pen testing company",
      "cybersecurity",
      "web application penetration testing",
      "API security testing",
      "mobile penetration testing",
      "cloud penetration testing",
      "vulnerability assessment",
      "continuous security monitoring",
      s.siteName
    ],
    authors: [{ name: s.siteName, url: siteUrl }],
    creator: s.siteName,
    publisher: s.siteName,
    category: "cybersecurity",
    icons: s.faviconUrl ? [{ url: s.faviconUrl }] : undefined,
    alternates: { canonical: siteUrl },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
    },
    openGraph: {
      title: titleDefault,
      description,
      url: siteUrl,
      siteName: s.siteName,
      type: "website",
      locale: "en_US",
      images: ogImage ? [{ url: ogImage, alt: s.siteName }] : undefined
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: titleDefault,
      description,
      images: ogImage ? [ogImage] : undefined
    },
    verification: {
      // Optional: set these in Cloudflare/env after Search Console / Bing setup
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : undefined
    }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [s, serviceLinks, orgLd, siteLd] = await Promise.all([
    getSiteSettings(),
    getPublishedServiceLinks(),
    organizationJsonLd(),
    websiteJsonLd()
  ]);
  const brand = hexToChannels(s.primaryColor, "6 182 212");
  const brandAccent = hexToChannels(s.accentColor, "14 165 233");
  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--brand:${brand};--brand-accent:${brandAccent};}`
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-ink-900 text-white antialiased">
        <AuthProvider>
          <Header settings={s} serviceLinks={serviceLinks} />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer settings={s} serviceLinks={serviceLinks} />
        </AuthProvider>
      </body>
    </html>
  );
}
