-- Extensions for UUID generation
create extension if not exists pgcrypto;

-- Auth.js core tables (simplified)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique,
  "emailVerified" timestamp with time zone,
  image text,
  stripe_customer_id text,
  subscription_status text
);

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  "userId" uuid references users(id) on delete cascade,
  type text not null,
  provider text not null,
  "providerAccountId" text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  unique(provider, "providerAccountId")
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  "sessionToken" text unique not null,
  "userId" uuid references users(id) on delete cascade,
  expires timestamp with time zone not null
);

create table if not exists verification_tokens (
  identifier text not null,
  token text not null,
  expires timestamp with time zone not null,
  primary key(identifier, token)
);

-- App domain tables
create table if not exists tracks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text,
  audio_url text not null,
  is_public boolean not null default false,
  created_at timestamp with time zone not null default now()
);
create index if not exists tracks_user_id_idx on tracks(user_id);
create index if not exists tracks_created_at_idx on tracks(created_at desc);
create index if not exists tracks_public_idx on tracks(is_public);

create table if not exists likes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  track_id uuid not null references tracks(id) on delete cascade,
  created_at timestamp with time zone not null default now(),
  unique(user_id, track_id)
);

create table if not exists subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade unique,
  stripe_subscription_id text,
  status text
);
