-- Create chatbot knowledge base table
create table public.cozone_chatbot_knowledge (
  id uuid not null default gen_random_uuid (),
  category text null,
  title text null,
  keywords text[] null,
  description text null,
  created_at timestamp without time zone null default now(),
  embedding public.vector null,
  constraint cozone_chatbot_knowledge_pkey primary key (id)
) TABLESPACE pg_default;

-- Create index on category for faster queries
create index IF not exists cozone_category_idx on public.cozone_chatbot_knowledge using btree (category) TABLESPACE pg_default;

-- Create chatbot logs table
create table public.cozone_chatbot_logs (
  id uuid not null default gen_random_uuid (),
  user_query text null,
  bot_response text null,
  matched_category text null,
  created_at timestamp without time zone null default now(),
  source text null,
  match_score double precision null default 0,
  response_source text null default 'gemini'::text,
  constraint cozone_chatbot_logs_pkey primary key (id)
) TABLESPACE pg_default;

-- Create index on created_at for log queries
create index IF not exists cozone_logs_created_at_idx on public.cozone_chatbot_logs using btree (created_at desc) TABLESPACE pg_default;