import request from 'supertest';
import { buildApp } from '../app';

jest.mock('../config/db', () => {
  return {
    db: {
      query: jest.fn(),
    },
  };
});

import { db } from '../config/db'; // after mock

describe('Votes API', () => {
  beforeEach(() => {
    (db.query as jest.Mock).mockReset();
  });

  it('POST /api/votes validates payload', async () => {
    const app = buildApp();
    const res = await request(app).post('/api/votes').send({ imageId: '', type: 'LIKE' });
    expect(res.status).toBe(400);
  });

  it('POST /api/votes inserts vote', async () => {
    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ id: '1', image_id: '10', type: 'LIKE', created_at: new Date().toISOString() }],
    });

    const app = buildApp();
    const res = await request(app).post('/api/votes').send({ imageId: '10', type: 'LIKE' });
    expect(res.status).toBe(201);
    expect(db.query).toHaveBeenCalled();
    expect(res.body.item.image_id).toBe('10');
  });

  it('GET /api/votes/counts returns normalized counts', async () => {
    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ image_id: '10', likes: '2', dislikes: '1' }],
    });

    const app = buildApp();
    const res = await request(app).get('/api/votes/counts?imageIds=10');
    expect(res.status).toBe(200);
    expect(res.body.items[0]).toEqual({ imageId: '10', likes: 2, dislikes: 1 });
  });

  it('GET /api/votes/export returns csv', async () => {
    // This depends on your export implementation.
    // If export calls db.query once, mock it accordingly.
    // If export uses getCountsWithTotals, it will call db.query from getCounts -> once.

    (db.query as jest.Mock).mockResolvedValueOnce({
      rows: [{ image_id: '1', likes: '1', dislikes: '0' }],
    });

    const app = buildApp();
    const res = await request(app).get('/api/votes/export');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/csv');
    expect(res.text).toContain('imageId,likes,dislikes,totalVotes');
  });
});
