# SHAMWARI Monorepo (Lean)

Minimal, implementation-ready scaffolding for a premium, trustworthy remittance app.

- apps:
  - `mobile` (Expo React Native)
  - `server` (Node.js + Fastify + Prisma)
- infra:
  - `ops/docker-compose.yml` (Postgres, Redis)
  - `openapi` (spec stub)

## Quickstart
- API: `cd server && npm i && npm run dev`
- Mobile: `cd mobile && npm i && npm start`
- DB: `cd ops && docker compose up -d`
