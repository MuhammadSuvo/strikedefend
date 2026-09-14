import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";
import { getServicePageBySlug } from "@/lib/service-content";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServicePageBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.metaDescription
  };
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServicePageBySlug(slug);
  if (!service) notFound();
  return <ServiceDetailPage service={service} />;
}
