-- Gorbe Stats Table
CREATE TABLE IF NOT EXISTS gorbe_stats (
    id INT PRIMARY KEY DEFAULT 1,
    total_messages INT DEFAULT 0,
    total_thoughts INT DEFAULT 0,
    uptime_hours INT DEFAULT 0,
    viewers_online INT DEFAULT 0,
    mood TEXT DEFAULT 'Neutral',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial record
INSERT INTO gorbe_stats (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Chat Messages Table
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT DEFAULT 'anonymous',
    message TEXT NOT NULL,
    response TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Thoughts Table
CREATE TABLE IF NOT EXISTS thoughts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content TEXT NOT NULL,
    mood TEXT DEFAULT 'neutral',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_thoughts_created_at ON thoughts(created_at DESC);

-- Enable RLS
ALTER TABLE gorbe_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE thoughts ENABLE ROW LEVEL SECURITY;

-- Policies (allow public read)
DROP POLICY IF EXISTS "public_read_stats" ON gorbe_stats;
CREATE POLICY "public_read_stats" ON gorbe_stats FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_messages" ON chat_messages;
CREATE POLICY "public_read_messages" ON chat_messages FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_insert_messages" ON chat_messages;
CREATE POLICY "public_insert_messages" ON chat_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "public_read_thoughts" ON thoughts;
CREATE POLICY "public_read_thoughts" ON thoughts FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_insert_thoughts" ON thoughts;
CREATE POLICY "public_insert_thoughts" ON thoughts FOR INSERT WITH CHECK (true);
