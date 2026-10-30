// Case studies that ship with the site rather than living in the admin CMS.
// They are merged with the CMS list on /case-studies and served at
// /case-study/<id>, where the id doubles as the URL slug.
//
// scripts/prerender.js parses the `id:` lines below to prerender each page,
// so keep each one on its own line in the form  id: '<slug>',

export const STATIC_CASE_STUDIES = [
  {
    id: 'tms-software-seo-domain-authority',
    datePublished: '2026-09-30',
    client: 'Leading Transport Management System Software',
    title: 'Domain Authority Doubled in 9 Months',
    industry: 'Logistics SaaS',
    service: 'SEO & Digital PR',
    description:
      'Case study: how MyAibo doubled domain authority (7 to 14) for a leading transport management system platform and generated 74 organic leads and 10 SQLs in one quarter.',
    excerpt:
      'How a focused link-building and content programme doubled domain authority for a leading transport management system (TMS) platform, and turned organic search into real sales pipeline.',
    metrics: { domain_authority: '7 → 14', organic_search: '+391%', organic_leads: '74', SQLs: '10', timeframe: '9 months' },
    statsHeading: 'in 9 months.',
    stats: [
      { num: '7 → 14', label: 'Domain Authority', cap: 'January to September 2026, from off-page work alone' },
      { num: '+391%', label: 'organic search', cap: 'compared with Q2 2025' },
      { num: '74', label: 'organic leads', cap: 'generated in July to September 2026' },
      { num: '10', label: 'sales-qualified leads', cap: 'every one still in active conversation' },
    ],
    challenge: [
      'The platform had a strong product in a crowded category. Established TMS vendors carried backlink authority scores between 35 and 47 and owned the search results. This site started 2026 with a Domain Authority of 7 and a backlink authority score of 15.',
      'Our January 2026 technical audit set the baseline: a Site Health score of 65%, an AI visibility score of 84%, 126 linking root domains and 39 toxic or low-quality domains dragging the link profile down. Buyers searching for transport management software were finding everyone else first.',
    ],
    solutionLead:
      'We treated authority as the first problem to solve. Content and technical work would only pay off once search engines trusted the domain, so the programme ran in four parts.',
    steps: [
      { title: 'Clean the link profile', body: 'We audited every referring domain and disavowed 39 toxic or low-quality domains in January 2026, so new links would build on a clean base.' },
      { title: 'Earn editorial placements', body: 'We secured 11 guest-post placements in one quarter (10 sponsored, 1 earned) across enterprise technology, retail, trade and logistics publications. Each article covered a real operations problem, from returns and peak season to route optimisation, freight contracts and supply chain risk.' },
      { title: 'Publish consistently', body: 'We published 16 blogs between 2 July and 18 September 2026, the longest sustained publishing run of the programme. Two of them now anchor a new topic cluster around transport management systems.' },
      { title: 'Track technical health and AI visibility', body: 'We tracked Site Health and AI visibility against the January baseline, and lined up the technical fixes for the next phase, starting with mobile performance.' },
    ],
    funnel: {
      label: 'Organic funnel, July to September 2026',
      items: [
        { num: '74', label: 'organic leads' },
        { num: '13', label: 'sales meetings' },
        { num: '10', label: 'sales-qualified leads' },
        { num: '10', label: 'still active' },
      ],
    },
    result: [
      'Domain Authority doubled from 7 to 14 between January and September 2026. That gain came from off-page link building alone, before a single technical or on-page fix had shipped. Backlink authority rose from 15 to 22, and referring domains grew from 126 to 180.',
      'The authority turned into pipeline. In July to September 2026, organic search generated 74 leads. Thirteen became sales meetings, ten of those became sales-qualified leads, and all ten are still in active conversation.',
    ],
    checks: [
      'Site Health up from 65% to 71% since January 2026',
      'AI visibility score up from 84% to 92%',
      'Referring domains up from 126 to 180',
      'Organic search up 391% compared with Q2 2025',
    ],
    insight:
      'Authority came first and pipeline followed. Domain Authority doubled before any technical fix went live, so the next phase has room to grow: a TMS topic cluster with a pillar page, comparison content and FAQ schema, a second round of 11 higher-authority placements, and cleaned-up software directory listings.',
  },
  {
    id: 'consumer-healthcare-gamified-wound-care-app',
    datePublished: '2026-06-30',
    client: 'Leading Consumer Healthcare Brand',
    title: "A Gamified Kids' App Without an 18-Month ML Build",
    industry: 'Consumer Healthcare',
    service: 'Full Stack Development',
    description:
      'Case study: how MyAibo re-architected a gamified paediatric wound-care app for a leading consumer healthcare brand, avoiding 12 to 18 months of ML engineering with zero live AI calls.',
    excerpt:
      "How we redesigned a children's wound-care companion app so it could launch without custom computer vision or live AI calls, while keeping the full gamified experience.",
    metrics: { ML_work_avoided: '12–18 mo', story_templates: '350', live_AI_calls: '0' },
    statsHeading: 'at launch.',
    stats: [
      { num: '12–18', label: 'months of ML work avoided', cap: 'custom computer vision training and LLM fine-tuning removed' },
      { num: '350', label: 'story templates', cap: 'pre-authored and personalised for each child' },
      { num: '0', label: 'live AI calls', cap: 'every story is assembled by a rules engine' },
      { num: '7-day', label: 'healing journey', cap: 'the full gamification loop, kept end to end' },
    ],
    challenge: [
      'A leading consumer healthcare brand wanted to make childhood injuries less frightening, with a digital companion app that turns a scraped knee into a story and a healing journey.',
      'The original design relied on computer vision to read a photo of the wound and a large language model to write a story around it. That architecture needed 12 to 18 months of machine learning engineering and heavy medical-AI compliance work before the app could launch.',
    ],
    solutionLead: 'We kept the experience and replaced the expensive intelligence layer underneath it.',
    steps: [
      { title: 'Swap computer vision for visual matching', body: 'Instead of analysing a wound photo, the app shows a curated library of illustrated wound cards. The child or parent picks the closest match, which needs no model training and no image processing.' },
      { title: 'Replace live AI with a story engine', body: 'A rule-based engine personalises 350 pre-authored story templates using simple JSON rules. Each story feels tailored without a single live AI call.' },
      { title: 'Keep the game intact', body: 'The full 7-day gamified healing journey stayed in the product end to end, so the redesign cost the experience nothing.' },
      { title: 'Build on a proven stack', body: 'We delivered the app on React Native and Firebase, with Contentful for content, WebAR, Mixpanel analytics and a Node.js backend.' },
    ],
    stack: ['React Native', 'Firebase', 'Contentful', 'WebAR', 'Mixpanel', 'JSON rules', 'Node.js'],
    result: [
      'Build cost came down sharply because the project no longer needed custom computer vision training or LLM fine-tuning. The 12 to 18 months of machine learning work in the original plan came off the roadmap.',
      'Children still get a personalised story and the full 7-day healing journey. With 350 pre-authored templates and a rules engine doing the work, the app runs with zero live AI calls.',
    ],
    checks: [
      'No custom computer vision model to train or maintain',
      'No LLM fine-tuning and no live AI calls at runtime',
      '350 personalised story templates, managed as content',
      'The complete 7-day gamification loop preserved',
    ],
    insight:
      'An experience can feel intelligent without live AI behind every screen. Matching the architecture to what the product actually needed took a year or more of machine learning work off the critical path.',
  },
  {
    id: 'fmcg-nlp-social-listening-sentiment',
    datePublished: '2026-06-30',
    client: 'Leading FMCG Company',
    title: 'Real-Time Sentiment on 500K+ Daily Mentions',
    industry: 'FMCG',
    service: 'AI Automation',
    description:
      'Case study: how MyAibo built an NLP social listening and sentiment tool for a leading FMCG company, tracking 500K+ daily mentions with 89% classification accuracy.',
    excerpt:
      'How we built an NLP social listening tool that turned social conversation into product decisions in hours instead of weeks.',
    metrics: { daily_mentions: '500K+', classification_accuracy: '89%', insight_to_decision: 'Weeks → hours' },
    statsHeading: 'in production.',
    stats: [
      { num: '500K+', label: 'daily social mentions', cap: 'indexed and classified in real time' },
      { num: '89%', label: 'classification accuracy', cap: 'for the sentiment model' },
      { num: 'Weeks → hours', label: 'insight to decision', cap: 'for the product strategy team' },
    ],
    challenge: [
      "A premium cookie brand in a leading FMCG company's portfolio had no systematic way to see what consumers were saying about it across social platforms.",
      'Product strategy decisions ran on survey data that arrived weeks after the fact. By the time the team saw a shift in sentiment, the conversation had already moved on.',
    ],
    solutionLead:
      'We built an NLP-powered listening tool that reads social conversation as it happens and puts the signal in front of the product team.',
    steps: [
      { title: 'Classify sentiment with Transformer models', body: 'We used Transformer-based NLP models (BERT) in Python to classify the sentiment of every relevant post and comment.' },
      { title: 'Index social data in real time', body: 'Elasticsearch indexes the incoming social data streams, so the team can search and filter conversation as it happens.' },
      { title: 'Process events without servers to manage', body: 'AWS Lambda, API Gateway and S3 handle serverless, event-driven processing that scales with conversation volume.' },
      { title: 'Put it on one dashboard', body: 'A React dashboard gives the product strategy team a live view of sentiment, so they can act on it the same day.' },
    ],
    stack: ['Python (Transformers)', 'NLP / BERT', 'Elasticsearch', 'AWS Lambda', 'API Gateway', 'S3', 'React'],
    result: [
      'The brand now has a real-time sentiment dashboard tracking more than 500,000 social mentions a day, and the sentiment model classifies them with 89% accuracy.',
      'The bigger change is speed. The product strategy team moved from lagging survey reports to live signals, and cut the time from insight to decision from weeks to hours.',
    ],
    checks: [
      '500K+ social mentions tracked every day',
      '89% sentiment classification accuracy',
      'Insight-to-decision time cut from weeks to hours',
      'Serverless architecture that scales with conversation volume',
    ],
    insight:
      'Survey data tells a brand what consumers thought last month. Real-time listening tells it what they think today, and that is what a product team can act on.',
  },
  {
    id: 'payroll-technology-eor-community-strategy',
    datePublished: '2026-01-12',
    client: 'Leading Payroll Technology Company',
    title: 'A Community Map for the Move Upmarket',
    industry: 'Payroll & HR Tech',
    service: 'Community Strategy',
    description:
      'Case study: how MyAibo mapped 100+ LinkedIn groups and qualified Reddit communities to help a leading payroll technology company reach enterprise EOR buyers in North America.',
    excerpt:
      'How we found and scored the LinkedIn and Reddit communities where enterprise HR and finance leaders choose an Employer of Record (EOR) provider.',
    metrics: { LinkedIn_groups_analysed: '100+', high_ICP_groups: '35', Reddit_keyword_variations: '50' },
    statsHeading: 'from discovery.',
    stats: [
      { num: '100+', label: 'LinkedIn groups', cap: 'discovered and analysed' },
      { num: '35', label: 'high-ICP groups', cap: 'shortlisted for engagement' },
      { num: '50', label: 'keyword variations', cap: 'run through automated Reddit discovery' },
      { num: '2', label: 'platform playbooks', cap: 'one for LinkedIn, one for Reddit' },
    ],
    challenge: [
      'A leading payroll technology company had strong Workforce Management (WFM) and Employer of Record (EOR) products, but little organic presence in the communities where enterprise HR, People Ops and Finance leaders compare providers.',
      'It wanted to move upmarket, from SMB customers to companies with 200+ employees that need 10 or more EOR hires, and it wanted to get there without relying only on paid channels. It needed a data-backed view of where those buyers actually talk.',
    ],
    solutionLead:
      'We combined automated discovery with careful human review, so the final list reflected where real decision-makers spend time, not just where the keywords appear.',
    steps: [
      { title: 'Map and score LinkedIn communities', body: 'We mapped more than 100 LinkedIn groups and shortlisted 35 with high ideal-customer density, using a four-part scoring model: ICP density, competitor presence, best-practice signal and white-space opportunity.' },
      { title: 'Filter out the wrong WFM', body: 'In LinkedIn search, WFM also means call-centre workforce management. A semantic gate separated global mobility and EOR communities from that noise, and removed consultants, job seekers and low-intent members.' },
      { title: 'Qualify Reddit with AI', body: 'We ran automated Reddit discovery across 50 keyword variations, then used an AI classifier to sort each subreddit into signal or noise, keeping only those above an 80% confidence threshold.' },
      { title: 'Write the playbooks', body: 'We built two content playbooks: point-of-view authority posts for LinkedIn, and exploratory, problem-first posts for Reddit that are also easy for AI search engines to cite.' },
    ],
    result: [
      'The company came away with a data-backed roadmap for North America: 35 high-intent LinkedIn communities ranked on a four-part model, a qualified Reddit shortlist, and a clear content approach for each platform.',
      'The research also showed where the opening is. The category leader holds 72% share of voice among EOR brands, yet every major EOR brand scores only neutral sentiment, between 0.5 and 0.6.',
    ],
    checks: [
      'Primary personas defined: HR and People Ops leaders and Finance Controllers at 200+ employee companies',
      'LinkedIn set as the main route to decision-makers, Reddit as the source of search and AI visibility',
      'A four-part score for every community, so the team knows where to start',
      'Content themes for each platform, ready to brief',
    ],
    insight:
      'Buyers want advisory depth more than platform flash. With every major EOR brand stuck at neutral sentiment, the market is open for a challenger that leads with credibility.',
  },
];

export const getStaticCaseStudy = (id) => STATIC_CASE_STUDIES.find((cs) => cs.id === id);
