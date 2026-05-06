# CoZone Backend

This is the backend service for handling AI chatbot functionality in the CoZone application. It provides API endpoints to power the AI assistant.

## Features

- AI Chatbot API endpoint with session management
- Data validation and sanitization
- Supabase integration for data storage
- Environment variable configuration
- Error handling and logging
- Chatbot knowledge base with searchable entries
- Chatbot interaction logging

## Tech Stack

- Node.js
- Express.js
- Supabase (Database)
- Google Generative AI (Gemini)

- Dotenv (Environment Variables)

## Project Structure

```
backend/
├── package.json
├── server.js              # Main server file
├── .env.example           # Environment variables template
├── routes/
│   └── aiRoutes.js        # AI chatbot routes
├── controllers/
│   └── aiController.js       # AI chatbot request handlers
├── services/
│   ├── supabaseService.js    # Supabase database operations
│   ├── aiService.js          # AI processing functionality
├── utils/
│   ├── validateFields.js     # Input validation utilities
│   └── sanitizeInput.js      # Input sanitization utilities
├── db/
│   ├── migrations/           # Database schema migrations
│   └── seeds/               # Database seed scripts
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend root directory based on `.env.example`:

```bash
cp .env.example .env
```

Then update the `.env` file with your actual credentials:

#### Supabase Configuration
1. Sign up at [Supabase](https://supabase.io/)
2. Create a new project
3. Get your Project URL and Service Role Key from Settings > API
4. Update `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in your `.env` file


#### Google Generative AI Configuration
1. Get an API key from [Google AI Studio](https://aistudio.google.com/)
2. Update `GEMINI_API_KEY` in your `.env` file

### 3. Set Up Supabase Tables


#### Chatbot Tables
In your Supabase SQL editor, run the following queries to create the chatbot tables:

```sql
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
```

### 4. Seed Initial Knowledge Base Data

Run the seed script to populate the chatbot knowledge base with initial data:

```bash
node db/seeds/001_initial_knowledge.js
```

### 5. Run the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on port 5000 (or your specified PORT in .env).

## API Endpoints

### POST /api/ai

Submit AI chatbot requests.

**Request Body:**
```json
{
  "message": "What are your pricing options?",
  "sessionId": "unique-session-id"
}
```

**Response:**
```json
{
  "success": true,
  "response": "We offer several pricing options...",
  "sessionId": "unique-session-id"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message"
}
```

For the AI chatbot, it's already configured to use `https://cozone-backend.onrender.com/api/ai`.

## Database Schema

See `db/README.md` for detailed information about the database schema and tables.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request