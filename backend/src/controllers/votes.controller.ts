import type { RequestHandler } from 'express';
import { VotesService } from '../services/votes.service';
import { toCsv } from '../utils/csv';

export class VotesController {
  constructor(private readonly service = new VotesService()) {}

  create: RequestHandler = async (req, res) => {
    const { imageId, type } = req.body;
    const item = await this.service.createVote(imageId, type);
    res.status(201).json({ item });
  };

  counts: RequestHandler = async (req, res) => {
    const raw = String(req.query.imageIds ?? '');
    const imageIds = raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const items = await this.service.getCounts(imageIds);
    res.json({ items });
  };

  exportCsv: RequestHandler = async (_req, res) => {
    const imageIds = Array.from({ length: 100 }, (_, i) => String(i + 1));

    const { items, totals } = await this.service.getCountsWithTotals(imageIds);

    const csvRows = [
      ...items.map((it) => ({
        imageId: it.imageId,
        likes: it.likes,
        dislikes: it.dislikes,
        totalVotes: it.totalVotes,
      })),
      {
        imageId: 'TOTAL',
        likes: totals.likes,
        dislikes: totals.dislikes,
        totalVotes: totals.totalVotes,
      },
    ];

    const csv = toCsv(csvRows, ['imageId', 'likes', 'dislikes', 'totalVotes']);

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="votes.csv"`);
    res.status(200).send(csv);
  };
}
