-- Add url column to cozone_chatbot_knowledge table
ALTER TABLE public.cozone_chatbot_knowledge
ADD COLUMN IF NOT EXISTS url TEXT NULL;

-- Add index on url for faster queries
CREATE INDEX IF NOT EXISTS cozone_knowledge_url_idx ON public.cozone_chatbot_knowledge USING btree (url) TABLESPACE pg_default;