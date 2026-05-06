-- Migration: 002_contact_enquiry_tables.sql
-- Description: Creates tables for contact form submissions and service enquiries

-- 1. Create cozone_contact_messages table
CREATE TABLE IF NOT EXISTS cozone_contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company_name TEXT,
    phone TEXT,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'unread' -- unread, read, archived
);

-- 2. Create cozone_enquiries table
CREATE TABLE IF NOT EXISTS cozone_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'new' -- new, following_up, converted, closed
);

-- 3. Add RLS (Row Level Security) - typically we want these to be write-only for public
ALTER TABLE cozone_contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cozone_enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (adjust if you want strict service-role only)
-- Note: In this project, server.js uses createClient(url, SERVICE_KEY) which bypasses RLS.
-- But setting policies is good practice.

CREATE POLICY "Allow public insert to contact messages" ON cozone_contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to enquiries" ON cozone_enquiries FOR INSERT WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_email ON cozone_contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_enquiry_mobile ON cozone_enquiries(mobile);
CREATE INDEX IF NOT EXISTS idx_enquiry_service ON cozone_enquiries(service);
