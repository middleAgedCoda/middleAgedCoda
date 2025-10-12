# Lean AI Music (Next.js 14)

Minimal, production-ready AI text-to-music app.

## Quick start

1. Copy envs

```bash
cp .env.example .env.local
```

2. Install deps

```bash
pnpm i # or npm i / yarn
```

3. DB setup (Supabase SQL)

```sql
-- run in Supabase SQL editor
-- file: supabase/schema.sql
```

4. Dev

```bash
pnpm dev
```

## Services
- Supabase: DB + Auth adapter tables
- Cloudflare R2: audio storage
- Stripe: subscriptions ($10/month)
- Suno AI: text-to-music generation

## Deploy
- Vercel with environment variables
- Add webhook: `/api/webhooks/stripe`
- R2 public domain in `R2_PUBLIC_BASE_URL`
