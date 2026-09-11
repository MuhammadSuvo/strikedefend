import type { Metadata } from "next";
import { getAboutContent } from "@/lib/about";
import { AboutPageView } from "@/components/AboutPageView";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutContent();
  return {
    title: "About",
    description: about.subtitle
  };
}

export default async function AboutPage() {
  const about = await getAboutContent();
  return <AboutPageView about={about} />;
}
