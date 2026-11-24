import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getCluster, pillarMeta } from '@/data/clusterPagesData';
import { geoData } from '@/data/geoData';
import { aeoData } from '@/data/aeoData';
import { seoData } from '@/data/seoData';
import { contentMarketingData } from '@/data/contentMarketingData';
import { aiAutomationsData } from '@/data/aiAutomationsData';
import { fullStackData } from '@/data/fullStackData';
import SEO from '@/components/SEO';
import { PrintPage, Faq, CtaSection } from '@/components/print';
import { getClusterConfig } from '@/components/print/cluster/clusterConfig';
import {
  ClusterHero, ClusterProblem, ClusterWork, ClusterFramework, ClusterExtra, ClusterRelated,
} from '@/components/print/cluster/ClusterSections';
import NotFoundPage from '@/pages/NotFoundPage';

const pillarDataMap = {
  geo: geoData, aeo: aeoData, seo: seoData,
  'content-marketing': contentMarketingData, 'ai-automations': aiAutomationsData, 'full-stack': fullStackData,
};
const pillarShortMap = {
  geo: 'GEO', aeo: 'AEO', seo: 'SEO', 'content-marketing': 'Content Marketing',
  'ai-automations': 'AI Automation', 'full-stack': 'Full Stack',
};

function firstSentence(t, max) {
  t = t || '';
  const m = t.match(/^(.+?[.!?])(\s|$)/);
  let s = m ? m[1] : t;
  if (s.length > max) s = s.slice(0, max).replace(/\s\S*$/, '') + '…';
  return s;
}

export default function ClusterPage() {
  const { pillar, cluster } = useParams();
  const data = getCluster(pillar, cluster);
  const pillarInfo = pillarMeta[pillar];

  useEffect(() => { window.scrollTo(0, 0); }, [pillar, cluster]);

  if (!pillarInfo) return <Navigate to="/" replace />;
  if (!data) return <NotFoundPage />;

  const page = `/solutions/${pillar}/${cluster}`;
  const pillarShort = pillarShortMap[pillar] || pillarInfo.short;
  const cfg = getClusterConfig(cluster);

  const related = (data.relatedServices?.links || []).map((l) => {
    const isPillar = !l.cluster;
    const targetSub = isPillar ? pillarDataMap[l.pillar]?.subheadline : getCluster(l.pillar, l.cluster)?.heroBody;
    return {
      key: `${l.pillar}-${l.cluster || 'pillar'}`,
      kind: isPillar ? 'Pillar' : 'Service',
      label: l.label,
      note: firstSentence(targetSub, 130),
      to: l.cluster ? `/solutions/${l.pillar}/${l.cluster}` : `/solutions/${l.pillar}`,
    };
  });

  const structuredData = {
    '@context': 'https://schema.org', '@type': 'Service', name: data.subLabel, serviceType: data.pillarName,
    provider: { '@type': 'Organization', name: 'MyAibo', url: 'https://myaibo.in' },
    description: data.meta.description, areaServed: 'Global',
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://myaibo.in/' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://myaibo.in/solutions' },
      { '@type': 'ListItem', position: 3, name: data.pillarName, item: `https://myaibo.in/solutions/${pillar}` },
      { '@type': 'ListItem', position: 4, name: data.subLabel, item: `https://myaibo.in/solutions/${pillar}/${cluster}` },
    ],
  };
  const faqLd = data.faq && data.faq.length > 0 ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null;

  return (
    <>
      <SEO title={data.meta.title} description={data.meta.description} path={page} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
      </Helmet>

      <PrintPage className="pg-cluster" key={page}>
        <ClusterHero data={data} cfg={cfg} pillar={pillar} pillarShort={pillarShort} page={page} />
        <ClusterProblem data={data} cfg={cfg} />
        <ClusterWork data={data} cfg={cfg} />
        <ClusterFramework data={data} cfg={cfg} />
        <ClusterExtra extra={data.extraSection} cfg={cfg} />
        <ClusterRelated items={related} cfg={cfg} />
        <Faq items={data.faq} intro="The questions buyers ask us most about this service." page={page} />
        <CtaSection page={page} />
      </PrintPage>
    </>
  );
}
