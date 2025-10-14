import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';

const quoteRequest = z.object({
  sendAmountZar: z.number().positive(),
  payoutCurrency: z.enum(['USD', 'ZWL']),
});

export const quoteRoutes: FastifyPluginAsync = async (app) => {
  app.post('/', async (req, reply) => {
    const parsed = quoteRequest.safeParse(req.body);
    if (!parsed.success) {
      return reply.badRequest('Invalid request');
    }

    const { sendAmountZar, payoutCurrency } = parsed.data;

    // Placeholder premium rate logic (to be replaced by provider quote)
    const midMarketRate = payoutCurrency === 'USD' ? 0.055 : 22.0; // illustrative only
    const markupBps = 150; // 1.5%
    const premiumRate = payoutCurrency === 'USD'
      ? midMarketRate * (1 - markupBps / 10000)
      : midMarketRate * (1 + markupBps / 10000);

    const fixedFeeZar = 20;
    const providerFeeZar = Math.max(0.01 * sendAmountZar, 5);
    const totalFeesZar = fixedFeeZar + providerFeeZar;

    const payoutAmount = payoutCurrency === 'USD'
      ? (sendAmountZar - totalFeesZar) * premiumRate
      : (sendAmountZar - totalFeesZar) * premiumRate;

    const expiresAt = new Date(Date.now() + 2 * 60 * 1000).toISOString();

    return {
      id: 'q_' + Date.now(),
      sendAmountZar,
      payoutCurrency,
      midMarketRate,
      premiumRate,
      markupBps,
      fixedFeeZar,
      providerFeeZar,
      totalFeesZar,
      payoutAmount,
      expiresAt,
    };
  });
};
