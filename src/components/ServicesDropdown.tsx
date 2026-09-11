"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import type { ServiceNavLink } from "@/lib/service-content";

export function ServicesDropdown({ links }: { links: ServiceNavLink[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = pathname === "/services" || pathname.startsWith("/services/");

  function openMenu() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  }

  function closeMenu() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <span
        className={`nav-link inline-flex cursor-default items-center gap-1.5 ${
          isActive || open ? "nav-link-active" : ""
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Services
        <ChevronDown className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </span>
      {open && (
        <div className="absolute left-0 top-full z-50 pt-3">
          <div className="w-80 rounded-xl border border-white/10 bg-ink-800 py-2 shadow-glow">
            <Link
              href="/services"
              className="block px-4 py-3 text-base font-semibold text-white hover:bg-brand/10 hover:text-brand"
            >
              All Services
            </Link>
            {links.length > 0 && <div className="my-1 border-t border-white/10" />}
            {links.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className={`block px-4 py-3 text-base font-medium hover:bg-brand/10 hover:text-brand ${
                  pathname === `/services/${s.slug}` ? "text-brand" : "text-white/80"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ServicesMobileLinks({
  links,
  onNavigate
}: {
  links: ServiceNavLink[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(pathname.startsWith("/services"));

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={`nav-link flex w-full items-center justify-between ${
          pathname.startsWith("/services") ? "nav-link-active" : ""
        }`}
      >
        Services
        <ChevronDown className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="ml-3 mt-3 space-y-3 border-l border-white/10 pl-4">
          <Link href="/services" onClick={onNavigate} className="nav-link block">
            All Services
          </Link>
          {links.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              onClick={onNavigate}
              className={`nav-link block ${pathname === `/services/${s.slug}` ? "nav-link-active" : ""}`}
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
