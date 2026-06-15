import fs from 'fs';
import path from 'path';
import postgres from 'postgres';

async function main() {
  console.log('Reading database credentials from .env.local...');
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env.local file not found. Please create it first.');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const dbUrlMatch = envContent.match(/DATABASE_URL=["']?([^"'\n\s]+)["']?/);
  if (!dbUrlMatch) {
    console.error('Error: DATABASE_URL not found in .env.local');
    process.exit(1);
  }
  const databaseUrl = dbUrlMatch[1];

  console.log('Connecting to Supabase PostgreSQL database...');
  // Initialize postgres client. We connect without a search_path parameter first to create the schema,
  // then we set it up.
  const sql = postgres(databaseUrl, { ssl: 'require' });

  try {
    console.log('Creating "portfolio" schema if it does not exist...');
    await sql`CREATE SCHEMA IF NOT EXISTS portfolio;`;

    console.log('Creating "portfolio.projects" table...');
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio.projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        image_url TEXT,
        tags TEXT[] DEFAULT '{}',
        github_url TEXT,
        live_url TEXT,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Creating "portfolio.skills" table...');
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio.skills (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        proficiency INT NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
        description TEXT NOT NULL,
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Creating "portfolio.messages" table...');
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio.messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log('Hardening "portfolio.messages" for server-side inserts only...');
    await sql`ALTER TABLE portfolio.messages ENABLE ROW LEVEL SECURITY;`;
    await sql`REVOKE ALL ON SCHEMA portfolio FROM anon, authenticated;`;
    await sql`REVOKE ALL ON ALL TABLES IN SCHEMA portfolio FROM anon, authenticated;`;

    console.log('Database tables successfully verified/created.');

    // Clear existing projects and skills to allow re-running seed safely
    console.log('Clearing existing seed data in portfolio.projects and portfolio.skills...');
    await sql`TRUNCATE TABLE portfolio.projects, portfolio.skills RESTART IDENTITY;`;

    console.log('Seeding portfolio.projects...');
    const projects = [
      {
        title: 'Louie Boards App',
        description: 'A professional-grade surf & paddleboard builder platform and dashboard utilizing environment isolation in a single Supabase Pro database.',
        content: `### Overview
A custom, end-to-end e-commerce platform and builder interface built for custom surfboard and paddleboard manufacturers. It integrates client order workflows, payment processing via Square, and AI-driven assistant tools for board customizations.

### Technical Achievements
* **Database Schema Partitioning**: Implemented a professional multi-environment database architecture on a single Supabase Pro project. Used isolated schemas (\`public\`, \`staging\`, and \`development\`) to run production, preview, and local code against a single database, saving subscription costs while ensuring clean environments.
* **Serverless Architecture**: Built with Next.js 14 App Router on Vercel and a Django API backend hosted on Vercel Serverless Functions.
* **Complex Integrations**: Synced data with Square APIs for payments/orders and AWS S3 for media storage, and used OpenAI's API to construct custom board recommendation chat assistants.`,
        image_url: 'louie_boards', // We will generate this asset using generate_image or CSS placeholder
        tags: ['Next.js', 'Django', 'Supabase', 'Square API', 'OpenAI'],
        github_url: 'https://github.com/DataScience-JDow/louie_boards_app',
        live_url: 'https://louie-boards-app.vercel.app',
        featured: true
      },
      {
        title: 'Budgeting & Net Worth Tracker',
        description: 'An automated personal finance app that pulls transactions via Plaid, manages accounts, and keeps its database active using serverless cron pipelines.',
        content: `### Overview
A high-performance personal budgeting dashboard that helps users track their net worth, aggregate bank transactions, categorise expenses, and view long-term surplus projections.

### Technical Achievements
* **Automation & Reliability**: Built a Vercel-cron-driven keep-alive pipeline that hits an API endpoint daily to execute lightweight queries. This ensures that the serverless DB remains active and warm, avoiding typical cold start latency.
* **Financial Data Ingestion**: Integrated Plaid's SDK, supporting secure OAuth bank link flows, transaction webhook processing, and bank metadata synchronization.
* **Data Layer & Types**: Leveraged Prisma ORM with Next.js 16 to guarantee compile-time type-safety across all database entities, implementing custom transaction caching to speed up dashboard loads.`,
        image_url: 'budgeting_app',
        tags: ['Next.js 16', 'TypeScript', 'Prisma', 'Plaid API', 'Recharts'],
        github_url: 'https://github.com/DataScience-JDow/budgeting_app',
        live_url: 'https://budgeting-app-liart.vercel.app',
        featured: true
      },
      {
        title: 'Antigravity Autonomous Coding Engine',
        description: 'An advanced AI agent framework capable of autonomous web analysis, database migrations, and writing standard-compliant CSS.',
        content: `### Overview
An autonomous software development assistant designed to collaborate with developers on complex projects. It analyzes source code structure, researches modern APIs, plans edits, runs diagnostics, and deploys applications.

### Technical Achievements
* **Intelligent Planning**: Implemented an automated "Planning Mode" that structures edits into implementation plans and walkthroughs before code is modified.
* **Vanilla CSS Alignment**: Programmed to adhere strictly to modern browser standards, leveraging Native CSS nesting, '@layer' cascade layers, and container queries over heavy utility frameworks.
* **Cross-CLI Integration**: Interacts directly with GitHub, Vercel, and Supabase CLI tools locally to create and release builds end-to-end.`,
        image_url: 'antigravity_engine',
        tags: ['Node.js', 'LLM Agentic Framework', 'MCP', 'Bash Automation'],
        github_url: 'https://github.com/DataScience-JDow/personal_website', // will be this repo
        live_url: null,
        featured: false
      }
    ];

    for (const project of projects) {
      await sql`
        INSERT INTO portfolio.projects (title, description, content, image_url, tags, github_url, live_url, featured)
        VALUES (${project.title}, ${project.description}, ${project.content}, ${project.image_url}, ${project.tags}, ${project.github_url}, ${project.live_url}, ${project.featured});
      `;
    }
    console.log(`Successfully seeded ${projects.length} projects.`);

    console.log('Seeding portfolio.skills...');
    const skills = [
      {
        name: 'React & Next.js (App Router)',
        category: 'Frontend',
        proficiency: 95,
        description: 'Deep expertise in Next.js React Server Components (RSC), Server Actions for mutation, dynamic routing, and caching behavior. Focused on achieving excellent Core Web Vitals (LCP, INP, CLS) through image optimization, selective hydration, and layout stability.',
        featured: true
      },
      {
        name: 'Database Engineering (PostgreSQL & Supabase)',
        category: 'Backend',
        proficiency: 90,
        description: 'Architecting isolated PostgreSQL schemas for multi-environment deployments within a single Supabase instance. Proficient in writing raw SQL, index tuning, transaction pool configuration (PgBouncer/Supabase Pooler), Row Level Security (RLS) policies, and database replication.',
        featured: true
      },
      {
        name: 'Prisma ORM & Data Access',
        category: 'Backend',
        proficiency: 85,
        description: 'Creating robust database schemas, managing schema migrations, writing type-safe queries, and optimizing relationships. Experienced with integrating Prisma in high-concurrency serverless runtimes like Vercel.',
        featured: false
      },
      {
        name: 'Third-Party Ingestions (Plaid, Square)',
        category: 'Integrations',
        proficiency: 88,
        description: 'Connecting to complex, regulated systems. Handled Plaid transaction feeds, Plaid Link OAuth flows, Square Point of Sale integrations, and processing dynamic webhooks securely with cryptographic signature verification.',
        featured: true
      },
      {
        name: 'Serverless Deployments & DevOps',
        category: 'Tools',
        proficiency: 85,
        description: 'Deploying React and Django backends on Vercel Serverless Functions. Setting up Vercel Crons for background database syncing and keep-alive pings. Configuring automated CI/CD pipelines via GitHub Actions.',
        featured: false
      },
      {
        name: 'Modern Styling (Vanilla CSS & Responsive)',
        category: 'Frontend',
        proficiency: 90,
        description: 'Writing standard-compliant, modern CSS. Skilled in CSS nesting, Cascade Layers (@layer) to manage specificity, Container Queries for component-driven responsiveness, and HSL custom properties with light-dark() for system-adaptive themes.',
        featured: true
      }
    ];

    for (const skill of skills) {
      await sql`
        INSERT INTO portfolio.skills (name, category, proficiency, description, featured)
        VALUES (${skill.name}, ${skill.category}, ${skill.proficiency}, ${skill.description}, ${skill.featured});
      `;
    }
    console.log(`Successfully seeded ${skills.length} skills.`);

    console.log('Database setup and seeding completed successfully!');
  } catch (error) {
    console.error('Database migration/seeding failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
