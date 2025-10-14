import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const createTransfer = z.object({
  userId: z.string().uuid(),
  recipient: z.object({
    name: z.string().min(2),
    payoutType: z.enum(['USD_CASH', 'ZWL_MOBILE_MONEY']),
    payoutDetails: z.record(z.string(), z.any()),
  }),
  quoteId: z.string(),
  sendAmountZar: z.number().positive(),
});

export const transferRoutes: FastifyPluginAsync = async (app) => {
  app.post('/', async (req, reply) => {
    const parsed = createTransfer.safeParse(req.body);
    if (!parsed.success) {
      return reply.badRequest('Invalid request');
    }

    const transfer = {
      id: 't_' + Date.now(),
      status: 'PENDING_FUNDING',
      createdAt: new Date().toISOString(),
      ...parsed.data,
    };

    return transfer;
  });

  app.get('/:id', async (req) => {
    const { id } = req.params as { id: string };
    return { id, status: 'PROCESSING' };
  });
};
