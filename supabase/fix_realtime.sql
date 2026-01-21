-- Enable Realtime for tables
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.gorbe_stats;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.chat_messages;
ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.thoughts;

-- REPLICA IDENTITY for realtime updates
ALTER TABLE public.gorbe_stats REPLICA IDENTITY FULL;
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;
ALTER TABLE public.thoughts REPLICA IDENTITY FULL;

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.gorbe_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.thoughts;
