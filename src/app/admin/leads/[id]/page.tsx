import { notFound } from "next/navigation";
import Link from "next/link";
import { getLeadById, getServices } from "@/lib/data";
import { Toolbar, FormCard, SaveBar } from "@/components/admin/Toolbar";
import { updateLeadAction } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function EditLeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [lead, serviceRows] = await Promise.all([getLeadById(id), getServices()]);
  if (!lead) notFound();
  const services = [...serviceRows.map((s) => s.title), "Other"];

  return (
    <div className="max-w-3xl">
      <Toolbar title="Edit Lead" description={`Submitted ${new Date(lead.createdAt).toLocaleString()}`} />
      <Link href="/admin/leads" className="mb-4 inline-block text-sm text-white/60 hover:text-white">← Back to leads</Link>
      <form action={updateLeadAction} className="space-y-6">
        <input type="hidden" name="id" value={lead.id} />
        <FormCard>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Name</label>
              <input className="input" name="name" defaultValue={lead.name} required />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" name="email" defaultValue={lead.email} required />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input" name="phone" defaultValue={lead.phone ?? ""} />
            </div>
            <div>
              <label className="label">Company</label>
              <input className="input" name="company" defaultValue={lead.company ?? ""} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Service</label>
              <select className="input" name="service" defaultValue={lead.service ?? ""}>
                <option value="">—</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="label">Message</label>
            <textarea className="input" rows={6} name="message" defaultValue={lead.message} required />
          </div>
          <div className="mt-4 flex items-center gap-2">
            <input id="leadRead" type="checkbox" name="read" defaultChecked={lead.read} />
            <label htmlFor="leadRead" className="text-sm">Mark as read</label>
          </div>
        </FormCard>
        <SaveBar saveLabel="Save lead" />
      </form>
    </div>
  );
}
