import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Toolbar } from "@/components/admin/Toolbar";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { deleteService, toggleServicePublish } from "@/app/admin/actions";
import { Edit, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminServices() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <Toolbar
        title="Services"
        description="Manage the three services shown on the website."
        actionHref="/admin/services/new"
        actionLabel="Add Service"
      />
      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-800">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/[0.03] text-left text-white/60">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 font-medium">{s.title}</td>
                <td className="px-4 py-3 text-white/60">{s.slug}</td>
                <td className="px-4 py-3 text-white/60">{s.order}</td>
                <td className="px-4 py-3">
                  <form action={toggleServicePublish}>
                    <input type="hidden" name="id" value={s.id} />
                    <SubmitButton
                      className={`rounded-full px-2 py-1 text-xs ${
                        s.published ? "bg-brand/20 text-brand" : "bg-white/10 text-white/60"
                      }`}
                    >
                      {s.published ? "Published" : "Draft"}
                    </SubmitButton>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center gap-2">
                    <Link href={`/admin/services/${s.id}`} className="text-white/70 hover:text-white">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <form action={deleteService}>
                      <input type="hidden" name="id" value={s.id} />
                      <SubmitButton className="text-white/70 hover:text-red-400" ariaLabel="Delete service">
                        <Trash2 className="h-4 w-4" />
                      </SubmitButton>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr><td className="px-4 py-6 text-white/60" colSpan={5}>No services yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
