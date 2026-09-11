import { getPublishedTestimonials, getPublishedFaqs } from "@/lib/data";
import { getHomeContent } from "@/lib/settings";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { SecurityCapabilities } from "@/components/SecurityCapabilities";
import { AgentWorkflow } from "@/components/AgentWorkflow";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Process } from "@/components/Process";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactCta } from "@/components/ContactCta";
import { VideoSection } from "@/components/VideoSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const home = await getHomeContent();
  const [testimonials, faqs] = await Promise.all([getPublishedTestimonials(), getPublishedFaqs()]);

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
      <ServicesSection />
      <SecurityCapabilities
        enabled={home.securityEnabled}
        tag={home.securityTag}
        title={home.securityTitle}
        subtitle={home.securitySubtitle}
        capabilities={home.securityCapabilities}
        hotspots={home.securityHotspots}
        stats={home.securityStats}
        terminal={home.securityTerminal}
        ctaText={home.securityCtaText}
        ctaLink={home.securityCtaLink}
      />
      {home.workflowEnabled && (
        <AgentWorkflow
          title={home.workflowTitle}
          subtitle={home.workflowSubtitle}
          manager={home.workflowManager}
          specialists={home.workflowSpecialists}
          pipeline={home.workflowPipeline}
        />
      )}
      <VideoSection
        enabled={home.videoEnabled}
        title={home.videoTitle}
        subtitle={home.videoSubtitle}
        url={home.videoUrl}
      />
      <WhyChooseUs
        title={home.whyTitle}
        subtitle={home.whySubtitle}
        items={home.whyItems}
      />
      <Process
        title={home.processTitle}
        steps={home.processSteps}
      />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={faqs} />
      <ContactCta headline={home.ctaHeadline} subtitle={home.ctaSubtitle} />
    </>
  );
}
