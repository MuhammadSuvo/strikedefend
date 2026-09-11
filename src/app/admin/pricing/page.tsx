import { getPricingContent } from "@/lib/pricing";
import { Toolbar } from "@/components/admin/Toolbar";
import { PricingForm } from "@/components/admin/PricingForm";

export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  const pricing = await getPricingContent();

  return (
    <div className="max-w-3xl">
      <Toolbar
        title="Pricing"
        description="Edit the public /pricing page: plans, comparison table, and CTA."
      />
      <PricingForm initial={pricing} />
    </div>
  );
}
