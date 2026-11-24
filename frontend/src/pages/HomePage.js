import HomeHero from "@/components/sections/home/HomeHero";
import HomePractice from "@/components/sections/home/HomePractice";
import HomeMarketing from "@/components/sections/home/HomeMarketing";
import HomeTechnology from "@/components/sections/home/HomeTechnology";
import HomeWhy from "@/components/sections/home/HomeWhy";
import HomeResults from "@/components/sections/home/HomeResults";
import HomeInsights from "@/components/sections/home/HomeInsights";
import HomeCta from "@/components/sections/home/HomeCta";
import "@/components/sections/home/home.css";
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
      <main className="ph">
        <HomeHero />
        <HomePractice />
        <HomeMarketing />
        <HomeTechnology />
        <HomeWhy />
        <HomeResults />
        <HomeInsights />
        <HomeCta />
      </main>
    </>
  );
}
