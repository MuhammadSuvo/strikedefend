import type { Metadata } from "next";
import "./globals.css";
import { getSiteSettings } from "@/lib/settings";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

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
  return {
    title: { default: `${s.siteName} — ${s.tagline}`, template: `%s — ${s.siteName}` },
    description: s.tagline,
    icons: s.faviconUrl ? [{ url: s.faviconUrl }] : undefined,
    openGraph: { title: s.siteName, description: s.tagline, type: "website" }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const s = await getSiteSettings();
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
      </head>
      <body className="min-h-screen bg-ink-900 text-white antialiased">
        <AuthProvider>
          <Header settings={s} />
          <main>{children}</main>
          <Footer settings={s} />
        </AuthProvider>
      </body>
    </html>
  );
}
