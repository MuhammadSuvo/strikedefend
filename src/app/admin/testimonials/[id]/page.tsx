import { notFound } from "next/navigation";
import { getTestimonialById } from "@/lib/data";
import { Toolbar } from "@/components/admin/Toolbar";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const item = await getTestimonialById(params.id);
  if (!item) return notFound();
  return (
    <div>
      <Toolbar title="Edit Testimonial" description={item.name} />
      <TestimonialForm item={item} />
    </div>
  );
}
