import { Router } from 'express';
import { ImagesController } from '../controllers/images.controller';

export const imagesRoutes = Router();
const controller = new ImagesController();

imagesRoutes.get('/', controller.list);
