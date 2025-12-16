import { db } from '../config/db';
import type { VoteType } from '../models/vote.model';

export class VotesService {
  async createVote(imageId: string, type: VoteType) {
    const { rows } = await db.query(
      `
      INSERT INTO votes (image_id, type)
      VALUES ($1, $2)
      RETURNING id, image_id, type, created_at
      `,
      [imageId, type],
    );

    return rows[0];
  }

  async getCounts(imageIds: string[]) {
    if (imageIds.length === 0) return [];

    const { rows } = await db.query(
      `
      SELECT
        image_id,
        COUNT(*) FILTER (WHERE type = 'LIKE')    AS likes,
        COUNT(*) FILTER (WHERE type = 'DISLIKE') AS dislikes
      FROM votes
      WHERE image_id = ANY($1)
      GROUP BY image_id
      ORDER BY image_id
      `,
      [imageIds],
    );

    return rows.map((r) => ({
      imageId: String(r.image_id),
      likes: Number(r.likes),
      dislikes: Number(r.dislikes),
    }));
  }

  // ✅ NEW: counts for all imageIds + totals + normalize missing to 0
  async getCountsWithTotals(imageIds: string[]) {
    const counts = await this.getCounts(imageIds);

    const map = new Map<
      string,
      { imageId: string; likes: number; dislikes: number; totalVotes: number }
    >();

    // ensure every image appears even if no votes
    for (const id of imageIds) {
      map.set(id, { imageId: id, likes: 0, dislikes: 0, totalVotes: 0 });
    }

    for (const c of counts) {
      const totalVotes = c.likes + c.dislikes;
      map.set(c.imageId, { imageId: c.imageId, likes: c.likes, dislikes: c.dislikes, totalVotes });
    }

    const items = Array.from(map.values()).sort((a, b) => Number(a.imageId) - Number(b.imageId));

    const totals = items.reduce(
      (acc, it) => {
        acc.likes += it.likes;
        acc.dislikes += it.dislikes;
        acc.totalVotes += it.totalVotes;
        return acc;
      },
      { likes: 0, dislikes: 0, totalVotes: 0 },
    );

    return { items, totals };
  }

  async getAllVotes() {
    const { rows } = await db.query(
      `
      SELECT id, image_id, type, created_at
      FROM votes
      ORDER BY created_at ASC
      `,
    );

    return rows.map((r) => ({
      id: r.id,
      imageId: r.image_id,
      type: r.type,
      createdAt: new Date(r.created_at).toISOString(),
    }));
  }
}
