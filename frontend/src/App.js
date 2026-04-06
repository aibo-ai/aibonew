import "@/App.css";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import Positioning from "@/components/sections/Positioning";
import MarketingServices from "@/components/sections/MarketingServices";
import TechnologyServices from "@/components/sections/TechnologyServices";
import WhyMyAibo from "@/components/sections/WhyMyAibo";
import Results from "@/components/sections/Results";
import CaseStudies from "@/components/sections/CaseStudies";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

function App() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Navigation />
      <main>
        <Hero />
        <Positioning />
        <MarketingServices />
        <TechnologyServices />
        <WhyMyAibo />
        <Results />
        <CaseStudies />
        <Process />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
