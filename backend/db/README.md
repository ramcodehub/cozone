# CoZone Chatbot Database Schema

This directory contains the database schema and migration scripts for the CoZone AI Assistant chatbot functionality.

## Tables

### 1. cozone_chatbot_knowledge

Stores knowledge base entries for the chatbot to reference when answering user questions.

```sql
create table public.cozone_chatbot_knowledge (
  id uuid not null default gen_random_uuid (),
  category text null,
  title text null,
  keywords text[] null,
  description text null,
  created_at timestamp without time zone null default now(),
  embedding public.vector null,
  constraint cozone_chatbot_knowledge_pkey primary key (id)
);
```

**Columns:**
- `id`: Unique identifier (UUID)
- `category`: Category of the knowledge entry (e.g., "pricing", "services", "amenities")
- `title`: Title of the knowledge entry
- `keywords`: Array of keywords associated with this entry
- `description`: Detailed description/information
- `created_at`: Timestamp when the entry was created
- `embedding`: Vector embedding for similarity search (used with pgvector)

**Indexes:**
- `cozone_category_idx`: B-tree index on the category column for faster queries

### 2. cozone_chatbot_logs

Stores logs of chatbot interactions for analytics and improvement.

```sql
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
);
```

**Columns:**
- `id`: Unique identifier (UUID)
- `user_query`: The user's original query
- `bot_response`: The chatbot's response
- `matched_category`: Category of knowledge that was used to generate the response
- `created_at`: Timestamp of the interaction
- `source`: Source of the knowledge (e.g., "knowledge_base", "gemini")
- `match_score`: Confidence score of the match (0-1)
- `response_source`: Which AI service generated the response ("gemini", etc.)

**Indexes:**
- `cozone_logs_created_at_idx`: B-tree index on created_at (descending) for recent logs queries

## Usage

To set up these tables in your Supabase database:

1. Navigate to your Supabase project dashboard
2. Go to the SQL Editor
3. Copy and run the contents of `migrations/001_chatbot_tables.sql`

## Services

The `chatbotService.js` file in the backend services directory provides functions to interact with these tables:

- `insertKnowledgeEntry(knowledgeData)`: Insert a new knowledge base entry
- `searchKnowledgeByCategory(category)`: Search knowledge entries by category
- `searchKnowledgeByKeywords(keywords)`: Search knowledge entries by keywords
- `insertChatbotLog(logData)`: Insert a new chatbot log entry
- `getRecentLogs(limit)`: Get recent chatbot logs