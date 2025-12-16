import { Pool } from 'pg';
import { env } from './env';
import { logger } from './logger';

export const db = new Pool({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
});

export async function ensureSchema() {
  // pgcrypto gives gen_random_uuid()
  await db.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);

  await db.query(`
    CREATE TABLE IF NOT EXISTS votes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      image_id TEXT NOT NULL,
      type TEXT NOT NULL CHECK (type IN ('LIKE', 'DISLIKE')),
      created_at TIMESTAMP NOT NULL DEFAULT now()
    );
  `);

  await db.query(`CREATE INDEX IF NOT EXISTS idx_votes_image_id ON votes(image_id);`);
  await db.query(`CREATE INDEX IF NOT EXISTS idx_votes_created_at ON votes(created_at);`);
}

export async function testDbConnection() {
  await db.query('select 1');
  logger.info('PostgreSQL connected');
}

export async function closeDb() {
  await db.end();
  logger.info('PostgreSQL disconnected');
}
