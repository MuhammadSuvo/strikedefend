import { notFound } from "next/navigation";
import { Toolbar } from "@/components/admin/Toolbar";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { getServiceForAdmin } from "@/lib/service-content";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await getServiceForAdmin(params.id);
  if (!service) return notFound();
  return (
    <div>
      <Toolbar
        title="Edit Service"
        description="Update hero image, longform sections, and all page copy. Changes go live after Save."
      />
      <ServiceForm service={service} />
    </div>
  );
}
