MyFrontPage.ai MVP

Env vars required:
- NEXTAUTH_URL
- NEXTAUTH_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- GROQ_API_KEY (optional; falls back to mock)

Supabase: create table summaries (user_id text primary key, summary text, updated_at timestamptz).
