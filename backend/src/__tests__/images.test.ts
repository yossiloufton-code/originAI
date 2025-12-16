import request from 'supertest';
import { buildApp } from '../app';

describe('GET /api/images', () => {
  it('returns 100 stable images', async () => {
    const app = buildApp();
    const res = await request(app).get('/api/images');
    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(100);
    expect(res.body.items[0]).toHaveProperty('id', '1');
    expect(res.body.items[0]).toHaveProperty('url');
  });
});
