import type { ErrorRequestHandler } from 'express';
import { logger } from '../config/logger';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = typeof err?.status === 'number' ? err.status : 500;

  logger.error(err?.message ?? 'Unhandled error', {
    status,
    stack: err?.stack,
    details: err?.details,
  });

  res.status(status).json({
    message: err?.message ?? 'Internal Server Error',
    details: err?.details,
  });
};
