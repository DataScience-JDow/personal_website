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

export const profile = {
  name: 'Jeremy Dowdy',
  location: 'Prosper, TX',
  email: 'Jeremydowdy76@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jeremy-dowdy/',
  github: 'https://github.com/jeremydowdy',
  resume: '/jeremy-dowdy-resume.pdf',
  eyebrow: 'Data Scientist | Analytics Engineer | AI-Native Data Engineer',
  headline: 'I turn industrial data into pricing intelligence, decision systems, and AI-powered workflows.',
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
  { value: '35%', label: 'faster pipeline delivery with AI workflows' },
  { value: '25%', label: 'lower ingestion latency through warehouse tuning' },
  { value: '40%', label: 'less manual reporting via automated workflows' },
] satisfies ProofPoint[];

export const recruiterHooks = [
  {
    title: 'Industrial-scale business context',
    body: 'My strongest work sits where pricing, fleet logistics, asset health, margin, and executive reporting intersect.',
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
    id: 'market-pricing-platform',
    title: 'Market-Based Pricing and Data Platform Modernization',
    role: 'Data Scientist, HOLT CAT',
    context:
      'Architected pricing intelligence and contributed to Project Galaxy, a migration from legacy Snowflake, dbt, and Tableau footprints into Microsoft Fabric Lakehouse architecture.',
    architecture: [
      'Microsoft Fabric lakehouse migration strategy',
      'Medallion data modeling across bronze, silver, and gold layers',
      'Market-rate analysis logic for commercial machinery pricing',
      'Executive analytics and operational decision support',
    ],
    impact: [
      'Optimized commercial gross-margin decisioning with dynamic market-rate signals.',
      'Reduced fragmented regional data silos through a unified lakehouse target state.',
      'Translated ambiguous stakeholder goals into programmatic data requirements.',
    ],
    stack: ['Microsoft Fabric', 'Snowflake', 'dbt', 'SQL', 'Power BI', 'Tableau'],
    proof: 'Enterprise migration, pricing architecture, and executive-facing analytics in an industrial operating environment.',
  },
  {
    id: 'profitability-automation',
    title: 'Automated Cost Auditing and Profitability Platform',
    role: 'Full-stack data product architect',
    context:
      'Built a proprietary internal application to automate receipt capture, cost auditing, inventory analysis, and near-real-time profit margin visibility.',
    architecture: [
      'Serverless web application deployed on Vercel',
      'Supabase PostgreSQL persistence layer',
      'Python automation and OCR-assisted document extraction',
      'Operational dashboards for margin analysis',
    ],
    impact: [
      'Moved recurring cost-auditing work out of manual spreadsheet loops.',
      'Created a reusable foundation for receipt ingestion and profitability review.',
      'Connected data capture, validation, and reporting in one operating workflow.',
    ],
    stack: ['Supabase', 'Vercel', 'Python', 'PostgreSQL', 'Computer Vision', 'OCR'],
    proof: 'A data product that connects automation, database design, and business margin analysis.',
  },
  {
    id: 'agentic-finance-engine',
    title: 'Agentic Personal Finance and Wealth Engine',
    role: 'AI workflow designer and builder',
    context:
      'Designed a personal wealth tracking system with agentic aggregation workflows that reconcile transactions, forecast cash flow, and surface budget anomalies.',
    architecture: [
      'LLM-assisted orchestration for recurring financial scans',
      'Autonomous categorization and reconciliation routines',
      'Forecasting workflows for budget and cash-flow variables',
      'Human-review checkpoints for sensitive financial decisions',
    ],
    impact: [
      'Reduced manual transaction review and recurring expense audits.',
      'Created an applied testbed for multi-agent financial workflows.',
      'Demonstrated practical AI engineering beyond prompt-level experimentation.',
    ],
    stack: ['Python', 'LLM Workflows', 'Antigravity', 'Cursor', 'Automation', 'Financial Data'],
    proof: 'A working example of applying AI agents to messy personal finance operations with practical guardrails.',
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
