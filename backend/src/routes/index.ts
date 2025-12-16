import { Router } from 'express';
import { imagesRoutes } from './images.routes';
import { votesRoutes } from './votes.routes';

export const apiRoutes = Router();

apiRoutes.use('/images', imagesRoutes);
apiRoutes.use('/votes', votesRoutes);
