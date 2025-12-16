import type { RequestHandler } from 'express';
import type { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema): RequestHandler =>
  (req, _res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const err: any = new Error('Validation error');
      err.status = 400;
      err.details = parsed.error.flatten();
      return next(err);
    }

    req.body = parsed.data;
    next();
  };
