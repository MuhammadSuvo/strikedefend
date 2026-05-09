import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Toolbar } from "@/components/admin/Toolbar";
import { ServiceForm } from "@/components/admin/ServiceForm";

export const dynamic = "force-dynamic";

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const service = await prisma.service.findUnique({ where: { id: params.id } });
  if (!service) return notFound();
  return (
    <div>
      <Toolbar title="Edit Service" description={service.title} />
      <ServiceForm service={service} />
    </div>
  );
}
