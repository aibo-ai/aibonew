import Hero from "@/components/sections/Hero";
import Positioning from "@/components/sections/Positioning";
import MarketingServices from "@/components/sections/MarketingServices";
import TechnologyServices from "@/components/sections/TechnologyServices";
import WhyMyAibo from "@/components/sections/WhyMyAibo";
import Results from "@/components/sections/Results";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";
import SEO from "@/components/SEO";

export default function HomePage() {
  return (
    <>
      <SEO
        title="AI Marketing & GEO Agency in India | MyAibo"
        description="MyAibo is a Bengaluru-based AI marketing and technology agency — GEO, AEO, SEO, content, automation, and full-stack development for brands in India and beyond."
        path="/"
        keywords={[
          'AI marketing agency India',
          'GEO agency India',
          'AEO services',
          'SEO agency Bengaluru',
          'generative engine optimization',
          'answer engine optimization',
        ]}
      />
      <main style={{ paddingTop: 64 }}>
        <Hero />
        <Positioning />
        <MarketingServices />
        <TechnologyServices />
        <WhyMyAibo />
        <Results />
        <CaseStudies />
        <Testimonials />
        <FinalCTA />
      </main>
    </>
  );
}
