"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Home,
  Wrench,
  MessageSquareQuote,
  HelpCircle,
  FileText,
  Inbox,
  Settings,
  LogOut,
  Shield
} from "lucide-react";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/home", label: "Home Content", icon: Home },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-ink-900">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-ink-900 lg:flex">
      <aside className="w-full border-b border-white/10 bg-ink-800 lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-2 px-6 py-5">
          <Shield className="h-5 w-5 text-brand" />
          <span className="font-semibold">StrikeDefend Admin</span>
        </div>
        <nav className="flex flex-wrap gap-1 px-3 pb-4 lg:flex-col lg:gap-0.5">
          {items.map((it) => {
            const active = it.exact ? pathname === it.href : pathname?.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "bg-brand/10 text-brand" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <it.icon className="h-4 w-4" /> {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3 text-xs text-white/60 lg:mt-auto">
          <div className="px-3 pb-2 truncate">{session?.user?.email}</div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-white/70 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <div className="flex-1 p-6 lg:p-10">{children}</div>
    </div>
  );
}
