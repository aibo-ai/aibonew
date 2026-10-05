import Hero from "@/components/sections/Hero";
import TrustedByTicker from "@/components/sections/TrustedByTicker";
import Positioning from "@/components/sections/Positioning";
import MarketingServices from "@/components/sections/MarketingServices";
import TechnologyServices from "@/components/sections/TechnologyServices";
import WhyMyAibo from "@/components/sections/WhyMyAibo";
import Results from "@/components/sections/Results";
import LatestInsights from "@/components/sections/LatestInsights";
import TickerCta from "@/components/sections/TickerCta";
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
      <main>
        <Hero />
        <TrustedByTicker />
        <Positioning />
        <MarketingServices />
        <TechnologyServices />
        <WhyMyAibo />
        <Results />
        <LatestInsights />
        <TickerCta page="/" />
      </main>
    </>
  );
}
