import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
    if (supabaseInstance) return supabaseInstance;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        // During build, return a dummy client that won't break
        if (typeof window === 'undefined') {
            console.warn('[SUPABASE] Env vars not available during build');
            return createClient('https://placeholder.supabase.co', 'placeholder');
        }
        throw new Error('Missing Supabase environment variables');
    }

    supabaseInstance = createClient(url, key);
    return supabaseInstance;
}

// Export for compatibility
export const supabase = typeof window !== 'undefined' ? getSupabase() : null;
