import Hero from "@/components/sections/Hero";
import Positioning from "@/components/sections/Positioning";
import MarketingServices from "@/components/sections/MarketingServices";
import TechnologyServices from "@/components/sections/TechnologyServices";
import WhyMyAibo from "@/components/sections/WhyMyAibo";
import Results from "@/components/sections/Results";
import CaseStudies from "@/components/sections/CaseStudies";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
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
  );
}
