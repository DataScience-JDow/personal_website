import {
  BarChart3,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Database,
  Factory,
  FileDown,
  Gauge,
  GraduationCap,
  Layers3,
  LineChart,
  ExternalLink,
  Mail,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

export type PortfolioLink = {
  label: string;
  href: string;
  kind: 'primary' | 'secondary' | 'text';
};

export type ProofPoint = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  role: string;
  context: string;
  architecture: string[];
  impact: string[];
  stack: string[];
  proof: string;
  category: 'work' | 'personal';
  proofPageSlug?: string;
};

export type CapabilityGroup = {
  title: string;
  icon: typeof Database;
  summary: string;
  evidence: string[];
};

export type ExperienceItem = {
  company: string;
  title: string;
  period: string;
  location: string;
  highlights: string[];
};

export type ProofMetric = {
  value: string;
  label: string;
};

export type ProofArchitectureItem = {
  title: string;
  detail: string;
};

export type PublicProofPage = {
  slug: string;
  studyId: string;
  eyebrow: string;
  strapline: string;
  publicSummary: string;
  recruiterAngle: string;
  status: string;
  repositoryStatus: string;
  metrics: ProofMetric[];
  challenge: string;
  constraints: string[];
  architecture: ProofArchitectureItem[];
  productDecisions: string[];
  publicProof: string[];
  nextIterations: string[];
};

export const profile = {
  name: 'Jeremy Dowdy',
  location: 'Prosper, TX',
  email: 'Jeremydowdy76@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jeremy-dowdy/',
  github: 'https://github.com/DataScience-JDow',
  resume: '/jeremy-dowdy-resume.pdf',
  eyebrow: 'Data Scientist & Analytics Engineer',
  headline: 'Helping translate industrial complexity into pricing intelligence, structured decisions, and practical AI workflows.',
  summary:
    'Across seven years at HOLT CAT, I have grown from business-facing analysis into data science, analytics engineering, and enterprise data platform work. That progression shaped how I build: start with the stakeholder problem, learn the operating model, then design the data system behind the decision.',
  target:
    'Best fit: data science, analytics engineering, data platform, BI engineering, and applied AI roles where business fluency and hands-on implementation both matter.',
  links: [
    { label: 'Download Resume', href: '/jeremy-dowdy-resume.pdf', kind: 'primary' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jeremy-dowdy/', kind: 'secondary' },
    { label: 'Email Jeremy', href: 'mailto:Jeremydowdy76@gmail.com', kind: 'secondary' },
    { label: 'View Case Studies', href: '#case-studies', kind: 'text' },
  ] satisfies PortfolioLink[],
};

export const heroActions = [
  { label: 'Download Resume', href: profile.resume, icon: FileDown },
  { label: 'LinkedIn', href: profile.linkedin, icon: ExternalLink },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
];

export const proofPoints = [
  { value: '7+ yrs', label: 'progressive data platform experience' },
  { value: 'End-to-End', label: 'delivering from raw database model to dashboard' },
  { value: 'Collaborative', label: 'partnering with teams to solve business needs' },
  { value: 'Certified', label: 'Fabric Analytics Engineer Associate (DP-600)' },
] satisfies ProofPoint[];

export const recruiterHooks = [
  {
    title: 'Strong Business Partnership',
    body: 'I make it a priority to deeply understand the business context. My strong suit is partnering directly with stakeholders to build systems they trust.',
  },
  {
    title: 'Analytics engineering depth',
    body: 'I can model the warehouse, write the SQL, shape the semantic layer, and explain the metric to operators.',
  },
  {
    title: 'Applied AI without the theater',
    body: 'I use AI to accelerate refactors, pipeline delivery, anomaly review, and repetitive financial workflows.',
  },
];

export const caseStudies = [
  {
    id: 'market-pricing',
    title: 'Machine Quoting & Market-Based Pricing Engine',
    role: 'Data Scientist, HOLT CAT',
    context:
      'Architected and deployed an end-to-end pricing intelligence system powered by machine learning to automate the company\'s equipment quoting process.',
    architecture: [
      'XGBoost classification and regression models trained on historical deal parameters',
      'Snowflake Notebooks for exploratory data analysis, feature engineering, and model validation',
      'Streamlit interface deployed internally for pricing analysts and commercial teams',
      'Automated scoring pipelines running natively inside Snowflake compute layers',
    ],
    impact: [
      'Replaced manual quoting spreadsheets with dynamic machine quoting recommendations.',
      'Optimized transaction capture and realized margin accuracy across high-volume quotes.',
      'Reduced average turnaround time for pricing review from hours to near-instantaneous.',
    ],
    stack: ['Snowflake', 'Streamlit', 'Snowflake Notebooks', 'XGBoost', 'Python', 'SQL'],
    proof: 'Machine quoting and machine learning model pipeline that powers daily commercial operations.',
    category: 'work',
  },
  {
    id: 'fabric-migration',
    title: 'Enterprise Lakehouse Migration & Platform Modernization',
    role: 'Analytics Engineering Lead, HOLT CAT',
    context:
      'Co-led Project Galaxy, a massive migration from legacy Snowflake, dbt, and Tableau footprints into a unified Microsoft Fabric Lakehouse environment.',
    architecture: [
      'Medallion data lakehouse architecture (Bronze, Silver, Gold layers)',
      'Microsoft Fabric semantic models and automated delta parquet pipelines',
      'dbt data transform normalization layers translated into Fabric environments',
      'Enterprise-wide Power BI reports and executive analytical dashboards',
    ],
    impact: [
      'Modernized the analytics stack, reducing reliance on legacy infrastructure and third-party tools.',
      'Standardized metrics across multiple business divisions via Fabric Gold semantic tables.',
      'Established migration patterns now adopted across the entire analytics engineering team.',
    ],
    stack: ['Microsoft Fabric', 'Power BI', 'dbt', 'Snowflake', 'SQL', 'Tableau'],
    proof: 'A large-scale migration of legacy databases into Fabric lakehouses and Power BI semantic layers.',
    category: 'work',
  },
  {
    id: 'coti-pipeline',
    title: 'Customer Order to Invoice (COTI) Integration Pipeline',
    role: 'Data Architect & Integration Engineer, HOLT CAT',
    context:
      'Engineered a mission-critical pipeline linking ERP and CRM data directly into monday.com to streamline the company\'s high-stakes Customer Order to Invoice (COTI) process.',
    architecture: [
      'Automated data extraction pipelines pulling from ERP (Salesforce, SAP/DB) and CRM systems',
      'Secure webhook handlers and Monday API integrations for live status synchronizations',
      'Cross-department notification triggers and task-reassignment workflows',
      'Data reconciliation models to prevent order double-entry or processing bottlenecks',
    ],
    impact: [
      'Facilitates order tracking across 10 business departments, improving delivery visibility.',
      'Powers the operational pipeline responsible for delivering over $1 Billion in machinery annually.',
      'Significantly reduced manual follow-ups and order invoice latency.',
    ],
    stack: ['Python', 'SQL', 'Monday API', 'Salesforce CRM', 'ERP Integration', 'Webhooks'],
    proof: 'Mission-critical operational pipeline processing CRM/ERP data for a $1B+ machine delivery engine.',
    category: 'work',
  },
  {
    id: 'location-analysis',
    title: 'Geospatial & Demographic Market Analysis for Facility Expansion',
    role: 'Lead Data Analyst, HOLT CAT',
    context:
      'Conducted a comprehensive demographic and market share analysis that directly justified the capital expenditure and development of a new full-service operating facility.',
    architecture: [
      'Geospatial clustering models of customer migration patterns and fleet density',
      'Multi-variable regression incorporating population growth, regional GDP, and competitor share',
      'Interactive map visualizations and executive scenario-modeling calculators',
      'Financial feasibility and market share capture projections',
    ],
    impact: [
      'Directly resulted in the approval and construction of a new full-service operating facility.',
      'Drastically improved regional market share and reduced service technician travel times.',
      'Established a data-driven framework for future real estate and territory expansion planning.',
    ],
    stack: ['Python', 'Pandas', 'SQL', 'Geospatial Analysis', 'Scikit-learn', 'Power BI'],
    proof: 'Data analysis and executive presentation that drove capital investment for a new physical facility.',
    category: 'work',
  },
  {
    id: 'louie-boards',
    title: 'Louie Boards Charcuterie CRM & Dashboard',
    role: 'Creator & Full-stack Developer',
    context:
      'Built a custom, isolated CRM and order tracker for my wife\'s boutique charcuterie business, streamlining customer engagement and order fulfillment.',
    architecture: [
      'Next.js client interface deployed on Vercel',
      'Supabase PostgreSQL data layer with isolated development/production schemas',
      'Square API integration for transactional webhook captures and catalog syncs',
      'Automated SMS notifications and customer order history dashboards',
    ],
    impact: [
      'Moved customer records from manual messages into a structured CRM database.',
      'Automated payment-to-order workflow validation using Square webhooks.',
      'Saved custom product builder options directly associated with client historical preferences.',
    ],
    stack: ['Next.js', 'Supabase', 'Vercel', 'Square API', 'TypeScript', 'PostgreSQL'],
    proof: 'A tailored serverless CRM and e-commerce tracker built on a robust Postgres data layer.',
    category: 'personal',
    proofPageSlug: 'louie-boards',
  },
  {
    id: 'budgeting-app',
    title: 'Net Worth & Cashflow Management Engine',
    role: 'Creator & Backend Developer',
    context:
      'Developed a high-performance personal finance tracker to aggregate family cashflow, budgeting logs, and long-term investment progress.',
    architecture: [
      'Serverless API built using Vercel Serverless Functions and Supabase',
      'Cron pipeline keep-alive system to prevent database cold-start latency',
      'Custom transaction caching layers for speed optimization',
      'Interactive visualization dashboards using Recharts for surplus tracking',
    ],
    impact: [
      'Centralized transaction data and budgeting routines into a single platform.',
      'Established real-time cashflow projections and automated anomaly alerts.',
      'Optimized database performance to run queries in under 50ms using strict indexing.',
    ],
    stack: ['TypeScript', 'Next.js', 'Supabase', 'Prisma ORM', 'Recharts', 'Vercel Crons'],
    proof: 'A personal finance hub demonstrating serverless automation, custom caching, and clean dataviz.',
    category: 'personal',
    proofPageSlug: 'budgeting-engine',
  },
] satisfies CaseStudy[];

export const capabilityGroups = [
  {
    title: 'Data Platforms',
    icon: Database,
    summary: 'Lakehouse, warehouse, and schema design for operational analytics.',
    evidence: ['Microsoft Fabric', 'Snowflake', 'Azure', 'PostgreSQL', 'Medallion architecture'],
  },
  {
    title: 'Analytics Engineering',
    icon: Layers3,
    summary: 'Reliable transformations and semantic layers for decision-ready metrics.',
    evidence: ['dbt', 'Advanced SQL', 'Window functions', 'CTEs', 'Kimball dimensional modeling'],
  },
  {
    title: 'BI and Executive Reporting',
    icon: BarChart3,
    summary: 'Dashboards and models that translate operational data into clear decisions.',
    evidence: ['Power BI', 'DAX', 'Tableau', 'Advanced semantic modeling', 'Stakeholder discovery'],
  },
  {
    title: 'Machine Learning Systems',
    icon: BrainCircuit,
    summary: 'Predictive systems for industrial logistics, bottlenecks, and fleet optimization.',
    evidence: ['Regression', 'Classification', 'K-Means clustering', 'Scikit-learn', 'Pandas'],
  },
  {
    title: 'AI Workflow Engineering',
    icon: Bot,
    summary: 'LLM-assisted development and agentic workflows for delivery acceleration.',
    evidence: ['Cursor', 'Antigravity', 'Multi-agent workflows', 'Prompted refactors', 'Automation loops'],
  },
  {
    title: 'Product Engineering',
    icon: Workflow,
    summary: 'Full-stack data products deployed on modern serverless infrastructure.',
    evidence: ['Vercel', 'Supabase', 'CI/CD', 'GitHub', 'Python services'],
  },
] satisfies CapabilityGroup[];

export const experience = [
  {
    company: 'HOLT CAT',
    title: 'Data Scientist',
    period: 'Sep 2025 - Present',
    location: 'Dallas, TX (Remote)',
    highlights: [
      'Architected a market-based pricing application for commercial machinery rate analysis.',
      'Spearheads Project Galaxy, a migration into Microsoft Fabric Lakehouse architecture.',
      'Productionized ML systems for logistics bottlenecks and fleet distribution optimization.',
      'Introduced AI-first development workflows that improved delivery speed by more than 35%.',
    ],
  },
  {
    company: 'HOLT CAT',
    title: 'Data Analyst 3',
    period: 'Mar 2023 - Oct 2025',
    location: 'Irving, TX',
    highlights: [
      'Engineered Azure and Snowflake ETL/ELT workflows and reduced ingestion latency by 25%.',
      'Audited warehouse cost drivers and identified redundant compute and query overhead.',
      'Automated operational asset-health workflows in Alteryx, reducing manual reporting by 40%.',
    ],
  },
  {
    company: 'HOLT CAT',
    title: 'Data Analyst 2',
    period: 'May 2019 - Mar 2023',
    location: 'Irving, TX',
    highlights: [
      'Managed enterprise Power BI and Tableau reporting suites across billions of records.',
      'Analyzed machinery transaction and telemetry patterns for regional operating teams.',
    ],
  },
  {
    company: 'Fan Cloth',
    title: 'Sales Executive',
    period: 'Nov 2014 - Jan 2019',
    location: 'Texas',
    highlights: [
      'Managed regional accounts, forecasting, pipeline analysis, and logistics coordination.',
      'Built the business foundation that informs current analytics and product judgment.',
    ],
  },
] satisfies ExperienceItem[];

export const credentials = [
  {
    label: 'Master of Science, Advanced Data Analytics',
    detail: 'University of North Texas, 2018 - 2019',
    icon: GraduationCap,
  },
  {
    label: 'Bachelor of Science, Sports Management',
    detail: 'East Texas A&M University, 2010 - 2014',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Microsoft Certified: Fabric Analytics Engineer Associate',
    detail: 'DP-600 certification',
    icon: ShieldCheck,
  },
  {
    label: 'Active technical communities',
    detail: 'dbt Global Community and Microsoft Fabric Community Conference, 2026',
    icon: Sparkles,
  },
];

export const systemVisualNodes = [
  { label: 'Sources', detail: 'transactions, telemetry, receipts', icon: Factory },
  { label: 'Lakehouse', detail: 'bronze, silver, gold', icon: Database },
  { label: 'Models', detail: 'pricing, ML, semantic layers', icon: Network },
  { label: 'Decisions', detail: 'margin, fleet, executive reporting', icon: LineChart },
];

export const operatingPrinciples = [
  {
    title: 'Build the data product, not just the dashboard',
    body: 'I connect ingestion, modeling, automation, and stakeholder workflows so the output becomes operationally useful.',
    icon: Gauge,
  },
  {
    title: 'Use AI where it compounds delivery',
    body: 'My strongest AI use cases are refactoring, pipeline delivery, anomaly scans, and workflows with clear human review points.',
    icon: BrainCircuit,
  },
  {
    title: 'Stay close to the business metric',
    body: 'Pricing, margin, logistics, and reporting work all tie back to measurable operating leverage rather than tool adoption alone.',
    icon: BarChart3,
  },
];

export const publicProofPages = [
  {
    slug: 'louie-boards',
    studyId: 'louie-boards',
    eyebrow: 'Public Build Proof',
    strapline:
      'A custom CRM, order tracker, and fulfillment workflow for a boutique food business with highly specific order details and repeat-customer preferences.',
    publicSummary:
      'This project matters because it shows how I translate messy real-world operating workflows into a structured product, not just a frontend. The core problem was taking fragmented customer conversations, custom order details, payments, and follow-up logistics and moving them into a system with durable records and cleaner handoffs.',
    recruiterAngle:
      'Strongest signal for recruiters: product-minded data design, API integration, and pragmatic workflow automation for a live small-business use case.',
    status: 'Active personal project with room for more public artifacts.',
    repositoryStatus:
      'Architecture, workflow design, and implementation details are documented here while customer-facing operational details remain private.',
    metrics: [
      { value: '3 systems', label: 'customer intake, payment events, and fulfillment status aligned' },
      { value: '2 envs', label: 'isolated development and production database schemas' },
      { value: 'Webhook-led', label: 'order validation triggered from external payment events' },
      { value: 'Structured history', label: 'repeat customer preferences captured for future orders' },
    ],
    challenge:
      'The business was running through texts, custom requests, and ad hoc memory. That is workable at low volume, but it breaks as soon as you need repeatability, customer history, or clear order-state visibility.',
    constraints: [
      'No generic CRM matched the exact flow of custom charcuterie orders, pickup timing, and repeat personalization.',
      'The data model needed to preserve both transactional accuracy and human context, such as saved product preferences.',
      'Operational reliability mattered more than visual novelty because missed webhook or order-state transitions would create real customer friction.',
    ],
    architecture: [
      {
        title: 'Frontend and operator workflow',
        detail:
          'A Next.js interface supports order review, customer lookup, and status visibility without forcing the operator to bounce between spreadsheets, messages, and payment tools.',
      },
      {
        title: 'Relational core',
        detail:
          'Supabase Postgres stores customers, orders, product options, and repeat-order context as first-class relational entities instead of free-form notes.',
      },
      {
        title: 'Payments and sync',
        detail:
          'Square webhook events are used to validate payment milestones and keep the order record aligned with external transaction activity.',
      },
      {
        title: 'Operational messaging',
        detail:
          'Notification logic supports the next step in the order lifecycle so fulfillment work does not depend on manual memory alone.',
      },
    ],
    productDecisions: [
      'Modeled repeat-order preferences as reusable customer context rather than burying them inside one-off order text.',
      'Separated development and production schemas early so experimentation would not threaten live order data.',
      'Treated webhook handling as an operational integrity feature, not just an integration checkbox.',
    ],
    publicProof: [
      'The case study itself documents the workflow boundaries, data model choices, and business process being automated.',
      'The stack reflects a full path from product interface to database design to external API event handling.',
      'Because this is a family business system, the public material emphasizes architecture and decisions rather than exposing customer records or internal operational details.',
    ],
    nextIterations: [
      'Prepare a sanitized repo walkthrough with schema excerpts and selected API integration patterns.',
      'Add a small gallery of redacted screens showing customer search, order history, and fulfillment status transitions.',
      'Document the order lifecycle as a sequence diagram so recruiters can inspect the system thinking faster.',
    ],
  },
  {
    slug: 'budgeting-engine',
    studyId: 'budgeting-app',
    eyebrow: 'Public Build Proof',
    strapline:
      'A household finance platform focused on transaction aggregation, budgeting visibility, long-term net worth tracking, and performance-conscious query design.',
    publicSummary:
      'This project is useful recruiter proof because it is not just a personal dashboard. It combines backend design, caching strategy, scheduled upkeep, and opinionated financial views into a system that has to stay fast and trustworthy over time.',
    recruiterAngle:
      'Strongest signal for recruiters: end-to-end product engineering with data modeling, serverless backend behavior, performance tuning, and decision-oriented visualization.',
    status: 'Working personal system with clear room for a more polished public demo.',
    repositoryStatus:
      'The technical architecture is presented here while the underlying financial records remain private.',
    metrics: [
      { value: 'Sub-50ms', label: 'query targets supported through indexing and caching discipline' },
      { value: 'Real-time', label: 'cashflow and surplus visibility across active budgets' },
      { value: 'Cron-backed', label: 'serverless upkeep used to reduce cold-start friction' },
      { value: 'Single ledger', label: 'family transactions and investment context centralized in one system' },
    ],
    challenge:
      'Most consumer finance tools are either generic, inflexible, or weak at combining budgeting, transaction visibility, and long-horizon net worth context in a way that matches how a real household actually reviews money.',
    constraints: [
      'Financial data is sensitive, so the public-facing story has to explain system quality without exposing actual records.',
      'Serverless performance matters because a sluggish dashboard undermines trust even when the calculations are correct.',
      'The application has to handle both operational views, like recent cashflow, and longitudinal views, like investment progress.',
    ],
    architecture: [
      {
        title: 'Backend and APIs',
        detail:
          'Serverless endpoints handle read and write workflows while keeping the application deployable on lightweight infrastructure.',
      },
      {
        title: 'Data layer',
        detail:
          'Supabase provides the relational core for transactions, budget categories, cashflow history, and investment tracking.',
      },
      {
        title: 'Performance layer',
        detail:
          'Caching and indexing decisions are used deliberately so the dashboard stays responsive instead of devolving into slow ad hoc queries.',
      },
      {
        title: 'Decision surface',
        detail:
          'Recharts-based views expose surplus, trends, and anomalies in a way that supports action rather than decorative reporting.',
      },
    ],
    productDecisions: [
      'Optimized for fast recurring reads because a finance dashboard is only useful if people will actually open it often.',
      'Used scheduled upkeep to reduce serverless cold-start pain instead of pretending the platform defaults were sufficient.',
      'Designed the interface around cashflow decisions and anomaly review, not only net worth vanity metrics.',
    ],
    publicProof: [
      'The case study makes the performance goals, automation design, and modeling priorities explicit for outside reviewers.',
      'The build demonstrates that I can move from schema and backend logic into a user-facing decision surface without changing problem domains.',
      'Sensitive household data remains private, but the technical constraints and implementation choices are concrete enough to assess.',
    ],
    nextIterations: [
      'Publish a sanitized schema and request-flow walkthrough showing how transactions, budgets, and projections connect.',
      'Capture redacted screenshots or seeded demo states so viewers can inspect the actual dashboard experience.',
      'Add tests or benchmarks that make the performance claims easier for an external reviewer to trust quickly.',
    ],
  },
] satisfies PublicProofPage[];

export function getCaseStudyById(id: string) {
  return caseStudies.find((study) => study.id === id);
}

export function getPublicProofPageBySlug(slug: string) {
  return publicProofPages.find((page) => page.slug === slug);
}
