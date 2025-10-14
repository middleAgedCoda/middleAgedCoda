import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import sensible from '@fastify/sensible';
import { healthRoutes } from './routes/health.js';
import { quoteRoutes } from './routes/quotes.js';
import { transferRoutes } from './routes/transfers.js';
import { env } from './lib/env.js';

const app = Fastify({ logger: true });

await app.register(cors, { origin: true });
await app.register(helmet);
await app.register(sensible);

await app.register(healthRoutes, { prefix: '/health' });
await app.register(quoteRoutes, { prefix: '/quotes' });
await app.register(transferRoutes, { prefix: '/transfers' });

const port = Number(env.PORT ?? 3000);
const host = env.HOST ?? '0.0.0.0';

app.listen({ port, host }).catch((err) => {
  app.log.error(err, 'Failed to start server');
  process.exit(1);
});
