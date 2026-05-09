import { prisma } from "@/lib/prisma";
import { getHomeContent } from "@/lib/settings";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Process } from "@/components/Process";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactCta } from "@/components/ContactCta";
import { VideoSection } from "@/components/VideoSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const home = await getHomeContent();
  const [services, testimonials, faqs] = await Promise.all([
    prisma.service.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.fAQ.findMany({ where: { published: true }, orderBy: { order: "asc" } })
  ]);

  return (
    <>
      <Hero
        headline={home.heroHeadline}
        subtitle={home.heroSubtitle}
        imageUrl={home.heroImageUrl}
        primaryCtaText={home.primaryCtaText}
        primaryCtaLink={home.primaryCtaLink}
        secondaryCtaText={home.secondaryCtaText}
        secondaryCtaLink={home.secondaryCtaLink}
      />
      <ServicesSection services={services} />
      <VideoSection
        enabled={home.videoEnabled}
        title={home.videoTitle}
        subtitle={home.videoSubtitle}
        url={home.videoUrl}
      />
      <WhyChooseUs
        title={home.whyTitle}
        subtitle={home.whySubtitle}
        items={(home.whyItems as { title: string; text: string }[]) || []}
      />
      <Process
        title={home.processTitle}
        steps={(home.processSteps as { step: string; title: string; text: string }[]) || []}
      />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={faqs} />
      <ContactCta headline={home.ctaHeadline} subtitle={home.ctaSubtitle} />
    </>
  );
}
