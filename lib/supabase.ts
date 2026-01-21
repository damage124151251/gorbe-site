import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (supabaseInstance) return supabaseInstance;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During build, return a dummy client
  if (!url || !key) {
    if (typeof window === 'undefined') {
      console.warn('[SUPABASE] Env vars not available during build');
      return createClient('https://placeholder.supabase.co', 'placeholder');
    }
    throw new Error('Missing Supabase environment variables');
  }

  supabaseInstance = createClient(url, key);
  return supabaseInstance;
}

// Types
export interface GorbeStats {
  id: number;
  total_messages: number;
  total_thoughts: number;
  uptime_hours: number;
  viewers_online: number;
  mood: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  message: string;
  response: string;
  created_at: string;
}

export interface Thought {
  id: string;
  content: string;
  mood: string;
  created_at: string;
}

// Functions
export async function getStats(): Promise<GorbeStats | null> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('gorbe_stats')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('[SUPABASE] getStats error:', error);
    return null;
  }
}

export async function updateStats(stats: Partial<GorbeStats>): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('gorbe_stats')
      .upsert({ id: 1, ...stats, updated_at: new Date().toISOString() });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[SUPABASE] updateStats error:', error);
    return false;
  }
}

export async function saveMessage(message: string, response: string): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('chat_messages')
      .insert({
        message,
        response,
        user_id: 'anonymous'
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[SUPABASE] saveMessage error:', error);
    return false;
  }
}

export async function saveThought(content: string, mood: string = 'neutral'): Promise<boolean> {
  try {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('thoughts')
      .insert({ content, mood });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('[SUPABASE] saveThought error:', error);
    return false;
  }
}

export async function getRecentThoughts(limit: number = 10): Promise<Thought[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('thoughts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('[SUPABASE] getRecentThoughts error:', error);
    return [];
  }
}

export async function getRecentMessages(limit: number = 50): Promise<ChatMessage[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('[SUPABASE] getRecentMessages error:', error);
    return [];
  }
}

// Realtime subscriptions
export function subscribeToStats(callback: (stats: GorbeStats) => void) {
  const supabase = getSupabase();
  return supabase
    .channel('stats')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'gorbe_stats' },
      (payload) => {
        callback(payload.new as GorbeStats);
      }
    )
    .subscribe();
}

export function subscribeToThoughts(callback: (thought: Thought) => void) {
  const supabase = getSupabase();
  return supabase
    .channel('thoughts')
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'thoughts' },
      (payload) => {
        callback(payload.new as Thought);
      }
    )
    .subscribe();
}
