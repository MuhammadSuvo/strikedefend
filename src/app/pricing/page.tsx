import type { Metadata } from "next";
import { getPricingContent } from "@/lib/pricing";
import { PricingPageView } from "@/components/PricingPageView";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pricing = await getPricingContent();
  return {
    title: "Pricing",
    description: pricing.subtitle
  };
}

export default async function PricingPage() {
  const pricing = await getPricingContent();
  return <PricingPageView pricing={pricing} />;
}
