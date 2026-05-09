import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Toolbar } from "@/components/admin/Toolbar";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { deleteTestimonial, toggleTestimonialPublish } from "@/app/admin/actions";
import { Edit, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminTestimonials() {
  const items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <Toolbar title="Testimonials" actionHref="/admin/testimonials/new" actionLabel="Add Testimonial" />
      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-800">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-left text-white/60">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Quote</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 font-medium">{t.name}</td>
                <td className="px-4 py-3 text-white/60">{t.company}</td>
                <td className="px-4 py-3 text-white/60 line-clamp-1 max-w-md">{t.quote}</td>
                <td className="px-4 py-3">
                  <form action={toggleTestimonialPublish}>
                    <input type="hidden" name="id" value={t.id} />
                    <SubmitButton className={`rounded-full px-2 py-1 text-xs ${t.published ? "bg-brand/20 text-brand" : "bg-white/10 text-white/60"}`}>
                      {t.published ? "Published" : "Draft"}
                    </SubmitButton>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link href={`/admin/testimonials/${t.id}`} className="text-white/70 hover:text-white"><Edit className="h-4 w-4" /></Link>
                    <form action={deleteTestimonial}>
                      <input type="hidden" name="id" value={t.id} />
                      <SubmitButton className="text-white/70 hover:text-red-400" ariaLabel="Delete testimonial"><Trash2 className="h-4 w-4" /></SubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td className="px-4 py-6 text-white/60" colSpan={5}>No testimonials yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
