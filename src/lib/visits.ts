import { createHash } from 'crypto';
import { getSql } from '@/lib/db';

export const ADMIN_COOKIE = 'jd_visits_admin';
export const IGNORE_COOKIE = 'jd_ignore_visits';

export interface VisitRecordInput {
  path: string;
  referrer?: string | null;
  userAgent?: string | null;
  ipAddress?: string | null;
  host?: string | null;
  country?: string | null;
}

export interface VisitSummary {
  totalVisits: number;
  todayVisits: number;
  sevenDayVisits: number;
  thirtyDayVisits: number;
  uniqueToday: number;
  uniqueSevenDay: number;
  topPages: Array<{ path: string; visits: number; uniqueVisitors: number }>;
  recentVisits: Array<{
    createdAt: string;
    path: string;
    referrerHost: string | null;
    country: string | null;
  }>;
}

let ensureVisitsTablePromise: Promise<void> | null = null;

export function getAdminToken() {
  return process.env.VISITS_ADMIN_TOKEN?.trim() || '';
}

export function isAuthorizedAdmin(cookieValue?: string | null, tokenValue?: string | null) {
  const adminToken = getAdminToken();

  if (!adminToken) {
    return false;
  }

  return cookieValue === adminToken || tokenValue === adminToken;
}

export async function ensureVisitsTable() {
  if (!ensureVisitsTablePromise) {
    ensureVisitsTablePromise = createVisitsTable();
  }

  return ensureVisitsTablePromise;
}

async function createVisitsTable() {
  const sql = getSql();

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
}

export async function recordVisit(input: VisitRecordInput) {
  const path = normalizePath(input.path);

  if (!path || path.startsWith('/admin') || path.startsWith('/api')) {
    return;
  }

  const userAgent = input.userAgent || '';
  const isBot = isLikelyBot(userAgent);

  if (isBot) {
    return;
  }

  await ensureVisitsTable();

  const sql = getSql();
  const visitorHash = createVisitorHash({
    ipAddress: input.ipAddress,
    userAgent,
  });

  await sql`
    INSERT INTO portfolio.visit_events (
      path,
      host,
      referrer_host,
      country,
      visitor_hash,
      is_bot,
      environment
    )
    VALUES (
      ${path},
      ${cleanText(input.host, 160)},
      ${getReferrerHost(input.referrer)},
      ${cleanText(input.country, 8)},
      ${visitorHash},
      ${isBot},
      ${cleanText(process.env.VERCEL_ENV || process.env.NODE_ENV, 32)}
    );
  `;
}

export async function getVisitSummary(): Promise<VisitSummary> {
  await ensureVisitsTable();

  const sql = getSql();
  const [totals] = await sql<{
    total_visits: number;
    today_visits: number;
    seven_day_visits: number;
    thirty_day_visits: number;
    unique_today: number;
    unique_seven_day: number;
  }[]>`
    SELECT
      COUNT(*)::int AS total_visits,
      COUNT(*) FILTER (WHERE created_at >= date_trunc('day', now()))::int AS today_visits,
      COUNT(*) FILTER (WHERE created_at >= now() - interval '7 days')::int AS seven_day_visits,
      COUNT(*) FILTER (WHERE created_at >= now() - interval '30 days')::int AS thirty_day_visits,
      COUNT(DISTINCT visitor_hash) FILTER (WHERE created_at >= date_trunc('day', now()))::int AS unique_today,
      COUNT(DISTINCT visitor_hash) FILTER (WHERE created_at >= now() - interval '7 days')::int AS unique_seven_day
    FROM portfolio.visit_events
    WHERE is_bot = false;
  `;

  const topPages = await sql<{
    path: string;
    visits: number;
    unique_visitors: number;
  }[]>`
    SELECT
      path,
      COUNT(*)::int AS visits,
      COUNT(DISTINCT visitor_hash)::int AS unique_visitors
    FROM portfolio.visit_events
    WHERE is_bot = false
      AND created_at >= now() - interval '30 days'
    GROUP BY path
    ORDER BY visits DESC, path ASC
    LIMIT 10;
  `;

  const recentVisits = await sql<{
    created_at: Date;
    path: string;
    referrer_host: string | null;
    country: string | null;
  }[]>`
    SELECT created_at, path, referrer_host, country
    FROM portfolio.visit_events
    WHERE is_bot = false
    ORDER BY created_at DESC
    LIMIT 25;
  `;

  return {
    totalVisits: totals?.total_visits ?? 0,
    todayVisits: totals?.today_visits ?? 0,
    sevenDayVisits: totals?.seven_day_visits ?? 0,
    thirtyDayVisits: totals?.thirty_day_visits ?? 0,
    uniqueToday: totals?.unique_today ?? 0,
    uniqueSevenDay: totals?.unique_seven_day ?? 0,
    topPages: topPages.map((row) => ({
      path: row.path,
      visits: row.visits,
      uniqueVisitors: row.unique_visitors,
    })),
    recentVisits: recentVisits.map((row) => ({
      createdAt: row.created_at.toISOString(),
      path: row.path,
      referrerHost: row.referrer_host,
      country: row.country,
    })),
  };
}

export function normalizePath(path: string) {
  const trimmedPath = cleanText(path, 500);

  if (!trimmedPath || !trimmedPath.startsWith('/')) {
    return '/';
  }

  return trimmedPath.split('#')[0] || '/';
}

function createVisitorHash(input: { ipAddress?: string | null; userAgent?: string | null }) {
  const salt = process.env.VISITS_HASH_SALT || getAdminToken() || 'local-visit-salt';

  return createHash('sha256')
    .update(`${salt}:${input.ipAddress || 'unknown'}:${input.userAgent || 'unknown'}`)
    .digest('hex');
}

function getReferrerHost(referrer?: string | null) {
  const cleanReferrer = cleanText(referrer, 500);

  if (!cleanReferrer) {
    return null;
  }

  try {
    const referrerUrl = new URL(cleanReferrer);
    return cleanText(referrerUrl.hostname.replace(/^www\./, ''), 160);
  } catch {
    return null;
  }
}

function isLikelyBot(userAgent: string) {
  return /bot|crawl|spider|slurp|duckduck|baidu|yandex|facebookexternalhit|linkedinbot|preview|validator|uptime|monitor/i.test(
    userAgent
  );
}

function cleanText(value: string | null | undefined, maxLength: number) {
  if (!value) {
    return null;
  }

  const normalized = value.trim();

  if (!normalized) {
    return null;
  }

  return normalized.slice(0, maxLength);
}
