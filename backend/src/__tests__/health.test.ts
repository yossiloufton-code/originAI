import request from 'supertest';
import { buildApp } from '../app';

describe('GET /health', () => {
  it('returns ok true', async () => {
    const app = buildApp();
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
