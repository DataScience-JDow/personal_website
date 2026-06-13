import postgres from 'postgres';

const globalForDb = globalThis as unknown as {
  conn?: postgres.Sql;
};

export function getSql() {
  if (globalForDb.conn) {
    return globalForDb.conn;
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is missing in process.env');
  }

  const conn = postgres(databaseUrl, {
    ssl: 'require',
    max: 10,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForDb.conn = conn;
  }

  return conn;
}
