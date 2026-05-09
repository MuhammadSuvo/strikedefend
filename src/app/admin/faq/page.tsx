import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Toolbar } from "@/components/admin/Toolbar";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { deleteFaq, toggleFaqPublish } from "@/app/admin/actions";
import { Edit, Trash2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminFaq() {
  const items = await prisma.fAQ.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <Toolbar title="FAQs" actionHref="/admin/faq/new" actionLabel="Add FAQ" />
      <div className="space-y-3">
        {items.map((f) => (
          <div key={f.id} className="rounded-xl border border-white/10 bg-ink-800 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">{f.question}</div>
                <p className="mt-1 text-sm text-white/60">{f.answer}</p>
              </div>
              <div className="flex items-center gap-2">
                <form action={toggleFaqPublish}>
                  <input type="hidden" name="id" value={f.id} />
                  <SubmitButton className={`rounded-full px-2 py-1 text-xs ${f.published ? "bg-brand/20 text-brand" : "bg-white/10 text-white/60"}`}>
                    {f.published ? "Published" : "Draft"}
                  </SubmitButton>
                </form>
                <Link href={`/admin/faq/${f.id}`} className="text-white/70 hover:text-white"><Edit className="h-4 w-4" /></Link>
                <form action={deleteFaq}>
                  <input type="hidden" name="id" value={f.id} />
                  <SubmitButton className="text-white/70 hover:text-red-400" ariaLabel="Delete FAQ"><Trash2 className="h-4 w-4" /></SubmitButton>
                </form>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-white/60">No FAQs yet.</p>}
      </div>
    </div>
  );
}
