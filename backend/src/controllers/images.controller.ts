import type { RequestHandler } from 'express';
import { ImagesService } from '../services/images.service';

export class ImagesController {
  constructor(private readonly service = new ImagesService()) {}

  list: RequestHandler = (_req, res) => {
    res.json({ items: this.service.getFixedImages() });
  };
}
