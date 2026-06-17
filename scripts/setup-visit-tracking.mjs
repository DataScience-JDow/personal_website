import fs from 'fs';
import path from 'path';
import postgres from 'postgres';

async function main() {
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

  const sql = postgres(dbUrlMatch[1], { ssl: 'require' });

  try {
    console.log('Creating visit tracking schema objects...');
    await sql`CREATE SCHEMA IF NOT EXISTS portfolio;`;
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio.visit_events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        path TEXT NOT NULL,
        host TEXT,
        referrer_host TEXT,
        country TEXT,
        visitor_hash TEXT NOT NULL,
        is_bot BOOLEAN NOT NULL DEFAULT false,
        environment TEXT
      );
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS visit_events_created_at_idx
      ON portfolio.visit_events (created_at DESC);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS visit_events_path_created_at_idx
      ON portfolio.visit_events (path, created_at DESC);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS visit_events_visitor_created_at_idx
      ON portfolio.visit_events (visitor_hash, created_at DESC);
    `;
    console.log('Visit tracking schema objects are ready.');
  } catch (error) {
    console.error('Visit tracking setup failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
