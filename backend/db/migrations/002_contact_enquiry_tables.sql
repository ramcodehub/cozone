-- Create cozone enquiries table
create table public.cozone_enquiries (
  id uuid not null default gen_random_uuid (),
  full_name text null,
  mobile text null,
  email text null,
  message text null,
  service text null,
  created_at timestamp with time zone null default now(),
  constraint cozone_enquiries_pkey primary key (id)
) TABLESPACE pg_default;

-- Create cozone contact messages table
create table public.cozone_contact_messages (
  id uuid not null default gen_random_uuid (),
  full_name text null,
  email text null,
  company_name text null,
  phone text null,
  message text null,
  created_at timestamp with time zone null default now(),
  constraint cozone_contact_messages_pkey primary key (id)
) TABLESPACE pg_default; 