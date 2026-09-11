"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { ServicesDropdown, ServicesMobileLinks } from "./ServicesDropdown";
import type { ServiceNavLink } from "@/lib/service-content";

type Settings = { siteName: string; logoUrl: string | null; blogPublished?: boolean };

export function Header({
  settings,
  serviceLinks
}: {
  settings: Settings;
  serviceLinks: ServiceNavLink[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/about", label: "About Us" },
    { href: "/pricing", label: "Pricing" },
    ...(settings.blogPublished ? [{ href: "/blog", label: "Blog" }] : []),
    { href: "/contact", label: "Contact" }
  ];

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-900/90 backdrop-blur">
      <div className="section flex h-[4.5rem] items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight sm:gap-2.5">
          {settings.logoUrl ? (
            <Image src={settings.logoUrl} alt={settings.siteName} width={36} height={36} className="h-8 w-8 rounded sm:h-9 sm:w-9" />
          ) : (
            <Shield className="h-7 w-7 text-brand sm:h-8 sm:w-8" />
          )}
          <span className="text-xl sm:text-2xl">{settings.siteName}</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:gap-10 md:flex">
          <Link href="/" className={`nav-link ${pathname === "/" ? "nav-link-active" : ""}`}>
            Home
          </Link>
          <ServicesDropdown links={serviceLinks} />
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link ${pathname === l.href ? "nav-link-active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary px-6 py-3 text-base">
            Get a Quote
          </Link>
        </nav>

        <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)} className="md:hidden">
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ink-900 md:hidden">
          <div className="section flex flex-col gap-5 py-5">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`nav-link ${pathname === "/" ? "nav-link-active" : ""}`}
            >
              Home
            </Link>
            <ServicesMobileLinks links={serviceLinks} onNavigate={() => setOpen(false)} />
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`nav-link ${pathname === l.href ? "nav-link-active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary w-fit px-6 py-3 text-base">
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
