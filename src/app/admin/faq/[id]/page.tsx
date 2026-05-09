import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Toolbar } from "@/components/admin/Toolbar";
import { FaqForm } from "@/components/admin/FaqForm";

export const dynamic = "force-dynamic";

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const item = await prisma.fAQ.findUnique({ where: { id: params.id } });
  if (!item) return notFound();
  return (
    <div>
      <Toolbar title="Edit FAQ" />
      <FaqForm item={item} />
    </div>
  );
}
