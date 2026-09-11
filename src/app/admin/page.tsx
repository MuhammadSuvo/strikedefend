import Link from "next/link";
import {
  countBlogPosts,
  countFaqs,
  countLeads,
  countServices,
  countTestimonials,
  countUnreadLeads
} from "@/lib/data";
import { Wrench, MessageSquareQuote, HelpCircle, FileText, Inbox } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [services, testimonials, faqs, posts, leads, unreadLeads] = await Promise.all([
    countServices(),
    countTestimonials(),
    countFaqs(),
    countBlogPosts(),
    countLeads(),
    countUnreadLeads()
  ]);

  const stats = [
    { label: "Services", value: services, href: "/admin/services", icon: Wrench },
    { label: "Testimonials", value: testimonials, href: "/admin/testimonials", icon: MessageSquareQuote },
    { label: "FAQs", value: faqs, href: "/admin/faq", icon: HelpCircle },
    { label: "Blog Posts", value: posts, href: "/admin/blog", icon: FileText },
    { label: `Leads (${unreadLeads} unread)`, value: leads, href: "/admin/leads", icon: Inbox }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-white/60">
        Manage every section of the public website from here.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-xl border border-white/10 bg-ink-800 p-6 transition-colors hover:border-brand/30"
          >
            <s.icon className="h-5 w-5 text-brand" />
            <div className="mt-4 text-3xl font-bold">{s.value}</div>
            <div className="text-sm text-white/60">{s.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
