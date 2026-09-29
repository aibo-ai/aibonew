// Cluster page content for all 18 sub-service pages under 6 pillars.
// Structure per page:
//   { pillar, slug, pillarName, subLabel, eyebrow, h1, heroBody, primaryCta,
//     aeoBox, deepDive:{ question, framing, pillars:[{title,technical,human}] },
//     blueprint:{ title, phases:[{num,name,timeframe,body}] },
//     geography:{ headline, body, finalCta },
//     targetKeywords, meta:{title,description} }

export const pillarMeta = {
  geo:                 { name: 'Generative Engine Optimization', short: 'GEO' },
  aeo:                 { name: 'Answer Engine Optimization',     short: 'AEO' },
  seo:                 { name: 'Search Engine Optimization',     short: 'SEO' },
  'content-marketing': { name: 'Content Marketing',              short: 'Content Marketing' },
  'ai-automations':    { name: 'AI Automation',                  short: 'AI Automation' },
  'full-stack':        { name: 'Full Stack Development',         short: 'Full Stack Development' },
};

export const clusterPages = [
  // ─────────────────────────── GEO (5) ───────────────────────────
  {
    pillar: 'geo',
    slug: 'llmo-company',
    pillarName: 'Generative Engine Optimization',
    subLabel: 'LLM Optimization Company',
    eyebrow: 'Generative Engine Optimization · LLM Optimization Services',
    h1: 'LLM Optimization Services That Make Your Brand the Answer, Not a Footnote',
    heroBody:
      'MyAibo repositions enterprise brands as authoritative, consistently-cited entities inside LLM training pipelines and RAG stacks — through entity disambiguation, multi-source co-citation architecture, and semantic gap analysis against benchmark LLM outputs.',
    primaryCta: 'Book an LLMO Discovery Call',
    statBadge: '500-prompt library run monthly on ChatGPT, Perplexity, and Gemini',
    aeoBox:
      "MyAibo's LLMO practice covers entity disambiguation across Wikipedia, Wikidata, and structured data sources; co-citation architecture across the publications LLMs weight highest; and continuous output auditing against a 500-prompt library run monthly on ChatGPT, Perplexity, and Gemini — turning LLM mention rate into a board-reportable KPI.",
    deepDive: {
      question: "Why Is Your Brand Getting Cited by Competitors' LLM Responses Instead of Your Own?",
      framing:
        "LLMs don't rank — they retrieve and attribute. Winning an LLM answer is a question of entity clarity, co-citation authority, and structured signal density, not keyword targeting.",
      pillars: [
        {
          title: 'Entity Disambiguation & Knowledge Graph Alignment',
          technical:
            'We audit your brand data across core surfaces (Wikipedia, Wikidata, SEC filings) and deploy Organization JSON-LD schema validated against LLM benchmarks.',
          human:
            'Cuts AI hallucinations so prospects and procurement teams get accurate corporate data on first retrieval.',
        },
        {
          title: 'Co-Citation Architecture & Authority Network Engineering',
          technical:
            'We map the sources target LLMs trust most and build co-citation across publications, case studies, and community platforms.',
          human:
            'Gets your brand woven into synthesized AI answers, shortening research phases and sales cycles.',
        },
        {
          title: 'LLM Output Auditing & Competitive Mention Displacement',
          technical:
            'We run continuous prompt-library tests against target LLMs and deploy content countermeasures to close visibility gaps.',
          human:
            'Establishes new KPIs — LLM mention rate, AI share-of-voice — in place of traditional rankings.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase LLMO Deployment Framework',
      phases: [
        { num: 1, name: 'Semantic Mapping & Entity Audit', timeframe: 'Weeks 1–2', body: 'Baseline current LLM visibility with a 500-prompt test across ChatGPT, Perplexity, and Gemini, plus a full entity audit across 12 structured data sources.' },
        { num: 2, name: 'Entity Alignment & Schema Deployment', timeframe: 'Weeks 3–5', body: 'Deploy verified JSON-LD schema, correct Wikidata, harmonize Crunchbase/LinkedIn, and add FAQPage/HowTo schema to top pages.' },
        { num: 3, name: 'Co-Citation & Authority Placement', timeframe: 'Weeks 6–10', body: 'Execute bylined placements, original-research articles, and expert-sourcing campaigns targeting the semantic clusters where your brand is absent.' },
        { num: 4, name: 'Output Monitoring & Competitive Displacement', timeframe: 'Ongoing', body: 'Monthly re-runs of the prompt library tracking mention rate, accuracy, and displacement, with sprints prioritized by the biggest gaps.' },
      ],
    },
    geography: {
      headline: 'LLMO Engineering from Bengaluru. Cited in Every Major LLM.',
      body: "Our Bengaluru GEO team runs continuous LLM benchmarks and works under NDA with SaaS, enterprise, and agency clients across North America, the UK, and the GCC.",
      finalCta: "Schedule Your LLM Visibility Audit with MyAibo's Engineering Team",
    },
    relatedServices: {
      note: "Part of our GEO pillar. Pairs directly with Perplexity, Gemini & ChatGPT Optimization (platform-specific citation tactics) and Wikipedia Page Creation & Management (the single highest-weight entity source most brands are missing).",
      links: [
        { pillar: 'geo', cluster: 'perplexity-gemini-chatgpt-optimization', label: 'Perplexity, Gemini & ChatGPT Optimization' },
        { pillar: 'geo', cluster: 'wikipedia', label: 'Wikipedia Page Creation & Management' },
      ],
    },
    faq: [
      { q: "What's the difference between this and general GEO work?", a: 'This is the entity/citation-engineering layer specifically — the technical foundation the rest of our GEO program builds on.' },
      { q: 'Which LLMs do you benchmark against?', a: 'ChatGPT, Perplexity, and Gemini are tested monthly as standard; other models can be added to the prompt library on request.' },
      { q: 'Do we need existing press coverage for this to work?', a: 'It helps, but the entity-audit phase is designed to find and use whatever independent coverage already exists — including sources you may not know are being indexed.' },
    ],
    targetKeywords: ['LLM optimization services', 'LLMO agency', 'brand entity optimization for AI'],
    meta: {
      title: 'LLM Optimization Company (LLMO) | MyAibo GEO Services',
      description: 'MyAibo builds LLM optimization systems — entity disambiguation, co-citation architecture, and continuous output auditing — so your brand is the answer ChatGPT, Perplexity, and Gemini cite.',
    },
  },
  {
    pillar: 'geo',
    slug: 'perplexity-gemini-chatgpt-optimization',
    pillarName: 'Generative Engine Optimization',
    subLabel: 'Perplexity, Gemini & ChatGPT Optimization',
    eyebrow: 'Generative Engine Optimization · Platform-Specific AI Citation Strategy',
    h1: 'Get Cited on Perplexity, ChatGPT Search, Google AI Overviews, and Claude — Before Your Competitor Does',
    heroBody:
      "MyAibo builds platform-specific AI citation strategies for Perplexity, ChatGPT Search, Google Gemini Overview, and Claude — the four answer environments buyers check before visiting any vendor site. We map each platform's real retrieval architecture and position your content, entities, and structured data to be systematically selected as a source.",
    primaryCta: 'Get Your AI Citation Readiness Score',
    statBadge: '300 queries per platform logged and scored at baseline',
    aeoBox:
      "Each AI platform retrieves differently: ChatGPT Search leans on Bing's index, Perplexity does live retrieval weighted toward freshness and source diversity, Google AI Overviews follow Google's core ranking, and Claude runs web search on demand, fetching and quoting live pages when a question needs current sources. MyAibo engineers platform-specific citation strategies — technical readiness, structured answer blocks, and freshness cadence — for each retrieval architecture.",
    deepDive: {
      question: 'Why Are Four Different AI Platforms Citing Four Different Competitors Instead of You?',
      framing:
        'Optimizing for one AI platform does not optimize for the others. Each has its own index, retrieval logic, and freshness weighting, and buyers now check two or three before shortlisting.',
      pillars: [
        {
          title: 'Google AI Overview & Gemini Citation Engineering',
          technical:
            'We run a technical SEO audit (Core Web Vitals, crawlability, semantic HTML), implement FAQPage/HowTo schema on intent-matched pages, and build 40–60 word answer blocks under question-format headings, plus Speakable schema and internal-linking consolidation.',
          human:
            'Appearing in AI Overviews delivers zero-click brand impressions at scale — discovery-layer branding with no ad spend required.',
        },
        {
          title: 'Claude Web Search & Citation Optimization',
          technical:
            "We confirm Anthropic's crawlers — Claude-SearchBot for search indexing and Claude-User for user-triggered page fetches — can reach your key pages through robots.txt and llms.txt, then structure those pages as self-contained, quotable passages with explicit sources, clear authorship, and dated claims that Claude's web search can retrieve and cite inline.",
          human:
            'Claude is heavily used for research-heavy professional work — technical evaluations, vendor comparisons, due diligence — so being the source it cites puts your brand in front of buyers at the moment they are building a shortlist.',
        },
        {
          title: 'Perplexity Source Authority & Real-Time Citation Optimization',
          technical:
            'We run a rolling publication strategy of original research and technical explainers, configure robots.txt / llms.txt to invite PerplexityBot, and deploy structured answer blocks with clear authorship and date-published metadata.',
          human:
            "Appearing in Perplexity's cited sources functions like a placement in a trusted analyst report — referred traffic tends to convert well above general organic.",
        },
        {
          title: 'ChatGPT Search & Bing-Index Optimization',
          technical:
            'We audit via Bing Webmaster Tools, ensure Bingbot access, and format content for extractability — short declarative answers, labeled tables, entity-rich copy, and rigorous OGP metadata.',
          human:
            "With ChatGPT's user base past 500M weekly actives, consistent accurate citation is an underused awareness channel — early movers gain outsized share-of-voice.",
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase AI Platform Citation Framework',
      phases: [
        { num: 1, name: 'Platform Citation Baseline', timeframe: 'Week 1', body: '300 queries per platform, logged and scored for current citation rate, accuracy, and displacement opportunity.' },
        { num: 2, name: 'Technical Readiness & Crawler Access', timeframe: 'Weeks 2–3', body: 'Fix robots.txt / llms.txt gaps, Core Web Vitals issues, and semantic HTML deficiencies; deploy JSON-LD templates.' },
        { num: 3, name: 'Content & Entity Deployment', timeframe: 'Weeks 4–8', body: 'Publish platform-specific content — answer pages for Overviews, quotable source passages for Claude, freshness content for Perplexity, entity-dense pages for ChatGPT/Bing — with restructured internal linking.' },
        { num: 4, name: 'Continuous Citation Monitoring', timeframe: 'Ongoing', body: 'Monthly re-runs of the query library; prioritize updates by the largest citation gaps.' },
      ],
    },
    geography: {
      headline: 'Bengaluru-Based. Platform-Obsessed. NDA-Protected.',
      body: "Our Bengaluru GEO team tracks each platform's retrieval shifts daily and works under NDA with SaaS companies, agencies, and enterprises across North America, the UK, and the GCC.",
      finalCta: 'Book a Platform-Specific AI Citation Strategy Session',
    },
    relatedServices: {
      note: 'Part of our GEO pillar. Works alongside LLM Optimization Company (entity-level foundation) and Zero-Click & Synthetic Traffic Strategy (measuring the resulting visibility).',
      links: [
        { pillar: 'geo', cluster: 'llmo-company', label: 'LLM Optimization Company' },
        { pillar: 'geo', cluster: 'zero-click-search-synthetic-traffic', label: 'Zero-Click & Synthetic Traffic Strategy' },
      ],
    },
    faq: [
      { q: 'Why would each platform need its own strategy?', a: 'Because they retrieve differently — Bing-index-based, live-retrieval, Google-core-ranking-based, and Claude’s on-demand web search each reward different technical signals, so a single unified tactic under-serves most of them.' },
      { q: 'Do you track which specific queries we’re winning or losing?', a: 'Yes — the 300-query-per-platform baseline is re-run monthly, so gains and losses are visible platform-by-platform, not just as an aggregate score.' },
      { q: 'What happens when a platform changes its retrieval method?', a: 'We treat each platform’s baseline as a living target — the monitoring phase is what catches drift and triggers a re-optimization pass rather than waiting for a full re-audit.' },
    ],
    targetKeywords: ['Perplexity SEO agency', 'ChatGPT citation optimization', 'Google AI Overview optimization', 'Claude citation optimization'],
    meta: {
      title: 'Perplexity, Gemini & ChatGPT Optimization | MyAibo GEO',
      description: 'Get cited on Perplexity, ChatGPT Search, Google AI Overviews, and Claude. MyAibo engineers platform-specific AI citation strategies matched to each retrieval architecture.',
    },
  },
  {
    pillar: 'geo',
    slug: 'zero-click-search-synthetic-traffic',
    pillarName: 'Generative Engine Optimization',
    subLabel: 'Zero-Click & Synthetic Traffic Strategy',
    eyebrow: 'Generative Engine Optimization · Zero-Click & Synthetic Visibility',
    h1: 'Zero-Click Visibility Optimization: Win the Search Query Without Waiting for the Click',
    heroBody:
      'Over 60% of Google searches now end without a click. MyAibo engineers zero-click visibility — positioning your brand inside the answer itself and tracking an AI Visibility Index across the synthetic search surfaces where commercial intent actually lives.',
    primaryCta: 'Audit Your Zero-Click Brand Exposure',
    statBadge: '60%+ of Google searches now end without a click',
    aeoBox:
      "MyAibo measures and improves a brand's AI Visibility Index (AVI) — how often it appears as a cited entity across AI Overviews, Featured Snippets, answer panels, and knowledge cards, weighted by query intent. This solves the blind spot left by click-based attribution, which makes zero-click brand exposure invisible to most marketing teams.",
    deepDive: {
      question: 'Why Are Your Organic Traffic Numbers Declining While Your Buyers Are Seeing Your Brand More Than Ever?',
      framing:
        'Sessions and click-through rates are falling while AI Overview and Featured Snippet impressions rise. The channel is not shrinking — it is becoming invisible to click-based analytics.',
      pillars: [
        {
          title: 'AI Visibility Index (AVI) Development & Tracking Infrastructure',
          technical:
            'We build a custom AVI stack — a 200–500 query prompt library run monthly against ChatGPT, Perplexity, and Gemini, layered with GSC impression data into a single board-reportable score.',
          human:
            'Marketing leaders gain visibility into a previously unmeasured channel and a ranked list of competitors capturing zero-click share.',
        },
        {
          title: 'Synthetic Search Engine Marketing (SSEM) Content Architecture',
          technical:
            'We build content around zero-click query patterns (definitional, comparison, process), each with a 40–60 word extractable answer block and supporting structured data — built for machine extraction, not clicks.',
          human:
            'Functions as always-on, zero-CPM advertising at the exact moment a buyer is researching your category.',
        },
        {
          title: 'Featured Snippet & Knowledge Panel Ownership Strategy',
          technical:
            'We audit snippet-eligible queries and restructure content into paragraph, list, or table snippet formats, plus verified entity schema for Knowledge Panel enhancement.',
          human:
            'Owning a high-volume snippet is a static, always-on billboard that consumes attention before any competitor link is visible.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Zero-Click Visibility Framework',
      phases: [
        { num: 1, name: 'Zero-Click Landscape Audit', timeframe: 'Week 1', body: 'Map SERP features across your top 200 queries and identify the 30 highest-opportunity targets.' },
        { num: 2, name: 'AVI Baseline & Tracking Setup', timeframe: 'Weeks 2–3', body: 'Deploy the AVI tracking stack and establish a baseline score.' },
        { num: 3, name: 'Content & Schema Optimization', timeframe: 'Weeks 4–8', body: 'Restructure content and ship new SSEM assets for the top 30 targets, with schema and linking updates.' },
        { num: 4, name: 'AVI Score Growth & Competitive Displacement', timeframe: 'Ongoing', body: 'Monthly AVI measurement and content refresh cycles.' },
      ],
    },
    geography: {
      headline: 'Built in Bengaluru. Measured in Market Share.',
      body: 'Our Bengaluru GEO team tracks zero-click evolution daily under strict confidentiality, serving agencies and enterprise clients alike.',
      finalCta: 'Request a Zero-Click Visibility Strategy Engagement',
    },
    relatedServices: {
      note: 'Part of our GEO pillar. Complements Perplexity, Gemini & ChatGPT Optimization (platform tactics) and our AEO pillar (structured-answer capture on Google itself).',
      links: [
        { pillar: 'geo', cluster: 'perplexity-gemini-chatgpt-optimization', label: 'Perplexity, Gemini & ChatGPT Optimization' },
        { pillar: 'aeo', cluster: null, label: 'AEO pillar' },
      ],
    },
    faq: [
      { q: 'What is the AI Visibility Index, exactly?', a: 'A single, board-reportable score combining prompt-library citation results (200–500 queries across ChatGPT, Perplexity, Gemini) with Search Console impression data — built because click-based metrics alone can’t see this channel.' },
      { q: "Isn't this the same as AEO?", a: "Related but distinct — AEO focuses on structured answer boxes within Google itself (snippets, PAA); this tracks and builds visibility across AI chat/answer platforms as a category, including where Google's own AI Overviews behave more like a chat answer than a classic SERP feature." },
      { q: "How do we know this is actually working if there's no click to measure?", a: "That's what the AVI exists to solve — it's a proxy metric built specifically because the outcome (being the cited answer) doesn't produce a click to track." },
    ],
    targetKeywords: ['zero-click SEO strategy', 'AI Visibility Index', 'synthetic search engine marketing'],
    meta: {
      title: 'Zero-Click Search & Synthetic Traffic Strategy | MyAibo GEO',
      description: 'MyAibo builds an AI Visibility Index and synthetic search content architecture so your brand wins the query — even when the click never happens.',
    },
  },
  {
    pillar: 'geo',
    slug: 'reddit-community-seeding',
    pillarName: 'Generative Engine Optimization',
    subLabel: 'Reddit Community Seeding',
    eyebrow: 'Generative Engine Optimization · Reddit-Led GEO',
    h1: 'Reddit Is the Source Layer AI Search Runs On. Is Your Brand In It?',
    heroBody:
      "Perplexity pulls 46.7% of its citations from Reddit. Google AI Overviews, ChatGPT, and Gemini aren't far behind. If your brand isn't part of the Reddit conversation in your category, you're invisible to the fastest-growing share of search — the answer, not the ad.",
    primaryCta: 'Get a free Reddit visibility audit for your category',
    statBadge: "Reddit = 46.7% of Perplexity's citations",
    deepDive: {
      question:
        "AI answer engines don't cite marketing copy. They cite first-hand experience — a detailed comment with 50+ upvotes, written by someone who sounds like they actually used the product, sitting in a thread that's still getting traffic.",
      framing:
        "Across ChatGPT, Perplexity, Google AI Overviews, and Gemini, Reddit now accounts for more than half of all social-platform citations, and that share grew month over month in the most recent measured period. Comments outperform top-level posts by a wide margin — on Perplexity it's 78% comments to 22% posts. None of that inventory exists on your website. It exists in threads you're not part of yet.",
      pillars: [
        {
          title: 'Subreddit and query mapping',
          technical: 'We identify the specific subreddits and question patterns in your category where AI engines are already pulling answers from.',
          human: 'Effort goes only where AI engines are already looking — the threads shaping answers in your category, not simply the subreddits with the biggest member counts.',
        },
        {
          title: 'Compliant community participation',
          technical:
            "Real answers, written by people with genuine domain knowledge, following each subreddit's actual posting rules — no bought accounts, no karma farming, no vote manipulation.",
          human: 'This matters doubly for regulated categories (BFSI, insurance, healthcare) where a banned account or a subreddit blacklist is a real business risk.',
        },
        {
          title: 'Long-form, citation-shaped answers',
          technical: 'We write to the shape the research shows gets cited most, not to word-count filler.',
          human: "Comments outperform top-level posts as a citation source — on Perplexity it's 78% comments to 22% posts — so a well-shaped answer in the right thread is the unit that actually gets cited.",
        },
        {
          title: 'Citation tracking',
          technical:
            "We monitor which threads and comments actually get pulled into ChatGPT, Perplexity, and AI Overview answers for your target queries, and double down on what's working.",
          human: 'With a roughly two-week average lag between a highly-upvoted comment and its first LLM citation, tracking shows early what is working — turning community work into an AI-visibility number you can report on.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Reddit Community Seeding Framework',
      phases: [
        { num: 1, name: 'Landscape audit', timeframe: 'Weeks 1–2', body: 'Map subreddits, existing threads, and competitor mentions already shaping AI answers in your category. Flag compliance constraints per subreddit before writing a single word.' },
        { num: 2, name: 'Foundation building', timeframe: 'Weeks 3–6', body: 'Establish genuine, rules-compliant community presence — deliberately slower, since Reddit and AI engines both penalize anything that looks manufactured.' },
        { num: 3, name: 'Citation-targeted seeding', timeframe: 'Weeks 6–12', body: 'Answer real questions in the threads most likely to be pulled by AI engines.' },
        { num: 4, name: 'Monitoring and compounding', timeframe: 'Ongoing', body: 'Track citations across ChatGPT, Perplexity, Gemini, and AI Overviews; reinforce threads already earning visibility.' },
      ],
    },
    relatedServices: {
      note: 'Part of our GEO pillar. Works alongside Wikipedia Page Creation & Management (same AI-citation-source family) and Community & UGC Search Amplification (complementary — Reddit for AI-answer visibility, Quora/reviews for classic search and late-stage intent).',
      links: [
        { pillar: 'geo', cluster: 'wikipedia', label: 'Wikipedia Page Creation & Management' },
        { pillar: 'seo', cluster: 'community-ugc-search-amplification', label: 'Community & UGC Search Amplification' },
      ],
    },
    faq: [
      { q: 'Is this the same as buying upvotes or fake accounts?', a: "No — and we won't do it. Vote manipulation and bought accounts get flagged by Reddit and stripped of any AI-citation value anyway." },
      { q: 'How long before we see AI citations?', a: 'Foundation-building (genuine community standing before seeding starts) takes 4–6 weeks before that clock even starts; the research shows a roughly two-week average lag between a highly-upvoted comment and its first LLM citation after that.' },
      { q: "What if our category doesn't have relevant subreddits?", a: 'Most B2B and consumer categories have more Reddit activity than brands assume — the audit phase exists specifically to find where, even if it’s adjacent communities rather than a subreddit named after your category.' },
    ],
    targetKeywords: ['Reddit community seeding', 'Reddit marketing for AI search', 'Reddit GEO agency', 'Reddit AI citations'],
    meta: {
      title: 'Reddit Community Seeding for AI Search | MyAibo GEO',
      description: "Perplexity pulls 46.7% of its citations from Reddit. MyAibo runs compliant, citation-shaped Reddit participation so your brand is part of the answers AI search gives.",
    },
  },
  {
    pillar: 'geo',
    slug: 'quora-content-seeding',
    pillarName: 'Generative Engine Optimization',
    subLabel: 'Quora & Review-Platform Content Seeding',
    eyebrow: 'Generative Engine Optimization · Quora & Review-Platform Visibility',
    h1: 'Quora Has 400 Million Buyers Doing Research. Is Your Brand In Those Threads?',
    heroBody:
      "Quora isn't winning the AI-citation race the way Reddit is right now — we'll tell you that straight, not sell you a stat that doesn't hold up. What it still has: 100 million users in India alone, a college-educated, higher-income user base, and a habit of showing up in Google's featured snippets and \"People Also Ask\" boxes for the exact comparison and decision-stage questions your buyers are typing in.",
    primaryCta: 'Get a Free Quora & Review-Platform Visibility Audit',
    aeoBox:
      "MyAibo runs Quora and review-platform (G2 and category equivalents) content seeding — question and thread mapping, compliant answer and review drafting, and competitive share-of-voice tracking — targeted at the comparison and decision-stage queries where 100M+ Indian Quora users and high-intent B2B buyers actually research. This runs as a complement to Reddit-led GEO work, not a replacement: Reddit for AI-answer citation, Quora and reviews for classic Google search and late-stage buyer intent.",
    deepDive: {
      question: "Why Is a Competitor's Name Showing Up in the Quora Threads Ranking for Your Category — And Not Yours?",
      framing:
        "Quora answers 99% of the questions asked on it and fields 3,000–5,000 new questions a day, from users in a research-and-compare mindset — over half report household income above $100K, concentrated in the 25–34 bracket squarely in the researching-before-buying stage. If a competitor's name is showing up in the threads ranking for your category's comparison queries and yours isn't, that's lost consideration, not just lost traffic.",
      pillars: [
        {
          title: 'Question & Thread Mapping',
          technical:
            "We find the specific Quora questions already ranking (or capable of ranking) for your category's comparison, \"vs,\" and \"is it worth it\" queries — where a well-placed, genuine answer earns both direct traffic and featured-snippet real estate.",
          human:
            'Puts your brand in front of buyers at the exact moment they are comparing you to a named competitor, instead of leaving that thread to answer itself.',
        },
        {
          title: 'Compliant Answer & Review-Platform Seeding',
          technical:
            "Real, credentialed-sounding answers written by people with actual category knowledge, following Quora's content and self-promotion policies, plus structured presence and schema markup across review platforms (G2 and category equivalents) that Google already weights as high-trust, first-hand-experience content.",
          human:
            'The same trust signal that makes a Reddit thread outrank a landing page, applied to Quora and reviews — no spam-linking, no policy risk.',
        },
        {
          title: 'Competitive Share-of-Voice Tracking',
          technical:
            "We monitor which threads and reviews are actually driving traffic and rankings for your category, and where competitors are currently winning that you're not contesting.",
          human:
            'Turns "we don\'t know how we compare on Quora" into a tracked, closeable gap instead of a blind spot.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Community-Led SEO Framework',
      phases: [
        { num: 1, name: 'Landscape Audit', timeframe: 'Weeks 1–2', body: 'Map existing Quora threads, review platform coverage, and competitor share-of-voice for your category\'s highest-intent queries.' },
        { num: 2, name: 'Strategy Development', timeframe: 'Weeks 2–4', body: 'Prioritize the threads and platforms with the best ranking opportunity and highest buyer intent, not just the highest traffic.' },
        { num: 3, name: 'Execution', timeframe: 'Weeks 4–10', body: 'Seed genuine, policy-compliant answers and reviews, written to actually answer the question rather than pivot to a pitch.' },
        { num: 4, name: 'Ongoing Monitoring', timeframe: 'Continuous', body: 'Track rankings, snippet ownership, and competitive movement, and refresh or extend answers that are losing ground.' },
      ],
    },
    geography: {
      headline: 'Community-Led SEO from Bengaluru. Built for Buyers Who Compare Before They Buy.',
      body: 'Our Bengaluru team runs Quora and review-platform seeding under strict content-policy compliance for SaaS, D2C, and B2B clients across India, North America, and the UK.',
      finalCta: 'Request Your Quora & Review-Platform Visibility Audit',
    },
    faq: [
      {
        q: 'Is Quora still worth investing in if AI engines are citing it less?',
        a: "For AI citations specifically, less than Reddit right now — we'll say that plainly. For classic Google search and reaching a high-intent, high-income research audience, yes; that hasn't changed.",
      },
      {
        q: 'Do you write fake reviews or use bot accounts?',
        a: "No. Everything is real answers and reviews from people with genuine category knowledge, following each platform's actual content policies.",
      },
      {
        q: 'How does this differ from Quora Ads?',
        a: 'Ads buy placement and traffic for as long as you pay; this builds organic answers and review presence that keep ranking and earning traffic after the work is done.',
      },
      {
        q: 'Can this help with featured snippets specifically?',
        a: 'Yes — Quora answers are frequently pulled into Google\'s featured snippets and People Also Ask boxes for comparison and "how does X work" queries, and that\'s a specific target of the seeding strategy.',
      },
      {
        q: "What's the difference between this and your GEO service?",
        a: 'GEO (and the dedicated Reddit-style work) targets being cited inside AI-generated answers. This page targets ranking and visibility inside classic Google search results and Quora itself — related goals and different mechanics.',
      },
    ],
    targetKeywords: ['Quora marketing agency', 'Quora content seeding', 'G2 review management', 'Quora SEO strategy'],
    meta: {
      title: 'Quora & Review-Platform Content Seeding | MyAibo GEO',
      description: 'MyAibo seeds compliant Quora answers and G2/review-platform presence for the comparison queries your buyers are researching, plus share-of-voice tracking against named competitors.',
    },
  },
  {
    pillar: 'geo',
    slug: 'wikipedia',
    pillarName: 'Generative Engine Optimization',
    subLabel: 'Wikipedia Page Creation & Management',
    eyebrow: 'Generative Engine Optimization · Wikipedia Notability & Article Management',
    h1: "Your Company Clears Wikipedia's Bar for Notability. It Still Doesn't Have a Page.",
    heroBody:
      "Wikipedia is the single most-cited unstructured source on the open web — and increasingly, the reference layer AI systems consult before a customer, investor, or journalist ever reaches your site. Nearly half of ChatGPT's top-cited sources trace back to Wikipedia. If your company or founder doesn't have a compliant, properly sourced article, that space isn't empty — it's either missing entirely or being filled by whoever gets there first.",
    primaryCta: 'Get a Free Wikipedia Notability Assessment',
    aeoBox:
      "MyAibo builds and manages compliant Wikipedia articles — notability and source audits against Wikipedia's notability guideline for organizations (WP:NCORP), neutral citation-backed drafting, formal paid-contributor disclosure, and submission through Articles for Creation for independent volunteer review — plus ongoing vandalism monitoring and AI-citation tracking after publication. Nearly half of ChatGPT's top-cited sources trace back to Wikipedia, making a properly sourced article the highest-authority third-party asset a brand can hold.",
    deepDive: {
      question: "Why Doesn't a Generic Wikipedia Consultant — or an Internal Team — Get This Done Safely?",
      framing:
        "A recent audit for an NSE-listed healthcare network — India's largest dedicated cancer care provider, 30+ centers, 400+ oncologists, 35 years of operating history — found no Wikipedia article at all, despite its own founder already having one that references the company extensively. The gap wasn't a notability problem. It was simply a task nobody owned — and it's read as a signal by exactly the people doing due diligence: investors, accreditation bodies, journalists, and now AI systems.",
      pillars: [
        {
          title: 'Policy Compliance, Disclosed From Day One',
          technical:
            "Wikipedia explicitly prohibits undisclosed paid editing, and articles that read like marketing copy get deleted, often within days. We file formal paid-contributor disclosure and submit through Articles for Creation for independent volunteer review — disclosed articles have measurably better survival rates than undisclosed ones.",
          human:
            'Avoids the deletion notice and permanent conflict-of-interest flag that sinks most company-written or undisclosed-consultant attempts.',
        },
        {
          title: 'Content Structured for AI Parsing, Not Just Human Review',
          technical:
            'Every factual claim tied to an independent citation, written to Wikipedia\'s neutral-point-of-view standard and structured to be favorably parsed by ChatGPT, Gemini, and Perplexity — not just to survive human editorial review.',
          human:
            'Most generic Wikipedia consultants stop at "the page is live." This is built to actually get pulled into AI-generated answers once it exists.',
        },
        {
          title: 'Ongoing Monitoring & Downstream Citation Tracking',
          technical:
            'We monitor for vandalism, unsourced edits, and factual drift, and make any future updates through the same disclosed, sourced process — while tracking article views, referring-domain visibility, and AI-citation shifts traceable back to the article.',
          human:
            'Protects the asset after launch instead of treating publication as the finish line.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Framework',
      phases: [
        { num: 1, name: 'Notability & Source Audit', timeframe: 'Weeks 1–2', body: 'Compile and verify independent coverage, confirm the notability bar is cleared, and flag sourcing gaps before drafting starts.' },
        { num: 2, name: 'Draft & Structure', timeframe: 'Weeks 2–4', body: "Write a neutral, encyclopedic article with every claim tied to an independent citation; internal review against Wikipedia's verifiability and NPOV policies before it goes anywhere." },
        { num: 3, name: 'Disclosure & Submission', timeframe: 'Weeks 4–5', body: "Formal paid-editor disclosure, submission for independent review, and iteration with volunteer editors until it's accepted." },
        { num: 4, name: 'Ongoing Management', timeframe: 'Retainer', body: 'Vandalism monitoring, periodic sourced updates, and quarterly reporting on article views, referring-domain visibility, and any AI-citation shifts traceable back to the article.' },
      ],
    },
    geography: {
      headline: "Wikipedia Compliance Work from Bengaluru. Built for Investors, Journalists, and AI Systems.",
      body: 'Our Bengaluru team runs notability audits and disclosed article management for listed companies, funded startups, and founders across India, North America, and the UK.',
      finalCta: 'Book Your Wikipedia Notability Assessment',
    },
    faq: [
      {
        q: 'Can you guarantee my company gets a Wikipedia page?',
        a: "No, and anyone who guarantees it isn't being straight with you — Wikipedia articles are reviewed and accepted by independent volunteer editors, not bought. What we guarantee is a properly sourced, policy-compliant draft that gives it the best realistic chance, and we won't take on the audit-phase work if the notability bar clearly isn't cleared.",
      },
      {
        q: 'Is this the same as paying someone to edit Wikipedia secretly?',
        a: "No — and that approach gets articles deleted, since undisclosed paid editing is explicitly against Wikipedia's terms of use. Every article we work on carries a formal paid-contributor disclosure.",
      },
      {
        q: "What if we already have a page and it's outdated or inaccurate?",
        a: "The same disclosed, sourced-edit process applies to updates as to new articles — we don't silently edit, and neither should anyone working on your behalf.",
      },
      {
        q: 'How is this different from your GEO/AEO services generally?',
        a: 'Your broader GEO program builds citation-worthy content across your own properties. This is specific to the single highest-authority third-party source AI systems already trust by default — different mechanics, same underlying goal of being described accurately wherever AI systems look.',
      },
      {
        q: 'What happens if the article gets vandalized or someone adds inaccurate information later?',
        a: "That's what the ongoing management phase covers — active monitoring for unsourced edits or factual drift, with any correction made through Wikipedia's own proper channels.",
      },
    ],
    targetKeywords: ['Wikipedia page creation service', 'Wikipedia notability consultant', 'corporate Wikipedia article writing', 'Wikipedia SEO for AI citation'],
    meta: {
      title: 'Wikipedia Page Creation & Management | MyAibo GEO',
      description: 'MyAibo builds compliant, disclosed Wikipedia articles — notability audits, neutral citation-backed drafting, and ongoing vandalism monitoring — for the source AI systems already trust.',
    },
  },

  // ─────────────────────────── AEO (2) ───────────────────────────
  {
    pillar: 'aeo',
    slug: 'llm-bot-compliance-llms-txt',
    pillarName: 'Answer Engine Optimization',
    subLabel: 'LLM Bot Compliance & llms.txt',
    eyebrow: 'Answer Engine Optimization · LLM Bot Compliance & Crawler Governance',
    h1: 'llms.txt Configuration and AI Crawler Governance: Control How LLMs Access Your Content',
    heroBody:
      'Most organizations have zero governance over what LLM crawlers scrape or exclude. MyAibo builds complete bot-compliance frameworks — llms.txt, bot-specific robots.txt, rate limiting, and legal documentation — giving your team both control and defensibility.',
    primaryCta: 'Request an AI Crawler Compliance Audit',
    statBadge: 'Full crawler audit across every AI bot hitting your site',
    aeoBox:
      "MyAibo configures llms.txt alongside bot-specific robots.txt, HTTP headers, and server-level rate limiting — maximizing compliant indexing where you want citation and blocking unauthorized scraping where you don't, backed by legal-technical documentation.",
    deepDive: {
      question: 'Are AI Crawlers Scraping Your Proprietary Content Without Permission While Missing the Pages You Actually Want Indexed?',
      framing:
        'By default, crawlers access everything indiscriminately — proprietary or gated content included — while your best citable content may be blocked by misconfigured directives.',
      pillars: [
        {
          title: 'llms.txt Architecture & Deployment',
          technical:
            'We build your llms.txt manifest — organization description, structured content index, explicit permission statements, and licensing contact — plus llms-full.txt for larger sites.',
          human:
            'Gives LLMs a roadmap to your best content instead of your oldest.',
        },
        {
          title: 'Bot-Specific robots.txt Directives & AI Crawler Identification',
          technical:
            'We set directives per crawler (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, and others), tiering pages as crawlable, rate-limited, or blocked, with server-level bot fingerprinting.',
          human:
            'Gives legal teams documented governance evidence and stops unexplained server load from aggressive bots.',
        },
        {
          title: 'Unauthorized AI Scraping Prevention & Legal-Technical Documentation',
          technical:
            'We add rate limiting, CAPTCHA gating, IP blocking, and X-Robots-Tag headers, plus a full AI Access Policy for your Terms of Service.',
          human:
            'Gives media companies and data-driven firms a defensible legal position on their core IP.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase LLM Bot Compliance Framework',
      phases: [
        { num: 1, name: 'AI Crawler Access Audit', timeframe: 'Week 1', body: 'Log analysis to identify every AI crawler hitting your site and produce a full traffic report.' },
        { num: 2, name: 'Governance Architecture Design', timeframe: 'Week 2', body: 'Design llms.txt, bot-specific directives, headers, and rate limits per content tier.' },
        { num: 3, name: 'Technical Deployment', timeframe: 'Weeks 3–4', body: 'Implement and validate all configurations.' },
        { num: 4, name: 'Monitoring & Policy Maintenance', timeframe: 'Ongoing', body: 'Quarterly audits for new crawlers and policy updates.' },
      ],
    },
    geography: {
      headline: 'Bengaluru Engineering. Global Compliance Readiness.',
      body: 'Our Bengaluru AEO team tracks crawler protocol changes weekly for tech, media, and regulated-industry clients, all under NDA.',
      finalCta: 'Schedule Your AI Crawler Compliance Audit with MyAibo',
    },
    relatedServices: {
      note: 'Part of our AEO pillar. Complements Semantic FAQ & Knowledge Graph Schema — governance controls which bots can access your content; schema controls how well the ones you allow can use it.',
      links: [
        { pillar: 'aeo', cluster: 'semantic-faq-knowledge-graph-schema', label: 'Semantic FAQ & Knowledge Graph Schema' },
      ],
    },
    faq: [
      { q: 'Does blocking some AI crawlers hurt our GEO/AEO visibility?', a: 'No — the point is selective governance: we tier pages as crawlable, rate-limited, or blocked, so your best citable content stays open while proprietary or gated material doesn’t.' },
      { q: 'Which crawlers do you configure for?', a: 'GPTBot, ClaudeBot, Google-Extended, PerplexityBot, and others are addressed individually rather than with one blanket directive, since each behaves differently.' },
      { q: 'Is llms.txt actually respected by AI companies?', a: "Adoption varies by provider — it's an emerging, voluntary standard, which is exactly why it's paired here with server-level enforcement (rate limiting, IP blocking, legal documentation) rather than relied on alone." },
    ],
    targetKeywords: ['how to configure llms.txt', 'AI crawler optimization', 'stop illegal AI scraping'],
    meta: {
      title: 'llms.txt Configuration & LLM Bot Compliance | MyAibo AEO',
      description: 'MyAibo builds full LLM bot compliance frameworks — llms.txt, bot-specific robots.txt, rate limiting, and legal documentation — for control and defensibility.',
    },
  },
  {
    pillar: 'aeo',
    slug: 'semantic-faq-knowledge-graph-schema',
    pillarName: 'Answer Engine Optimization',
    subLabel: 'Semantic FAQ & Knowledge Graph Schema',
    eyebrow: 'Answer Engine Optimization · Semantic Schema Engineering',
    h1: 'Advanced FAQ Schema and Knowledge Graph Optimization That Makes Your Content Machine-Extractable',
    heroBody:
      "MyAibo turns your existing content into machine-readable knowledge — FAQ schema, HowTo markup, and full knowledge graph optimization — so Google's AI Overviews, Perplexity, and any LLM can select, extract, and cite your answers precisely.",
    primaryCta: 'Get a Structured Data Architecture Review',
    statBadge: 'Measurable gains typically appear within 60–90 days of re-architecture',
    aeoBox:
      'MyAibo covers FAQPage and HowTo JSON-LD, Speakable schema, Q&A architecture, and knowledge graph entity alignment (Organization, Product, Service, Person with sameAs chains) — fixing content that answers buyer questions but lacks the schema layer machines need to find it.',
    deepDive: {
      question: "Why Are AI Answer Engines Extracting Answers from Your Competitors When You've Published Better Content?",
      framing:
        'Schema is the confidence signal AI Overviews use to recognize content type. Without it, even the best-written page reads as ambient prose to machine extractors.',
      pillars: [
        {
          title: 'FAQPage & HowTo JSON-LD Schema Engineering',
          technical:
            "We map every buyer question across your funnel and implement FAQPage, HowTo, and Q&APage schema at the template level, validated against Google's Rich Results Test.",
          human:
            'Eligible pages gain FAQ Rich Results and higher AI Overview selection odds at scale, without per-page manual work.',
        },
        {
          title: 'Knowledge Graph Entity Architecture & sameAs Chain Deployment',
          technical:
            "We build Organization, Person, Product, Service, and Event schema with verified sameAs chains to Wikidata, Crunchbase, LinkedIn, and GitHub, cross-validated against Google's Knowledge Panel.",
          human:
            'Strong entity graphs correlate with lower hallucination rates, higher AI Overview selection, and stronger buyer trust.',
        },
        {
          title: 'Semantic Content Block Architecture for LLM Extraction',
          technical:
            'We engineer 40–60 word answer blocks, <dfn> definitions, labeled tables, and Speakable / Article schema with author and citation properties.',
          human:
            'Re-architected pages see measurable gains in Featured Snippets, AI Overview inclusion, and Perplexity citations within 60–90 days.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Schema Engineering Framework',
      phases: [
        { num: 1, name: 'Structured Data Audit & Question Cluster Mapping', timeframe: 'Week 1', body: 'Audit existing schema and map buyer questions across your page taxonomy.' },
        { num: 2, name: 'Schema Architecture Design', timeframe: 'Week 2', body: 'Design JSON-LD templates and entity architecture; document content block guidelines.' },
        { num: 3, name: 'Schema Deployment & Content Restructuring', timeframe: 'Weeks 3–6', body: 'Deploy schema and restructure priority pages; validate with Rich Results Test.' },
        { num: 4, name: 'Performance Monitoring & Schema Maintenance', timeframe: 'Ongoing', body: 'Monthly validation sweeps and citation-rate tracking.' },
      ],
    },
    geography: {
      headline: 'Structured Data Engineering from Bengaluru. Extractable by Every AI System.',
      body: 'Our Bengaluru team tracks Schema.org and Rich Results changes for B2B, e-commerce, and content-heavy brands needing structured data at scale.',
      finalCta: 'Book a Knowledge Graph & Schema Engineering Engagement',
    },
    relatedServices: {
      note: 'Part of our AEO pillar. Complements LLM Bot Compliance & llms.txt (access governance) and our SEO pillar (foundational content architecture this schema layer builds on).',
      links: [
        { pillar: 'aeo', cluster: 'llm-bot-compliance-llms-txt', label: 'LLM Bot Compliance & llms.txt' },
        { pillar: 'seo', cluster: null, label: 'SEO pillar' },
      ],
    },
    faq: [
      { q: 'Do we need to rewrite our content, or just add schema?', a: 'Mostly the latter — this is primarily a markup and structuring pass on existing content, plus reformatting specific answer blocks to the 40–60 word extractable shape where needed.' },
      { q: 'Will this help with voice assistants too?', a: 'Yes — Speakable schema is part of the implementation specifically for that surface.' },
      { q: 'How is this different from your general AEO process?', a: "This subpage is the schema/markup execution layer; the AEO pillar's process also covers query research and competitor snippet auditing upstream of this work." },
    ],
    targetKeywords: ['advanced FAQ schema setup', 'knowledge graph optimization', 'structured data for LLMs'],
    meta: {
      title: 'FAQ Schema & Knowledge Graph Engineering | MyAibo AEO',
      description: 'MyAibo builds FAQ, HowTo, Speakable, and knowledge-graph entity schema so AI Overviews, Perplexity, and any LLM can extract and cite your content precisely.',
    },
  },

  // ─────────────────────────── SEO (4) ───────────────────────────
  {
    pillar: 'seo',
    slug: 'programmatic-seo-engine',
    pillarName: 'Search Engine Optimization',
    subLabel: 'Programmatic SEO Engine',
    eyebrow: 'Search Engine Optimization · Programmatic SEO Infrastructure',
    h1: 'Programmatic SEO Setup for SaaS: Scale to Thousands of High-Intent Landing Pages Without Manual Content Production',
    heroBody:
      "MyAibo builds production-grade programmatic SEO engines for SaaS and marketplaces — data modeling, template engineering, URL structure, automated linking, and indexation monitoring — delivering compounding traffic manual content teams can't reach.",
    primaryCta: 'Request a Programmatic SEO Architecture Session',
    statBadge: 'Indexed pages typically grow from hundreds to tens of thousands within 6–12 months',
    aeoBox:
      'MyAibo builds relational databases powering dynamic landing pages (locations, integrations, comparisons, use-cases, features) with automated linking and crawl-optimized indexation, engineered to avoid the thin-content filters that sink most programmatic SEO.',
    deepDive: {
      question: 'Why Are Your SaaS Competitors Ranking for 50,000 Long-Tail Keywords While Your Content Team Publishes 8 Articles a Month?',
      framing:
        'Programmatic SEO is the system G2, Zapier, and Webflow used to index tens of thousands of pages early — turning SEO into a data operation instead of a publishing operation.',
      pillars: [
        {
          title: 'Database-Driven Landing Page Architecture',
          technical:
            'We design the relational schema and page templates (Next.js, Nuxt, Webflow, or custom) with dynamic data injection and render-time schema, each page type on a distinct template.',
          human:
            'Indexed pages typically grow from hundreds to tens of thousands within 6–12 months, capturing high-intent traffic that converts well above top-of-funnel blog content.',
        },
        {
          title: 'Programmatic Keyword Pattern Architecture & Data Sourcing',
          technical:
            'We identify structural keyword formulas (product + city, competitor alternative for use case) and source or build the data to populate them, prioritized by volume and commercial intent.',
          human:
            'Turns SEO into a data operation — one template and 500 records instead of 500 articles.',
        },
        {
          title: 'Indexation Pipeline & Crawl Budget Optimization',
          technical:
            'We build sitemap generation, IndexNow integration, PageRank-channeling internal links, canonical strategy, and crawl-budget monitoring via GSC logs.',
          human:
            'Lifts indexation from the typical 30–50% unmanaged rate to 80–90%+.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Programmatic SEO Engine Deployment',
      phases: [
        { num: 1, name: 'Keyword Pattern Audit & Data Architecture Design', timeframe: 'Weeks 1–2', body: 'Pattern identification, data sourcing, schema design, and URL/canonical strategy.' },
        { num: 2, name: 'Template Engineering & Database Build', timeframe: 'Weeks 3–6', body: 'Build templates, populate the database, and automate internal linking.' },
        { num: 3, name: 'Indexation Pipeline Deployment', timeframe: 'Weeks 7–8', body: 'Deploy sitemaps, IndexNow, and crawl monitoring; measure baseline indexation.' },
        { num: 4, name: 'Indexation Monitoring & Content Scaling', timeframe: 'Ongoing', body: 'Monthly reporting, new page-type expansion, and thin-content audits.' },
      ],
    },
    geography: {
      headline: 'Programmatic SEO Infrastructure Built in Bengaluru. Indexed Globally.',
      body: "We've deployed these systems for SaaS companies across North America, Europe, and APAC, operating as an embedded engineering extension under NDA.",
      finalCta: 'Book a Programmatic SEO Architecture Workshop with MyAibo',
    },
    relatedServices: {
      note: 'Part of our SEO pillar. Pairs with Topical Authority & Entity SEO — the architecture that keeps large programmatic page sets from triggering quality filters.',
      links: [
        { pillar: 'seo', cluster: 'topical-authority-entity-seo', label: 'Topical Authority & Entity SEO' },
      ],
    },
    faq: [
      { q: "Won't thousands of programmatic pages get flagged as thin content?", a: "Not when they're built on genuine data differentiation and linked within a proper topical hierarchy — that's precisely what our Topical Authority & Entity SEO work is designed to prevent." },
      { q: 'What kind of "data" powers these pages?', a: 'Whatever structured records your business already has or can source — product catalogs, location data, comparison attributes, integration lists — one template rendering many real, differentiated records.' },
      { q: 'How fast does this actually move the needle?', a: "The indexation pipeline phase (weeks 7–8) is when pages start entering Google's index at scale; meaningful traffic typically follows within the 6–12 month page-growth window." },
    ],
    targetKeywords: ['programmatic SEO setup for SaaS', 'scale landing pages with database tracking', 'programmatic keyword patterns'],
    meta: {
      title: 'Programmatic SEO Engine Development | MyAibo SEO',
      description: 'MyAibo builds production-grade programmatic SEO engines — data modeling, template engineering, and indexation pipelines that scale to tens of thousands of high-intent pages.',
    },
  },
  {
    pillar: 'seo',
    slug: 'topical-authority-entity-seo',
    pillarName: 'Search Engine Optimization',
    subLabel: 'Topical Authority & Entity SEO',
    eyebrow: 'Search Engine Optimization · Topical Authority & Entity Architecture',
    h1: 'Programmatic SEO Agency Services: Database-Driven Landing Pages That Build Topical Authority at Scale',
    heroBody:
      'MyAibo combines entity-based content architecture, database-driven page systems, and topical clustering — the signals search engines and AI summarizers use to detect genuine category expertise. We build the systems, not the spreadsheets.',
    primaryCta: 'Schedule a Topical Authority Audit',
    statBadge: 'Core-term rankings typically lift within 60–120 days after restructuring',
    aeoBox:
      'MyAibo builds pillar-cluster hierarchies, entity disambiguation, and internal linking that reinforce rather than dilute topical authority — solving the common programmatic SEO failure of high page counts triggering quality filters.',
    deepDive: {
      question: 'Why Does Your Domain Have High Authority But Rank Weakly for Your Core Category Terms?',
      framing:
        'Domain authority is a proxy; Google actually evaluates topical depth and interconnection. A thin site with 200 tightly-linked pages will beat a bloated site with 20,000 disconnected ones.',
      pillars: [
        {
          title: 'Topical Authority Cluster Architecture',
          technical:
            'We build a three-level pillar-cluster-programmatic hierarchy with deliberate authority-flow linking and engineered entity co-occurrence across pages.',
          human:
            'Restructures typically lift previously stagnant core-term rankings within 60–120 days.',
        },
        {
          title: 'Entity SEO & Brand Entity Validation',
          technical:
            'We catalogue every named entity on your site, implement entity schema, and validate against Google Knowledge Graph, Wikidata, and Bing Entity Store.',
          human:
            'Entity-rich pages rank for semantic variants without added content production, expanding keyword footprint without expanding the team.',
        },
        {
          title: 'PSEO Development Infrastructure: Systems Over Spreadsheets',
          technical:
            'We build the database, template system, content-differentiation framework, and linking engine as one production system — no content calendars at the long-tail level.',
          human:
            'Each new data record becomes a new indexed page at zero added engineering effort, building a moat competitors take 18–24 months to replicate.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Topical Authority & PSEO Infrastructure Build',
      phases: [
        { num: 1, name: 'Topical Gap & Entity Audit', timeframe: 'Weeks 1–2', body: 'Gap analysis against top 3 competitors, entity audit, and keyword pattern identification.' },
        { num: 2, name: 'Architecture Design', timeframe: 'Weeks 3–4', body: 'Design the content hierarchy, entity schema, and database/template wireframes.' },
        { num: 3, name: 'Infrastructure Build & Content Deployment', timeframe: 'Weeks 5–10', body: 'Build infrastructure, populate data, and deploy schema site-wide.' },
        { num: 4, name: 'Authority Growth Monitoring', timeframe: 'Ongoing', body: 'Monthly authority-score tracking and quarterly entity refresh.' },
      ],
    },
    geography: {
      headline: 'Topical Authority Systems Engineered in Bengaluru.',
      body: 'We build PSEO infrastructure for SaaS companies, agencies, and marketplaces globally, as a technical SEO engineering firm operating under strict NDA.',
      finalCta: 'Book a PSEO Infrastructure Discovery Call',
    },
    relatedServices: {
      note: 'Part of our SEO pillar. Pairs with Programmatic SEO Engine (the page-generation system this architecture keeps from diluting authority).',
      links: [
        { pillar: 'seo', cluster: 'programmatic-seo-engine', label: 'Programmatic SEO Engine' },
      ],
    },
    faq: [
      { q: 'Is this just about adding more pages?', a: "No — the opposite emphasis, actually: it's about interconnection and hierarchy. A smaller, tightly-linked site structure outperforms a large, disconnected one." },
      { q: 'What’s "entity SEO" in plain terms?', a: 'Making sure every named person, product, location, or concept on your site is clearly and consistently marked up, so search engines and AI systems recognize it as the same entity everywhere it appears.' },
      { q: 'How does this interact with our programmatic pages?', a: 'This is the architecture layer that sits above programmatic page generation — it’s what determines whether thousands of new pages reinforce your authority or dilute it.' },
    ],
    targetKeywords: ['programmatic SEO agency', 'programmatic SEO services', 'PSEO development infrastructure', 'database driven landing pages'],
    meta: {
      title: 'Topical Authority & Entity SEO | MyAibo SEO',
      description: 'MyAibo builds pillar-cluster architectures, entity SEO, and PSEO infrastructure that build topical authority the way search engines and AI summarizers actually measure it.',
    },
  },
  {
    pillar: 'seo',
    slug: 'ai-agent-optimization',
    pillarName: 'Search Engine Optimization',
    subLabel: 'AI Agent Optimization',
    eyebrow: 'Search Engine Optimization · Agentic Web Optimization',
    h1: 'AI Agent Optimization: Prepare Your Website for the Era of Autonomous Browsing Bots',
    heroBody:
      'Autonomous AI agents now browse, compare, and buy on behalf of humans. MyAibo makes your site legible and actionable to them — from MCP server setup to structured data agents can traverse unassisted.',
    primaryCta: 'Request an Agentic Web Readiness Assessment',
    statBadge: '18–24 month first-mover window before agent-readiness becomes table stakes',
    aeoBox:
      "MyAibo's practice covers MCP server setup, structured data for machine traversal, an API-accessible data layer, and agentic search engine marketing that positions your brand as the preferred source for AI agents in your category.",
    deepDive: {
      question: 'Is Your Website Optimized for the Buyer Who Never Visits — Because Their AI Agent Is Visiting Instead?',
      framing:
        'Procurement and vendor research are increasingly run by agents that extract structured data and cross-reference sources. Sites that require human interpretation get filtered out silently.',
      pillars: [
        {
          title: 'MCP Server Setup & Agentic Data Access Architecture',
          technical:
            'We deploy MCP-compatible servers exposing your catalog, pricing, and documentation to authorized agents, with tool schemas, authentication, and rate limiting, plus ai-plugin.json manifests.',
          human:
            'Positions you as a machine-readable vendor, reducing misrepresentation in agent-generated summaries.',
        },
        {
          title: 'Structured Data Optimization for Machine Traversal',
          technical:
            'We audit semantic HTML5, ARIA landmarks, and link descriptiveness, and move critical data out of images or JS-rendered elements agents may not execute.',
          human:
            'Also lifts accessibility scores, Core Web Vitals, and conversion — as a byproduct.',
        },
        {
          title: 'Agentic Search Engine Marketing (ASEM) Strategy',
          technical:
            'We build machine-readable comparison pages and capability documentation for agent extraction, and track emerging agent platforms (Perplexity Agents, OpenAI Operator, Google Agentspace).',
          human:
            'Being agent-ready now is a first-mover advantage that closes within 18–24 months.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Agentic Web Optimization Framework',
      phases: [
        { num: 1, name: 'Agentic Readiness Audit', timeframe: 'Week 1', body: 'Machine-traversal audit, MCP compatibility check, and agent-generated brand accuracy testing.' },
        { num: 2, name: 'Technical Architecture Design', timeframe: 'Weeks 2–3', body: 'Design MCP servers, expand structured data, and plan ASEM content.' },
        { num: 3, name: 'Infrastructure & Content Deployment', timeframe: 'Weeks 4–8', body: 'Implement MCP servers, deploy structured data, and publish ASEM content.' },
        { num: 4, name: 'Agent Visibility Monitoring', timeframe: 'Ongoing', body: 'Monthly accuracy testing and new agent-platform integration.' },
      ],
    },
    geography: {
      headline: 'Bengaluru-Based. Agentic-Web-Ready.',
      body: 'We track MCP and agent-framework developments as a primary research priority for SaaS and enterprise clients, NDA-protected.',
      finalCta: 'Book an Agentic SEO Strategy Workshop with MyAibo',
    },
    relatedServices: {
      note: 'Part of our SEO pillar. Connects directly to our LLM Optimization Company work under GEO — both are about machine-readability, at different layers (page-level agents here, model-level citation there).',
      links: [
        { pillar: 'geo', cluster: 'llmo-company', label: 'LLM Optimization Company' },
      ],
    },
    faq: [
      { q: "What's an MCP server and why does my website need one?", a: 'It’s a standardized way for AI agents to access your catalog, pricing, and documentation as structured data rather than scraping rendered pages — the same idea as an API, purpose-built for agent access.' },
      { q: "Is this relevant if we don't sell directly to consumers?", a: 'Yes — B2B procurement and research increasingly runs through agent-assisted workflows too, not just consumer shopping bots.' },
      { q: 'How urgent is this really?', a: 'We frame it as an 18–24 month first-mover window — early enough that most competitors haven’t started, which is exactly the advantage.' },
    ],
    targetKeywords: ['AI agent optimization', 'agentic search engine marketing', 'MCP server setup for SEO'],
    meta: {
      title: 'AI Agent Optimization & MCP Server Setup | MyAibo SEO',
      description: 'MyAibo prepares your website for autonomous AI agents — MCP servers, machine-traversal structured data, and agentic search engine marketing built for the agent era.',
    },
  },
  {
    pillar: 'seo',
    slug: 'community-ugc-search-amplification',
    pillarName: 'Search Engine Optimization',
    subLabel: 'Community & UGC Search Amplification',
    eyebrow: 'Search Engine Optimization · Community & UGC Amplification',
    h1: 'Reddit SEO Services and UGC Search Strategy: Dominate the Community-Led Search Results Your Buyers Actually Trust',
    heroBody:
      'Google and LLM citation preferences now elevate Reddit, Quora, G2, and niche forums above brand pages. MyAibo builds authentic UGC presence and Reddit SEO programs that position you favorably in the community content AI treats as high-trust evidence.',
    primaryCta: 'Request a Community Search Presence Audit',
    aeoBox:
      'MyAibo builds authentic community engagement, expert positioning, and UGC/review optimization across Reddit, Quora, and review platforms — the sources Google and LLMs now weight as high-trust co-citation, without synthetic or policy-violating tactics.',
    deepDive: {
      question: 'Why Are Reddit Threads and G2 Reviews Outranking Your $50,000 Landing Pages for Your Most Competitive Keywords?',
      framing:
        "Google's Helpful Content updates reward first-hand experience content over brand-produced pages. A Reddit thread with 47 practitioners will usually beat a vendor comparison page.",
      pillars: [
        {
          title: 'Reddit SEO & Community Authority Building',
          technical:
            'We identify relevant subreddits and high-traffic threads, then run an expert-positioning program of genuinely useful answers, original data, and AMAs — brand association as a byproduct, not the pitch.',
          human:
            'Ranking Reddit threads generate high-trust referral traffic for years and build outbound prospect trust.',
        },
        {
          title: 'User-Generated Content Optimization & Review Platform Architecture',
          technical:
            'We build review solicitation workflows tied to product milestones, AggregateRating/Review schema, and optimized G2, Capterra, and Trustpilot profiles, prioritized by which platforms feed AI Overview citations.',
          human:
            'Well-managed review presence is increasingly a prerequisite for AI citation and lowers buyer skepticism.',
        },
        {
          title: 'Community Content Intelligence & Competitive Share-of-Voice',
          technical:
            'We monitor Reddit, Quora, G2, and forums for brand and competitor mentions, with sentiment analysis and monthly share-of-voice reporting against your top 3 competitors.',
          human:
            'Gives product and marketing teams a real-time signal feed and surfaces competitor vulnerabilities.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Community-Led SEO Framework',
      phases: [
        { num: 1, name: 'Community Landscape Audit', timeframe: 'Week 1', body: 'Map top platforms, high-traffic threads, and current brand sentiment vs. competitors.' },
        { num: 2, name: 'Platform Strategy & Content Architecture', timeframe: 'Weeks 2–3', body: 'Plan subreddit engagement, review optimization, and UGC workflows.' },
        { num: 3, name: 'Program Launch & Content Execution', timeframe: 'Weeks 4–8', body: 'Launch engagement, review solicitation, and profile optimization.' },
        { num: 4, name: 'Share-of-Voice Monitoring & Program Scaling', timeframe: 'Ongoing', body: 'Monthly reporting and new-platform evaluation.' },
      ],
    },
    geography: {
      headline: 'Community Intelligence Operated from Bengaluru. Brand Trust Built Globally.',
      body: 'We monitor and engage global communities across time zones, building programs that hold up to both platform scrutiny and buyer trust.',
      finalCta: 'Book a Community-Led Search Strategy Session',
    },
    targetKeywords: ['UGC SEO strategy', 'community led search marketing', 'Reddit SEO services', 'user generated content optimization'],
    meta: {
      title: 'Reddit SEO & UGC Search Amplification | MyAibo SEO',
      description: 'MyAibo builds authentic Reddit, Quora, and review-platform presence — the community content Google and LLMs weight as high-trust co-citation.',
    },
  },

  // ─────────────────────── Content Marketing (2) ───────────────────────
  {
    pillar: 'content-marketing',
    slug: 'data-driven-inbound-original-research',
    pillarName: 'Content Marketing',
    subLabel: 'Data-Driven Inbound & Original Research',
    eyebrow: 'Content Marketing · E-E-A-T & Original Research Strategy',
    h1: 'High E-E-A-T Content Creation That Earns AI Citations and Converts B2B Buyers',
    heroBody:
      "MyAibo is a data-driven B2B content agency building original research, primary data studies, and expert-attributed content — the formats Google's E-E-A-T framework and LLM citation engines favor. We build the data that makes your brand the primary source AI cites.",
    primaryCta: 'Request a Content Authority Audit',
    statBadge: 'One well-executed report can drive 12–24 months of inbound links, media citations, and AI references',
    aeoBox:
      'MyAibo builds content around original data, first-hand expertise, and AI-summarization-ready structure — a durable data-asset program rather than a publishing cadence, each asset built to serve as a primary reference for 12–36 months.',
    deepDive: {
      question: "Why Is Your Content Team Publishing Weekly But Your Brand Isn't Getting Cited by a Single AI Answer Engine?",
      framing:
        "AI systems don't cite the tenth article repeating the same stats — they cite whoever produced the original data or has demonstrable expertise.",
      pillars: [
        {
          title: 'Original Research & Proprietary Data Asset Development',
          technical:
            'We run annual surveys, product-usage studies, and benchmark reports with documented methodology, interactive visualization, and citation schema — managing the full production process end to end.',
          human:
            'One well-executed report can drive 12–24 months of inbound links, media citations, and AI references.',
        },
        {
          title: 'Expert Positioning & E-E-A-T Signal Architecture',
          technical:
            'We build verified author schema, editorial policy documentation, expert review workflows, and systematic third-party citation building.',
          human:
            'Buyers now check author credentials before trusting content — strong E-E-A-T shortens buying cycles.',
        },
        {
          title: 'AI Summarization-Optimized Content Architecture',
          technical:
            'We restructure priority content into 40–60 word answer blocks, definition blocks, in-text citations, and labeled summary tables.',
          human:
            'The same structural clarity that helps AI extraction also improves human reading metrics.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Content Authority Framework',
      phases: [
        { num: 1, name: 'Content Authority Audit & Research Strategy Design', timeframe: 'Weeks 1–2', body: 'E-E-A-T audit, AI citation readiness check, and research opportunity identification.' },
        { num: 2, name: 'Research Execution & Asset Production', timeframe: 'Weeks 3–8', body: 'Survey design, data collection, analysis, and report production.' },
        { num: 3, name: 'Distribution & Citation Building', timeframe: 'Weeks 8–12', body: 'Distribute across media, partners, and social; pursue journalist/analyst citation.' },
        { num: 4, name: 'Content Performance & Citation Monitoring', timeframe: 'Ongoing', body: 'Monthly link/citation tracking and quarterly refresh.' },
      ],
    },
    geography: {
      headline: 'Original Research Produced in Bengaluru. Cited Globally.',
      body: 'Our content team pairs data science with B2B content expertise, delivering research assets rigorous enough for citation by AI systems and industry media, under NDA.',
      finalCta: 'Book a Data-Driven Content Strategy Workshop with MyAibo',
    },
    relatedServices: {
      note: 'Part of our Content Marketing pillar. Feeds directly into Multi-Channel B2B SaaS Growth Loops — original research is the highest-leverage asset type for the SEO-content-community loop.',
      links: [
        { pillar: 'content-marketing', cluster: 'multi-channel-b2b-saas-growth-loops', label: 'Multi-Channel B2B SaaS Growth Loops' },
      ],
    },
    faq: [
      { q: 'Do we need to run our own survey, or can you use existing data?', a: 'We can build from product-usage data you already have, but a dedicated survey or benchmark study is generally what earns the strongest, most citable original stat.' },
      { q: 'How long does one research asset take start to finish?', a: 'Roughly 8 weeks from strategy through production (weeks 1–8 in our framework), with distribution and citation-building continuing for months after.' },
      { q: "What's the actual payoff period on one report?", a: 'We see original research assets keep driving inbound links, media citations, and AI references for 12–24 months after publication.' },
    ],
    targetKeywords: ['high E-E-A-T content creation', 'data-driven B2B content agency', 'content optimized for AI summarization'],
    meta: {
      title: 'Data-Driven Inbound & Original Research | MyAibo Content',
      description: 'MyAibo builds original research, primary data studies, and E-E-A-T-optimized content — the formats AI answer engines actually cite.',
    },
  },
  {
    pillar: 'content-marketing',
    slug: 'multi-channel-b2b-saas-growth-loops',
    pillarName: 'Content Marketing',
    subLabel: 'Multi-Channel B2B SaaS Growth Loops',
    eyebrow: 'Content Marketing · B2B SaaS Growth Systems',
    h1: 'B2B SaaS Growth Strategy: Build Self-Reinforcing Product-Led Content Marketing Loops That Compound',
    heroBody:
      'MyAibo engineers SaaS growth loops — content, distribution, SEO, and product touchpoints that compound acquisition rather than scaling linearly with spend.',
    primaryCta: 'Map Your SaaS Growth Loop Architecture',
    statBadge: 'Breaks the structurally-rising-CAC pattern of linear marketing',
    aeoBox:
      'MyAibo designs closed-loop growth systems where content drives trial, usage generates proof, proof drives distribution, and distribution feeds back into content — mapping the loop architecture for your category and building its self-sustaining infrastructure.',
    deepDive: {
      question: 'Why Are Your CAC Numbers Rising Every Quarter While Your Content and Paid Teams Are Both Working Harder?',
      framing:
        'Linear marketing has structurally rising CAC. Growth loops break that model — each cycle makes the next one cheaper.',
      pillars: [
        {
          title: 'Product-Led Content Marketing Loop Architecture',
          technical:
            'We map organic sharing moments (screenshots, embeds, outputs) and build case-study templates, sharing mechanics, and documentation-as-SEO programs around them.',
          human:
            "Product-influenced content carries social proof brand content can't match, lifting organic trial conversion.",
        },
        {
          title: 'Multi-Channel Distribution Architecture & Velocity Engineering',
          technical:
            'We build newsletter, LinkedIn, podcast, and co-marketing distribution, tied to central performance tracking for continuous reallocation.',
          human:
            'Reaching multiple buyer-committee members through different channels drives more pipeline than single-channel content.',
        },
        {
          title: 'SEO-Content-Community Compounding Loop',
          technical:
            'We design research for link generation, community programs for UGC, and SEO infrastructure that lets authority accumulate cycle over cycle.',
          human:
            'Delivers year-over-year gains in organic efficiency without proportional budget increases.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase SaaS Velocity Engine Build',
      phases: [
        { num: 1, name: 'Loop Architecture Mapping', timeframe: 'Weeks 1–2', body: 'Audit channels, identify loop opportunities, and design the velocity blueprint.' },
        { num: 2, name: 'Infrastructure Build', timeframe: 'Weeks 3–6', body: 'Set up distribution channels, templates, and attribution tracking.' },
        { num: 3, name: 'Loop Activation', timeframe: 'Weeks 7–10', body: 'Launch content, seed community, and measure the first cycle.' },
        { num: 4, name: 'Loop Optimization & Compounding', timeframe: 'Ongoing', body: 'Monthly performance reporting and new loop activation.' },
      ],
    },
    geography: {
      headline: 'SaaS Growth Systems Built in Bengaluru. Compounding Everywhere.',
      body: 'We combine content strategy, technical SEO, and marketing automation for Series A–C SaaS companies under NDA.',
      finalCta: 'Book a SaaS Velocity Engine Design Workshop',
    },
    relatedServices: {
      note: 'Part of our Content Marketing pillar. Built on the assets Data-Driven Inbound & Original Research produces — original research is one of the strongest inputs into the SEO-content-community loop.',
      links: [
        { pillar: 'content-marketing', cluster: 'data-driven-inbound-original-research', label: 'Data-Driven Inbound & Original Research' },
      ],
    },
    faq: [
      { q: 'What exactly is a "growth loop" as opposed to a funnel?', a: 'A funnel ends; a loop feeds its own output back in as new input — content drives trial, usage generates proof, proof drives distribution, and distribution feeds back into content.' },
      { q: 'Is this only for product-led SaaS companies?', a: 'The product-led loop specifically needs a product with shareable outputs, but the multi-channel distribution and SEO-content-community loops apply more broadly across B2B.' },
      { q: 'How long until a loop is actually "compounding" on its own?', a: 'Loop activation (weeks 7–10) is the first measured cycle; the compounding effect — each cycle cheaper than the last — is what the ongoing optimization phase is built to track and reinforce.' },
    ],
    targetKeywords: ['B2B SaaS growth strategy', 'product-led content marketing loops', 'SaaS velocity engine'],
    meta: {
      title: 'B2B SaaS Growth Loops & Multi-Channel Content | MyAibo',
      description: 'MyAibo engineers product-led SaaS growth loops — content, distribution, SEO, and community systems that compound instead of scaling linearly with spend.',
    },
  },

  // ─────────────────────── AI Automation (3) ───────────────────────
  {
    pillar: 'ai-automations',
    slug: 'aiaa-operational-auditing',
    pillarName: 'AI Automation',
    subLabel: 'AIAA Operational Auditing',
    eyebrow: 'AI Automation · Operations Audit & Workflow Intelligence',
    h1: 'AI Automation Agency Solutions: Audit Your Operations Before Automating the Wrong Workflows',
    heroBody:
      "Most automation initiatives fail because the workflow underneath is broken. MyAibo's AIAA audit maps your process landscape and designs the automation architecture before any code is written.",
    primaryCta: 'Request an AIAA Operations Audit',
    statBadge: 'Teams often discover 30–40% of "requires judgment" steps are actually rule-based and fully automatable',
    aeoBox:
      "MyAibo's AIAA audit covers process mining, task complexity classification, integration mapping, and automation ROI projection — producing a prioritized roadmap with a business case per target, addressing broken workflows before they're automated.",
    deepDive: {
      question: 'Why Did Your Last Automation Initiative Deliver Half the Promised Efficiency Gains?',
      framing:
        'Automation failures trace to automating the process as it exists rather than as it should exist. Fix the workflow first; automation multiplies whatever it wraps.',
      pillars: [
        {
          title: 'Process Mining & Workflow Intelligence Architecture',
          technical:
            'We analyze event logs from your systems, build a task taxonomy by decision logic and exception rate, and map where human judgment is genuinely required.',
          human:
            'Teams often discover 30–40% of "requires judgment" steps are actually rule-based and fully automatable.',
        },
        {
          title: 'Automation Target Prioritization & ROI Projection',
          technical:
            'We score every candidate on feasibility, business impact, and strategic priority, producing a sequenced roadmap with documented business cases.',
          human:
            'Replaces enthusiasm-driven wishlists with board-ready, data-driven investment cases.',
        },
        {
          title: 'Integration Architecture Assessment & Pre-Build Technical Design',
          technical:
            'We map every system touching each automation target — data quality, API availability, permissions — into a pre-build spec any team can execute against.',
          human:
            'Eliminates the most common source of build-phase overruns and surprises.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase AIAA Operations Audit',
      phases: [
        { num: 1, name: 'Workflow Discovery & Event Log Analysis', timeframe: 'Weeks 1–2', body: 'Stakeholder interviews, event log extraction, and initial workflow mapping.' },
        { num: 2, name: 'Process Mining & Complexity Classification', timeframe: 'Weeks 3–4', body: 'Task taxonomy, decision logic documentation, and dependency mapping.' },
        { num: 3, name: 'ROI Scoring & Roadmap Production', timeframe: 'Week 5', body: 'Score candidates and draft specs for the top 3 targets.' },
        { num: 4, name: 'Roadmap Presentation & Implementation Transition', timeframe: 'Week 6', body: 'Present the roadmap and hand off to implementation, internal or MyAibo.' },
      ],
    },
    geography: {
      headline: 'Automation Intelligence from Bengaluru. Implementation Certainty Delivered.',
      body: 'We combine operations consulting with technical implementation, so audit findings are immediately actionable, under NDA globally.',
      finalCta: 'Book Your AIAA Operations Audit with MyAibo',
    },
    relatedServices: {
      note: 'Part of our AI Automations pillar. Feeds directly into Agentic Workflow & Multi-Agent Orchestration and Production-Grade n8n Automation — this audit is the recommended first step before either build path.',
      links: [
        { pillar: 'ai-automations', cluster: 'agentic-workflow-consulting', label: 'Agentic Workflow & Multi-Agent Orchestration' },
        { pillar: 'ai-automations', cluster: 'n8n-automation-services', label: 'Production-Grade n8n Automation' },
      ],
    },
    faq: [
      { q: 'Do we need this audit if we already know what we want automated?', a: 'It’s worth doing anyway — the audit consistently surfaces that a meaningful share of "requires judgment" steps are actually rule-based, meaning the target list itself often changes.' },
      { q: 'How long does the audit take?', a: 'Six weeks end to end, from workflow discovery through roadmap handoff, per our framework above.' },
      { q: 'What do we get at the end of it?', a: 'A scored, prioritized roadmap with documented business cases for the top automation targets — a board-ready investment case, not just a list of ideas.' },
    ],
    targetKeywords: ['AI Automation Agency solutions', 'AIAA operations audit', 'corporate workflow optimization'],
    meta: {
      title: 'AI Automation Agency Operations Audit | MyAibo',
      description: 'MyAibo audits your operations before automating them — process mining, ROI scoring, and pre-build specs that turn automation enthusiasm into business cases.',
    },
  },
  {
    pillar: 'ai-automations',
    slug: 'agentic-workflow-consulting',
    pillarName: 'AI Automation',
    subLabel: 'Agentic Workflow & Multi-Agent Orchestration',
    eyebrow: 'AI Automation · Agentic Workflow Architecture',
    h1: 'Multi-Agent Workflow Architecture: Move from Sequential Automation to Autonomous Business Operations',
    heroBody:
      'MyAibo designs multi-agent systems with CrewAI, LangChain, LangGraph, and custom frameworks — autonomous operations that plan, delegate, execute, and verify without sequential handoffs.',
    primaryCta: 'Request an Agentic Architecture Consultation',
    statBadge: 'Well-architected systems turn hours-long analyst workflows into 45-minute autonomous runs',
    aeoBox:
      'MyAibo builds production multi-agent architectures across CrewAI, LangGraph, AutoGen, and LangChain, addressing loop completion, hallucination propagation, tool-call failures, and cost runaway through evaluation and monitoring infrastructure built into every deployment.',
    deepDive: {
      question: "Why Are Your LLM Integrations Handling Isolated Tasks While Your Competitors' Agentic Systems Are Running Entire Operations?",
      framing:
        'The gap between a chatbot and autonomous operations is architectural, not technological — the barrier is expertise to architect and safely deploy agents at production scale.',
      pillars: [
        {
          title: 'Multi-Agent System Architecture & Framework Selection',
          technical:
            'We design agent role taxonomy, supervisor coordination, memory architecture, and tool integration, choosing frameworks by workflow fit rather than preference.',
          human:
            'Well-architected systems turn hours-long analyst workflows into 45-minute autonomous runs.',
        },
        {
          title: 'Production Safeguards: Evaluation, Monitoring & Cost Control',
          technical:
            'We add LLM-as-judge evaluation, circuit breakers, per-run cost caps, and human-in-the-loop checkpoints for high-stakes branches.',
          human:
            'Systems built with safeguards from day one reach stable operation in the first deployment cycle instead of three months of firefighting.',
        },
        {
          title: 'Agentic Workflow Integration with Enterprise Systems',
          technical:
            'We integrate agents with CRMs, project tools, Slack/Teams, and data warehouses, including auth, rate limiting, and audit logging, plus MCP servers where needed.',
          human:
            'Agents that read and write to real work systems deliver impact in days, not months.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Agentic System Deployment',
      phases: [
        { num: 1, name: 'Workflow Analysis & Agent Architecture Design', timeframe: 'Weeks 1–2', body: 'Select the target workflow, design role taxonomy, and select a framework.' },
        { num: 2, name: 'Prototype Build & Evaluation Framework Setup', timeframe: 'Weeks 3–5', body: 'Build core agents and evaluation/cost-monitoring infrastructure.' },
        { num: 3, name: 'Production Build & Integration', timeframe: 'Weeks 6–9', body: 'Full implementation, enterprise integration, and benchmarking.' },
        { num: 4, name: 'Production Monitoring & Capability Expansion', timeframe: 'Ongoing', body: 'Weekly monitoring and new workflow integration.' },
      ],
    },
    geography: {
      headline: 'Agentic Systems Built in Bengaluru. Running in Your Production Environment.',
      body: 'We maintain hands-on expertise across CrewAI, LangGraph, AutoGen, and LangChain, deploying under NDA with full client code ownership.',
      finalCta: 'Book a Multi-Agent Architecture Workshop with MyAibo',
    },
    relatedServices: {
      note: 'Part of our AI Automations pillar. Best preceded by AIAA Operational Auditing to confirm which workflows genuinely warrant multi-agent complexity versus simpler automation.',
      links: [
        { pillar: 'ai-automations', cluster: 'aiaa-operational-auditing', label: 'AIAA Operational Auditing' },
      ],
    },
    faq: [
      { q: 'How is this different from a single AI chatbot or assistant?', a: 'A chatbot handles one isolated task per interaction; multi-agent systems plan, delegate across specialized agents, execute, and verify — running an entire operation rather than answering one question at a time.' },
      { q: 'What stops these agents from making costly mistakes autonomously?', a: 'Production safeguards built in from day one — LLM-as-judge evaluation, circuit breakers, cost caps, and checkpoints — specifically to reach stable operation without a firefighting period.' },
      { q: 'Which frameworks do you build on?', a: 'CrewAI, LangChain, LangGraph, and custom frameworks, selected based on the specific orchestration and memory requirements of your workflow.' },
    ],
    targetKeywords: ['agentic AI solutions for enterprise', 'multi-agent workflows CrewAI LangChain', 'autonomous business operations'],
    meta: {
      title: 'Multi-Agent Workflow Consulting | MyAibo AI Automation',
      description: 'MyAibo designs production multi-agent systems with CrewAI, LangGraph, and LangChain — safeguards, evaluation, and enterprise integration built in from day one.',
    },
  },
  {
    pillar: 'ai-automations',
    slug: 'n8n-automation-services',
    pillarName: 'AI Automation',
    subLabel: 'Production-Grade n8n Automation',
    eyebrow: 'AI Automation · Open-Source Enterprise Automation · n8n',
    h1: 'n8n Workflow Developers Who Build Self-Hosted, Production-Grade Automation Infrastructure',
    heroBody:
      "MyAibo's n8n engineers deploy self-hosted, production-grade automation — the cost efficiency and data sovereignty of open source without the operational overhead of running it in-house.",
    primaryCta: 'Book an n8n Architecture Discovery Session',
    statBadge: 'Teams typically retire 30–50% of manual data entry and classification within 90 days',
    aeoBox:
      'MyAibo designs multi-trigger n8n workflows, builds custom nodes, deploys self-hosted infrastructure with queue mode and horizontal scaling, and integrates AI/LLM capability via HTTP, LangChain, and custom code nodes.',
    deepDive: {
      question: 'Why Is Your Self-Hosted n8n Instance Running Critical Business Workflows Without Proper Error Handling, Monitoring, or Scaling Architecture?',
      framing:
        'n8n\'s accessibility means workflows are often built without production-grade error handling or scaling — the gap between "n8n can do this" and "doing it reliably" is where MyAibo operates.',
      pillars: [
        {
          title: 'Self-Hosted n8n Infrastructure & Production Deployment',
          technical:
            'We deploy on Docker or Kubernetes with PostgreSQL, Redis queue mode, worker separation, SSL reverse proxy, and automated backups.',
          human:
            'Eliminates the execution failures and downtime that ad-hoc n8n deployments cause.',
        },
        {
          title: 'Complex Multi-System Workflow Architecture & Custom Node Development',
          technical:
            'We build custom TypeScript nodes, sub-workflows, parallel branches, and conditional routing, plus dedicated error-handling workflows.',
          human:
            'Removes integration blockers and cuts maintenance overhead through reusable modules.',
        },
        {
          title: 'AI-Augmented n8n Workflows & LLM Integration',
          technical:
            'We add LLM-powered extraction and routing, AI Agent nodes, and vector-store RAG integration, with cost monitoring and fallback handling.',
          human:
            'Teams typically retire 30–50% of manual data entry and classification within 90 days.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase n8n Deployment Framework',
      phases: [
        { num: 1, name: 'Infrastructure Assessment & Architecture Design', timeframe: 'Week 1', body: 'Audit or scope requirements and design infrastructure architecture.' },
        { num: 2, name: 'Production Infrastructure Deployment', timeframe: 'Weeks 2–3', body: 'Deploy production infrastructure and migrate existing workflows.' },
        { num: 3, name: 'Workflow Development & Integration Build', timeframe: 'Weeks 4–8', body: 'Build custom nodes, core workflows, and AI integrations.' },
        { num: 4, name: 'Handover, Documentation & Ongoing Support', timeframe: 'Ongoing', body: 'Deliver documentation, train the team, and offer an optional support retainer.' },
      ],
    },
    geography: {
      headline: 'n8n Engineers in Bengaluru. Your Automation Infrastructure Running 24/7.',
      body: 'We bring production engineering standards to open-source automation, with full source code ownership transferred to clients under NDA.',
      finalCta: "Hire MyAibo's n8n Workflow Developers — Book a Discovery Session",
    },
    relatedServices: {
      note: "Part of our AI Automations pillar. Often follows AIAA Operational Auditing; a lighter-weight alternative to full Agentic Workflow & Multi-Agent Orchestration for workflows that don't need multi-agent complexity.",
      links: [
        { pillar: 'ai-automations', cluster: 'aiaa-operational-auditing', label: 'AIAA Operational Auditing' },
        { pillar: 'ai-automations', cluster: 'agentic-workflow-consulting', label: 'Agentic Workflow & Multi-Agent Orchestration' },
      ],
    },
    faq: [
      { q: 'We already have n8n running — why would we need this?', a: 'Most self-hosted n8n instances are built without production-grade error handling, monitoring, or scaling — exactly the gap this service addresses, often without needing to rebuild from scratch.' },
      { q: 'Is self-hosted actually cheaper than a managed automation platform?', a: 'Self-hosting removes per-execution or per-seat platform fees and keeps your data under your own control — the tradeoff is needing the production infrastructure (queue mode, worker separation, backups) done properly, which is what we deploy.' },
      { q: 'Can this include AI/LLM features, or is it just traditional automation?', a: 'Both — AI Agent nodes, LLM-powered extraction and routing, and RAG integration are a standard part of the build where the workflow calls for it.' },
    ],
    targetKeywords: ['n8n workflow developers', 'hire self-hosted n8n consultants', 'open-source enterprise automation'],
    meta: {
      title: 'n8n Workflow Developers & Self-Hosted Automation | MyAibo',
      description: 'MyAibo builds production-grade, self-hosted n8n automation — Docker/Kubernetes deployments, custom nodes, and AI-augmented workflows with full client IP ownership.',
    },
  },

  // ─────────────────── Full Stack Development (4) ───────────────────
  {
    pillar: 'full-stack',
    slug: 'ai-native-generative-ui-development',
    pillarName: 'Full Stack Development',
    subLabel: 'AI-Native & Generative UI Development',
    eyebrow: 'Full Stack Development · AI-Native Engineering',
    h1: 'AI-Native Software Engineers Who Build Next.js Applications With Generative UI From Day One',
    heroBody:
      'MyAibo builds Next.js applications where AI is architected in from the start — generative UI, streaming responses, and LLM integration using the Vercel AI SDK, LangChain, and custom orchestration.',
    primaryCta: 'Start Your AI Application Build',
    statBadge: 'Evaluation, fallback, and cost monitoring are designed in from sprint zero on every build',
    aeoBox:
      'MyAibo builds AI-native apps with Next.js App Router, Vercel AI SDK streaming, generative UI (streamUI(), createStreamableUI()), and production AI feature integration — with evaluation, fallback, and cost monitoring designed in from sprint zero.',
    deepDive: {
      question: 'Why Are AI Features in Your Current Application Performing Like Afterthoughts — Because They Were?',
      framing:
        'Retrofitted AI produces predictable problems: blocked rendering, disconnected auth/data layers, scattered prompt management, and zero cost observability. AI-native apps avoid these from first principles.',
      pillars: [
        {
          title: 'Next.js AI Application Architecture & Vercel AI SDK Integration',
          technical:
            'We use App Router with Server Components, Vercel AI SDK streaming and structured output (Zod-validated), multi-provider routing, and evaluation pipelines on every AI feature.',
          human:
            'Streaming architecture makes AI features feel immediate, directly improving engagement and retention.',
        },
        {
          title: 'Generative UI Component Development',
          technical:
            'We use createStreamableUI() / streamUI() so the model selects and streams the right component — table, chart, form — directly to the client.',
          human:
            'Delivers adaptive experiences that would otherwise take months to build, with higher task completion for open-ended workflows.',
        },
        {
          title: 'AI Feature Observability, Evaluation & Cost Optimization',
          technical:
            'We add LLM tracing, token/latency monitoring, evaluation pipelines, and prompt regression testing as standard on every build.',
          human:
            'Gives teams the data to catch underperforming features and quality regressions in the same sprint.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase AI Application Development Process',
      phases: [
        { num: 1, name: 'Architecture Design & AI Feature Specification', timeframe: 'Weeks 1–2', body: 'Gather feature requirements and define evaluation criteria.' },
        { num: 2, name: 'Core Application & AI Integration Build', timeframe: 'Weeks 3–8', body: 'Build the scaffold, core AI features, and generative UI components.' },
        { num: 3, name: 'Observability, Evaluation & Production Readiness', timeframe: 'Weeks 9–10', body: 'Deploy tracing, evaluation, and cost monitoring; test performance.' },
        { num: 4, name: 'Launch, Monitoring & Feature Iteration', timeframe: 'Ongoing', body: 'Deploy, report, and iterate based on evaluation data.' },
      ],
    },
    geography: {
      headline: 'AI-Native Engineers in Bengaluru. Production Applications Everywhere.',
      body: 'We function as a co-founder-level engineering partner, with the full-stack depth and AI specialization to ship production-ready features, under NDA.',
      finalCta: 'Start Your AI Application Build with MyAibo',
    },
    relatedServices: {
      note: 'Part of our Full Stack pillar. Pairs with Enterprise RAG & Vector Database when the generative UI needs to draw on your private knowledge base rather than general model knowledge.',
      links: [
        { pillar: 'full-stack', cluster: 'enterprise-rag-vector-database-architecture', label: 'Enterprise RAG & Vector Database' },
      ],
    },
    faq: [
      { q: 'What is "generative UI," in plain terms?', a: 'Instead of the model only returning text, it can select and stream an actual UI component — a table, chart, or form — matched to what the user asked for, rendered directly in your app.' },
      { q: 'Do we need to already be on Next.js?', a: 'This service is specifically built around the Next.js App Router and Vercel AI SDK; a different stack would need a different architecture approach.' },
      { q: 'How do you catch it when an AI feature starts underperforming?', a: 'Evaluation pipelines and prompt regression testing are standard on every build, not an afterthought — issues surface through monitoring in the same sprint rather than being discovered by users first.' },
    ],
    targetKeywords: ['AI native software engineers', 'generative UI component development', 'Next.js AI application build'],
    meta: {
      title: 'AI-Native & Generative UI Development | MyAibo Full Stack',
      description: 'MyAibo builds Next.js AI-native applications with generative UI, streaming Vercel AI SDK integration, and evaluation/cost observability from sprint zero.',
    },
  },
  {
    pillar: 'full-stack',
    slug: 'enterprise-rag-vector-database-architecture',
    pillarName: 'Full Stack Development',
    subLabel: 'Enterprise RAG & Vector Database',
    eyebrow: 'Full Stack Development · RAG Engineering & Vector Database Infrastructure',
    h1: 'Custom RAG Pipeline Development: Secure Enterprise LLM Access to Your Private Knowledge Base',
    heroBody:
      'MyAibo engineers production RAG pipelines giving enterprise LLM apps accurate, secure access to private knowledge — document ingestion, chunking, vector database, retrieval, and citation-grounded generation.',
    primaryCta: 'Request a RAG Architecture Assessment',
    statBadge: 'Hybrid retrieval typically lifts accuracy 15–25% over pure vector search',
    aeoBox:
      'MyAibo builds end-to-end RAG systems: ingestion, chunking strategy, embedding selection, vector database implementation (Pinecone, Weaviate, Qdrant, pgvector), hybrid dense+sparse retrieval, and permission-enforced retrieval — fixing the common failure of good recall but poor generation accuracy.',
    deepDive: {
      question: 'Why Is Your RAG System Retrieving the Right Documents but Still Generating Incorrect Answers?',
      framing:
        'RAG failure is almost always a retrieval quality problem — chunk boundaries, embedding fit, and re-ranking do more for accuracy than a bigger model.',
      pillars: [
        {
          title: 'Document Ingestion, Chunking Strategy & Embedding Pipeline',
          technical:
            'We build layout-aware ingestion for PDF/DOCX/HTML/Markdown, OCR for scans, and chunking (fixed, semantic, or hierarchical) matched to document type, with benchmarked embedding model selection.',
          human:
            'Getting these decisions right early avoids expensive re-embedding of the entire corpus later.',
        },
        {
          title: 'Vector Database Implementation & Hybrid Retrieval Architecture',
          technical:
            'We select the database by deployment need (Pinecone, Qdrant, pgvector, Weaviate) and implement hybrid dense+BM25 retrieval with RRF merging and re-ranking.',
          human:
            'Hybrid retrieval typically lifts accuracy 15–25% over pure vector search — decisive for legal, compliance, or support use cases.',
        },
        {
          title: 'Secure Enterprise Access Control & Compliance Architecture',
          technical:
            'We enforce metadata-based permission filtering at the retrieval layer, VPC deployment, audit logging, and PII detection/redaction in ingestion.',
          human:
            'Avoids the access-control failures that most enterprises discover through an incident rather than an audit.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase RAG Pipeline Development',
      phases: [
        { num: 1, name: 'Knowledge Base Audit & Architecture Design', timeframe: 'Weeks 1–2', body: 'Inventory the corpus, define query patterns, and select the vector database.' },
        { num: 2, name: 'Ingestion Pipeline & Vector Database Build', timeframe: 'Weeks 3–5', body: 'Build ingestion, chunking, embedding, and indexing; benchmark retrieval.' },
        { num: 3, name: 'Retrieval Optimization & LLM Generation Layer', timeframe: 'Weeks 6–8', body: 'Implement hybrid retrieval, re-ranking, and citation-grounded generation.' },
        { num: 4, name: 'Production Deployment & Continuous Evaluation', timeframe: 'Ongoing', body: 'Deploy with monitoring and run monthly retrieval-quality evaluation.' },
      ],
    },
    geography: {
      headline: 'RAG Engineering from Bengaluru. Deployed in Your Security Perimeter.',
      body: 'We build production-grade, enterprise-security-compliant RAG systems, not demos, deploying within your infrastructure under NDA with a built-in evaluation harness.',
      finalCta: 'Book a RAG Architecture Assessment with MyAibo',
    },
    relatedServices: {
      note: 'Part of our Full Stack pillar. Often paired with AI Solutions Integrator (ASI) when the private knowledge base lives inside legacy CRM/ERP systems rather than a document store.',
      links: [
        { pillar: 'full-stack', cluster: 'ai-solutions-integrator-operations', label: 'AI Solutions Integrator (ASI)' },
      ],
    },
    faq: [
      { q: 'Why would our RAG system retrieve the right documents but still get the answer wrong?', a: 'Almost always a retrieval quality problem beneath the surface — chunk boundaries, embedding fit, or missing re-ranking — which is why those decisions get the most attention in our process, not model selection.' },
      { q: 'Which vector databases do you work with?', a: 'Pinecone, Weaviate, Qdrant, and pgvector are all supported — selection depends on your existing infrastructure and scale requirements.' },
      { q: 'How do you handle sensitive or access-restricted documents?', a: 'Metadata-based permission filtering, VPC deployment, audit logging, and PII detection are built into the access-control architecture from the start, not added after a compliance review.' },
    ],
    targetKeywords: ['custom RAG pipeline development', 'vector database implementation Pinecone', 'secure enterprise LLM access'],
    meta: {
      title: 'Enterprise RAG Pipelines & Vector Database | MyAibo Full Stack',
      description: 'MyAibo engineers production RAG pipelines — ingestion, hybrid retrieval, and permission-enforced generation on Pinecone, Qdrant, pgvector, or Weaviate.',
    },
  },
  {
    pillar: 'full-stack',
    slug: 'ai-solutions-integrator-operations',
    pillarName: 'Full Stack Development',
    subLabel: 'AI Solutions Integrator (ASI)',
    eyebrow: 'Full Stack Development · AI Solutions Integration',
    h1: 'Connect LLMs to Legacy CRMs and Enterprise Systems: AI Solutions Integrator (ASI) Services',
    heroBody:
      'MyAibo connects LLM capability to the legacy systems and databases where your business data actually lives — middleware, API layers, and transformation pipelines, without migrating your existing infrastructure.',
    primaryCta: 'Request an ASI Technical Stack Consultation',
    statBadge: 'Gets AI applications access to legacy data in weeks, not the years a full modernization would take',
    aeoBox:
      "MyAibo's ASI practice connects LLMs to Salesforce, HubSpot, SAP, Oracle, Dynamics, and legacy databases via REST/GraphQL middleware, CDC pipelines, and MCP servers — solving the freshness, permission, and rate-limiting issues that stall enterprise AI POCs.",
    deepDive: {
      question: 'Why Is Your LLM Application Generating Impressive Demos with Sample Data but Stalling on Production Integration with Your Actual Enterprise Systems?',
      framing:
        'The gap between demo and production is an integration problem, not an AI problem — legacy auth, opaque data models, and missing audit trails are solved integration challenges, not reasons to wait.',
      pillars: [
        {
          title: 'CRM & Enterprise Platform Integration Architecture',
          technical:
            'We integrate Salesforce, HubSpot, Dynamics, SAP, and Oracle with OAuth management, rate-limit handling, data transformation, and bidirectional sync.',
          human:
            'Enables AI assistants with full interaction history and executive dashboards with live narrative generation.',
        },
        {
          title: 'Legacy Database Connectors & Data Transformation Pipelines',
          technical:
            'We build JDBC/ODBC connectors, Airflow/dbt ETL, Debezium CDC, and semantic caching for high-frequency calls.',
          human:
            'Gets AI applications access to legacy data in weeks, not the years a full modernization would take.',
        },
        {
          title: 'MCP Server Implementation for Enterprise AI Agent Access',
          technical:
            'We build MCP servers exposing CRM, ERP, and document tools with authentication, permission scoping, and audit logging, connected to Claude, OpenAI Assistants, or custom agents.',
          human:
            'Positions you for agentic workflows 12–24 months out, when agents need to navigate enterprise systems autonomously.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase ASI Integration Deployment',
      phases: [
        { num: 1, name: 'System Inventory & Integration Architecture Design', timeframe: 'Weeks 1–2', body: 'Inventory systems and design the integration and permission architecture.' },
        { num: 2, name: 'Connector Development & Data Pipeline Build', timeframe: 'Weeks 3–6', body: 'Build connectors, transformation layers, and auth/rate-limit infrastructure.' },
        { num: 3, name: 'LLM Application Integration & Testing', timeframe: 'Weeks 7–9', body: 'Connect the application, test end-to-end, and benchmark performance.' },
        { num: 4, name: 'Production Deployment & Integration Maintenance', timeframe: 'Ongoing', body: 'Deploy with monitoring and run quarterly integration health audits.' },
      ],
    },
    geography: {
      headline: 'Enterprise AI Integration Built in Bengaluru. Running in Your Infrastructure.',
      body: 'We combine enterprise integration and AI architecture expertise, deploying within your security perimeter with full code ownership transferred, under NDA.',
      finalCta: 'Book an ASI Technical Stack Consultation with MyAibo',
    },
    relatedServices: {
      note: 'Part of our Full Stack pillar. Complements Enterprise RAG & Vector Database — ASI connects LLMs to structured systems of record, RAG connects them to unstructured knowledge.',
      links: [
        { pillar: 'full-stack', cluster: 'enterprise-rag-vector-database-architecture', label: 'Enterprise RAG & Vector Database' },
      ],
    },
    faq: [
      { q: 'Do we need to migrate off our legacy CRM/ERP for this to work?', a: 'No — that’s the specific point of ASI: connecting LLM capability to existing systems via middleware and transformation pipelines, without requiring migration.' },
      { q: 'How long does a typical integration take?', a: 'Weeks, not the years a full modernization would take — our framework runs system inventory through production deployment across roughly 9 weeks before ongoing maintenance.' },
      { q: 'Why build an MCP server specifically?', a: 'It positions your systems for agentic workflows 12–24 months out, when AI agents increasingly need to navigate enterprise systems autonomously rather than through one-off API calls.' },
    ],
    targetKeywords: ['AI solutions integration company', 'connect LLMs to legacy CRMs', 'ASI technical stack consulting'],
    meta: {
      title: 'AI Solutions Integrator (ASI) Operations | MyAibo Full Stack',
      description: 'MyAibo connects LLMs to Salesforce, SAP, Oracle, HubSpot, and legacy databases via middleware, CDC pipelines, and MCP servers — production integration, not demos.',
    },
  },
  {
    pillar: 'full-stack',
    slug: 'fractional-ai-engineering-cto',
    pillarName: 'Full Stack Development',
    subLabel: 'Fractional AI Engineering & CTO',
    eyebrow: 'Full Stack Development · Fractional Technical Leadership',
    h1: 'Fractional CTO for AI Startups: On-Demand Technical Leadership Without the Full-Time Hire',
    heroBody:
      'MyAibo provides fractional CTO and ML engineering leadership for AI startups that need senior architecture, hiring, and fundraising support — without the 12–18 month search and full-time cost of an executive hire.',
    primaryCta: 'Schedule a Fractional CTO Consultation',
    statBadge: 'Typically serves companies at $500K–$5M ARR',
    aeoBox:
      'MyAibo provides fractional CTO/ML leadership covering architecture design, hiring, due-diligence prep, model evaluation, and MLOps — addressing the leadership gap between founding team and full-time CTO, typically $500K–$5M ARR.',
    deepDive: {
      question: 'Why Are You Making $500,000 Architecture Decisions Without a Senior Technical Voice in the Room?',
      framing:
        'Full-time CTOs cost $250K–$400K fully loaded, but bad architecture decisions at the wrong stage cost far more — fractional engagement solves that asymmetry.',
      pillars: [
        {
          title: 'AI System Architecture & Technical Strategy',
          technical:
            'We lead AI stack selection, data architecture, MLOps, security architecture, and API design, with bi-weekly reviews and owned ADRs.',
          human:
            'Decisions made between $1M and $5M ARR typically set the engineering ceiling for the next two funding rounds.',
        },
        {
          title: 'Engineering Team Leadership & Hiring',
          technical:
            'We conduct technical interviews, set code review and sprint standards, and mentor engineers on AI-specific practice.',
          human:
            'One prevented bad senior hire typically pays for 12 months of the engagement.',
        },
        {
          title: 'Technical Due Diligence & Fundraising Preparation',
          technical:
            'We run a pre-diligence technical audit, produce investor-ready documentation, and join diligence calls directly.',
          human:
            'A credible technical voice in diligence closes rounds faster and from a stronger negotiating position.',
        },
      ],
    },
    blueprint: {
      title: 'Our 4-Phase Fractional CTO Engagement',
      phases: [
        { num: 1, name: 'Technical Audit & Leadership Onboarding', timeframe: 'Weeks 1–2', body: 'Full stack audit and identification of strategic priorities.' },
        { num: 2, name: 'Architecture & Process Stabilization', timeframe: 'Weeks 3–6', body: 'Resolve critical decisions and improve engineering process.' },
        { num: 3, name: 'Active Technical Leadership', timeframe: 'Ongoing Monthly', body: 'Bi-weekly reviews, mentoring, and fundraising prep as needed.' },
        { num: 4, name: 'Transition Planning', timeframe: 'When Required', body: 'Support the full-time CTO search and knowledge transfer.' },
      ],
    },
    geography: {
      headline: 'Senior AI Engineering Leadership from Bengaluru. Available on Your Schedule.',
      body: 'Our Bengaluru team delivers embedded technical leadership at a price point pre-Series B companies can sustain, working across time zones under strict NDA.',
      finalCta: "Book Your Fractional CTO Consultation with MyAibo's Engineering Team",
    },
    relatedServices: {
      note: 'Part of our Full Stack pillar. Often engaged alongside a specific build (e.g. AI-Native & Generative UI Development) when a startup needs both hands-on architecture leadership and an execution team.',
      links: [
        { pillar: 'full-stack', cluster: 'ai-native-generative-ui-development', label: 'AI-Native & Generative UI Development' },
      ],
    },
    faq: [
      { q: 'At what stage should a startup consider this instead of hiring a full-time CTO?', a: 'Typically $500K–$5M ARR — early enough that a full-time executive hire (a 12–18 month search, $250K–$400K fully loaded) isn’t yet the right tradeoff, but past the point where architecture decisions are low-stakes.' },
      { q: 'Does this replace our existing engineering team?', a: 'No — it adds senior leadership (architecture strategy, hiring standards, mentoring) above an existing team, and includes transition planning support if and when you’re ready for a full-time CTO.' },
      { q: 'Can this help specifically with fundraising?', a: 'Yes — technical due diligence prep and direct participation in diligence calls are a core part of the engagement, aimed at closing rounds faster and from a stronger position.' },
    ],
    targetKeywords: ['fractional CTO for AI startups', 'hire fractional machine learning engineer', 'on-demand technical leadership'],
    meta: {
      title: 'Fractional AI Engineering & CTO Services | MyAibo',
      description: 'MyAibo provides fractional CTO/ML leadership for AI startups — architecture, hiring, MLOps, and fundraising diligence without the full-time executive cost.',
    },
  },
];

// Fast lookup helpers
export function getClustersForPillar(pillarSlug) {
  return clusterPages.filter((c) => c.pillar === pillarSlug);
}

export function getCluster(pillarSlug, clusterSlug) {
  return clusterPages.find((c) => c.pillar === pillarSlug && c.slug === clusterSlug);
}
