import { rest } from 'msw';

export const handlers = [
  rest.get('/api/bugs', (req, res, ctx) => {
    return res(
      ctx.json([
        { _id: '1', title: 'Test Bug', description: 'Test Description' }
      ])
    );
  }),
];