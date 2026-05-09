"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Linkedin, Twitter } from "lucide-react";

type Settings = {
  siteName: string;
  email: string;
  phone: string;
  address: string;
  footerText: string;
  twitterUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
};

export function Footer({ settings }: { settings: Settings }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-900">
      <div className="section grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="text-lg font-semibold">{settings.siteName}</div>
          <p className="mt-2 text-sm text-white/60">
            Senior security and engineering team helping teams ship safely.
          </p>
          <div className="mt-4 flex gap-3 text-white/60">
            {settings.twitterUrl && (
              <a href={settings.twitterUrl} aria-label="Twitter" className="hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {settings.linkedinUrl && (
              <a href={settings.linkedinUrl} aria-label="LinkedIn" className="hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {settings.githubUrl && (
              <a href={settings.githubUrl} aria-label="GitHub" className="hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Services</div>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link href="/services#penetration-testing" className="hover:text-white">Penetration Testing</Link></li>
            <li><Link href="/services#load-testing" className="hover:text-white">Load Testing</Link></li>
            <li><Link href="/services#web-automation" className="hover:text-white">Web Automation</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Company</div>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Contact</div>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><a href={`mailto:${settings.email}`} className="hover:text-white">{settings.email}</a></li>
            <li><a href={`tel:${settings.phone}`} className="hover:text-white">{settings.phone}</a></li>
            <li>{settings.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="section flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 md:flex-row">
          <span>{settings.footerText}</span>
          <Link href="/admin/login" className="hover:text-white">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
