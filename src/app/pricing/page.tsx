import type { Metadata } from "next";
import { getPricingContent } from "@/lib/pricing";
import { PricingPageView } from "@/components/PricingPageView";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const pricing = await getPricingContent();
  return buildPageMetadata({
    title: "Pricing",
    description:
      pricing.subtitle ||
      "StrikeDefend penetration testing packages and engagement pricing for web, mobile, API, and cloud.",
    path: "/pricing"
  });
}

export default async function PricingPage() {
  const pricing = await getPricingContent();
  return <PricingPageView pricing={pricing} />;
}
