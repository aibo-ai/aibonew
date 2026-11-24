import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PrintPage, Faq, CtaSection } from "@/components/print";
import {
  PillarHero, PillarWhy, PillarAudit, PillarServices, PillarApproach,
  PillarProcess, PillarDeliverables, PillarOutcomes,
} from "@/components/print/pillar/PillarSections";
import { PILLARS } from "@/components/print/pillar/pillarConfig";
import { splitHeadline } from "@/lib/splitHeadline";
import { getClustersForPillar } from "@/data/clusterPagesData";
import { geoData } from "@/data/geoData";
import { aeoData } from "@/data/aeoData";
import { seoData } from "@/data/seoData";
import { contentMarketingData } from "@/data/contentMarketingData";
import { aiAutomationsData } from "@/data/aiAutomationsData";
import { fullStackData } from "@/data/fullStackData";
import SEO from "@/components/SEO";
import NotFoundPage from "@/pages/NotFoundPage";

const seoMetaData = {
  geo: {
    title: "GEO Services in India — Be the Brand AI Recommends | MyAibo",
    description: "GEO services that structure your brand's presence so ChatGPT, Perplexity, and Google SGE cite you by name. MyAibo GEO clients in India see +340% AI citation growth.",
    keywords: ['GEO services', 'GEO services in India', 'GEO services provider', 'generative engine optimization', 'managed GEO services'],
  },
  aeo: {
    title: "AEO Services — Own Position Zero | MyAibo",
    description: "AEO services that win featured snippets, PAA boxes, and voice answers before competitors. MyAibo AEO drives +280% PAA ownership and +47 new snippets per client.",
    keywords: ['AEO services', 'answer engine optimization', 'featured snippet optimization', 'PAA optimization'],
  },
  seo: {
    title: "SEO Services in India — Organic Authority That Lasts | MyAibo",
    description: "SEO services including D2C SEO — technical SEO, keyword architecture, and link equity built to compound. MyAibo SEO clients see +280% organic growth and 11x ROI over paid search.",
    keywords: ['SEO services', 'SEO services India', 'D2C SEO services', 'technical SEO agency'],
  },
  'content-marketing': {
    title: "Content Marketing Services | MyAibo",
    description: "Long-form guides, case studies, FAQs, and nurture sequences built for Google, AI engines, and humans equally. +220% organic traffic on average.",
    keywords: ['content marketing services', 'content marketing agency India'],
  },
  'ai-automations': {
    title: "AI Automation Services — Custom AI Agents | MyAibo",
    description: "Production-grade AI agents for lead capture, support, outreach, and ops workflows. Cut manual effort by 70% without adding headcount.",
    keywords: ['AI automation services', 'AI agents', 'custom AI ML solutions', 'AI ML solutions'],
  },
  'full-stack': {
    title: "Full Stack Development — Built to Last | MyAibo",
    description: "Web apps, AI-integrated products, e-commerce platforms, and APIs built front to back. Modern stacks, zero technical debt, 100% IP ownership.",
    keywords: ['full stack development', 'custom machine learning solutions', 'AI ML solutions'],
  },
};

const dataMap = {
  geo: geoData, aeo: aeoData, seo: seoData,
  'content-marketing': contentMarketingData, 'ai-automations': aiAutomationsData, 'full-stack': fullStackData,
};

export default function ServicePage() {
  const { slug } = useParams();
  const data = dataMap[slug];
  const cfg = PILLARS[slug];
  const seoMeta = seoMetaData[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!data || !cfg) return <NotFoundPage />;

  const short = cfg.short;
  const page = `/solutions/${slug}`;
  const clusters = getClustersForPillar(slug);

  const structuredData = {
    '@context': 'https://schema.org', '@type': 'Service', name: short, serviceType: data.pageTitle,
    provider: { '@type': 'Organization', name: 'MyAibo', url: 'https://www.myaibo.in' },
    areaServed: 'India', description: seoMeta?.description,
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.myaibo.in/' },
      { '@type': 'ListItem', position: 2, name: short, item: `https://www.myaibo.in/solutions/${slug}` },
    ],
  };
  const faqLd = data.pillarFaq && data.pillarFaq.length > 0 ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: data.pillarFaq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null;

  return (
    <>
      {seoMeta && <SEO title={seoMeta.title} description={seoMeta.description} path={page} keywords={seoMeta.keywords} />}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
      </Helmet>

      <PrintPage className={`pg-pillar pl-${slug}`}>
        <PillarHero cfg={cfg} data={data} clusters={clusters} slug={slug} page={page} />
        <PillarWhy cfg={cfg} data={data} />
        <PillarAudit audit={cfg.audit} />
        <PillarServices cfg={cfg} data={data} slug={slug} />
        <PillarApproach data={data} headline={splitHeadline(data.intro.headline)} />
        <PillarProcess data={data} />
        <PillarDeliverables data={data} />
        <PillarOutcomes data={data} />
        <Faq key={slug} items={data.pillarFaq} page={page} />
        <CtaSection page={page} />
      </PrintPage>
    </>
  );
}
