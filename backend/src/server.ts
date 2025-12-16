import { buildApp } from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import { testDbConnection, closeDb, ensureSchema } from './config/db';

async function main() {
  await testDbConnection();
  await ensureSchema();

  const app = buildApp();
  const server = app.listen(env.PORT, () => {
    logger.info(`API listening on port ${env.PORT}`);
  });

  const shutdown = async (signal: string) => {
    logger.warn(`Shutting down (${signal})...`);
    server.close(async () => {
      await closeDb();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
}

void main();
