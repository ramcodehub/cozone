-- Migration: Update CoZone Chatbot Logs for AI Analytics
-- Execute this in the Supabase SQL Editor

-- 1. Add missing columns to cozone_chatbot_logs
ALTER TABLE IF EXISTS cozone_chatbot_logs
ADD COLUMN IF NOT EXISTS session_id TEXT,
ADD COLUMN IF NOT EXISTS user_message TEXT,
ADD COLUMN IF NOT EXISTS ai_response TEXT,
ADD COLUMN IF NOT EXISTS model_used TEXT,
ADD COLUMN IF NOT EXISTS provider TEXT DEFAULT 'openrouter',
ADD COLUMN IF NOT EXISTS response_time_ms INTEGER,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'success',
ADD COLUMN IF NOT EXISTS error_message TEXT;

-- 2. Rename old columns if they exist (backward compatibility)
-- If your old table used 'user_query' and 'bot_response', we keep them or map them
-- For this migration, we assume the new structure in chatbotService.js

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_chatbot_logs_session_id ON cozone_chatbot_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_logs_created_at ON cozone_chatbot_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_chatbot_logs_status ON cozone_chatbot_logs(status);

-- 4. Enable RLS if not already enabled
-- ALTER TABLE cozone_chatbot_logs ENABLE ROW LEVEL SECURITY;

-- 5. Add a simple policy for service-role access (if needed)
-- CREATE POLICY "Allow all for service role" ON cozone_chatbot_logs
-- FOR ALL USING (auth.role() = 'service_role');
