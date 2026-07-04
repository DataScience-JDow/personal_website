import { getSql } from '@/lib/db';

export interface RecruiterMessage {
  createdAt: string;
  name: string;
  email: string;
  message: string;
  readAt: string | null;
  archivedAt: string | null;
}

export interface RecruiterMessageInbox {
  total: number;
  unread: number;
  archived: number;
  messages: RecruiterMessage[];
}

let ensureMessagesTablePromise: Promise<void> | null = null;

export async function ensureMessagesTable() {
  if (!ensureMessagesTablePromise) {
    ensureMessagesTablePromise = createMessagesTable();
  }

  return ensureMessagesTablePromise;
}

async function createMessagesTable() {
  const sql = getSql();

  await sql`CREATE SCHEMA IF NOT EXISTS portfolio;`;
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio.messages (
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      read_at TIMESTAMP WITH TIME ZONE,
      archived_at TIMESTAMP WITH TIME ZONE
    );
  `;
  await sql`
    ALTER TABLE portfolio.messages
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;
  `;
  await sql`
    ALTER TABLE portfolio.messages
    ADD COLUMN IF NOT EXISTS read_at TIMESTAMP WITH TIME ZONE;
  `;
  await sql`
    ALTER TABLE portfolio.messages
    ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP WITH TIME ZONE;
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS messages_created_at_idx
    ON portfolio.messages (created_at DESC);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS messages_archived_at_idx
    ON portfolio.messages (archived_at, created_at DESC);
  `;
}

export async function getRecruiterMessageInbox(): Promise<RecruiterMessageInbox> {
  await ensureMessagesTable();

  const sql = getSql();
  const [counts] = await sql<{
    total: number;
    unread: number;
    archived: number;
  }[]>`
    SELECT
      COUNT(*) FILTER (WHERE archived_at IS NULL)::int AS total,
      COUNT(*) FILTER (WHERE archived_at IS NULL AND read_at IS NULL)::int AS unread,
      COUNT(*) FILTER (WHERE archived_at IS NOT NULL)::int AS archived
    FROM portfolio.messages;
  `;

  const messages = await sql<{
    created_at: Date;
    name: string;
    email: string;
    message: string;
    read_at: Date | null;
    archived_at: Date | null;
  }[]>`
    SELECT created_at, name, email, message, read_at, archived_at
    FROM portfolio.messages
    WHERE archived_at IS NULL
    ORDER BY read_at ASC NULLS FIRST, created_at DESC
    LIMIT 100;
  `;

  return {
    total: counts?.total ?? 0,
    unread: counts?.unread ?? 0,
    archived: counts?.archived ?? 0,
    messages: messages.map((row) => ({
      createdAt: row.created_at.toISOString(),
      name: row.name,
      email: row.email,
      message: row.message,
      readAt: row.read_at ? row.read_at.toISOString() : null,
      archivedAt: row.archived_at ? row.archived_at.toISOString() : null,
    })),
  };
}
