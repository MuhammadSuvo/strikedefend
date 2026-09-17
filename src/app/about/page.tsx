import type { Metadata } from "next";
import { getAboutContent } from "@/lib/about";
import { AboutPageView } from "@/components/AboutPageView";
import { buildPageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutContent();
  return buildPageMetadata({
    title: "About",
    description:
      about.subtitle ||
      "Learn about StrikeDefend — an offensive security team delivering penetration testing and continuous monitoring.",
    path: "/about"
  });
}

export default async function AboutPage() {
  const about = await getAboutContent();
  return <AboutPageView about={about} />;
}
