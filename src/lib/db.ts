import postgres from 'postgres';

const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is missing in process.env');
}

export const sql = globalForDb.conn ?? postgres(databaseUrl, {
  ssl: 'require',
  max: 10,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

if (process.env.NODE_ENV !== 'production') {
  globalForDb.conn = sql;
}
