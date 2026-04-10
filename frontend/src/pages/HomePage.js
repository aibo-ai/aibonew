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
        title="Marketing & AI Technology Agency | MyAibo"
        description="MyAibo builds AI-powered marketing systems and technical products — GEO, AEO, SEO, content, automation, and full-stack development."
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
