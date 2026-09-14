import { notFound } from "next/navigation";
import { getFaqById } from "@/lib/data";
import { Toolbar } from "@/components/admin/Toolbar";
import { FaqForm } from "@/components/admin/FaqForm";

export const dynamic = "force-dynamic";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getFaqById(id);
  if (!item) return notFound();
  return (
    <div>
      <Toolbar title="Edit FAQ" />
      <FaqForm item={item} />
    </div>
  );
}
