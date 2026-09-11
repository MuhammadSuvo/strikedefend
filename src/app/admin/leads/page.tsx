import Link from "next/link";
import { getLeads } from "@/lib/data";
import { Toolbar } from "@/components/admin/Toolbar";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { deleteLead, markLeadRead } from "@/app/admin/actions";
import { Trash2, Mail, Phone, CheckCircle2, Circle, Edit } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {
  const leads = await getLeads();
  return (
    <div>
      <Toolbar title="Leads" description="Contact form submissions from the public website." />
      <div className="space-y-3">
        {leads.map((l) => (
          <div key={l.id} className={`rounded-xl border p-5 ${l.read ? "border-white/10 bg-ink-800" : "border-brand/30 bg-brand/5"}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-medium">{l.name}{l.company && <span className="text-white/50"> · {l.company}</span>}</div>
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-white/60">
                  <a className="inline-flex items-center gap-1 hover:text-white" href={`mailto:${l.email}`}><Mail className="h-3.5 w-3.5" /> {l.email}</a>
                  {l.phone && <a className="inline-flex items-center gap-1 hover:text-white" href={`tel:${l.phone}`}><Phone className="h-3.5 w-3.5" /> {l.phone}</a>}
                  {l.service && <span>· {l.service}</span>}
                  <span>· {new Date(l.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <form action={markLeadRead}>
                  <input type="hidden" name="id" value={l.id} />
                  <SubmitButton className="text-white/70 hover:text-white" title={l.read ? "Mark unread" : "Mark read"} ariaLabel={l.read ? "Mark unread" : "Mark read"}>
                    {l.read ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                  </SubmitButton>
                </form>
                <Link href={`/admin/leads/${l.id}`} className="text-white/70 hover:text-white" title="Edit lead">
                  <Edit className="h-4 w-4" />
                </Link>
                <form action={deleteLead}>
                  <input type="hidden" name="id" value={l.id} />
                  <SubmitButton className="text-white/70 hover:text-red-400" ariaLabel="Delete lead"><Trash2 className="h-4 w-4" /></SubmitButton>
                </form>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-white/80">{l.message}</p>
          </div>
        ))}
        {leads.length === 0 && <p className="text-white/60">No leads yet.</p>}
      </div>
    </div>
  );
}
