const request = require('supertest');
const app = require('../../server');
const Bug = require('../../models/Bug');

describe('Bug API Tests', () => {
  beforeEach(async () => {
    await Bug.deleteMany({});
  });

  test('GET /api/bugs returns empty list initially', async () => {
    const response = await request(app).get('/api/bugs');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /api/bugs creates a new bug', async () => {
    const response = await request(app)
      .post('/api/bugs')
      .send({ title: 'Test Bug', description: 'Test Description' });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Bug');
  });
});