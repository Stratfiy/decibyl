-- Decibyl lead capture. Run this in the Supabase SQL editor.
-- Writes happen server-side with the service role key only.

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  form_type     text not null check (form_type in ('demo','waitlist','contact')),
  name          text,
  email         text not null,
  phone         text,
  company       text,
  vertical      text,
  call_volume   text,
  message       text,

  -- attribution: capture from day one, you'll want the cohorts in 3 months
  source_page   text,
  referrer      text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_term      text,
  utm_content   text,

  -- pipeline
  status        text not null default 'new',
  notion_id     text,
  demo_call_id  text,
  demo_outcome  text,

  ip_hash       text,
  user_agent    text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_form_type_idx  on public.leads (form_type);

create unique index if not exists leads_waitlist_email_idx
  on public.leads (email) where form_type = 'waitlist';

alter table public.leads enable row level security;
-- No policies, deliberately. RLS on with zero policies means the anon and
-- authenticated roles can do nothing. The service role bypasses RLS, and it
-- only ever exists server-side in /api/leads.
