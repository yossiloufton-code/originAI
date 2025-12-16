import { Router } from 'express';
import { z } from 'zod';
import { VotesController } from '../controllers/votes.controller';
import { validate } from '../middlewares/validate.middleware';
import { asyncHandler } from '../utils/asyncHandler';

export const votesRoutes = Router();
const controller = new VotesController();

const voteCreateSchema = z.object({
  imageId: z.string().min(1),
  type: z.enum(['LIKE', 'DISLIKE']),
});

votesRoutes.post('/', validate(voteCreateSchema), asyncHandler(controller.create));
votesRoutes.get('/counts', asyncHandler(controller.counts));
votesRoutes.get('/export', asyncHandler(controller.exportCsv));
