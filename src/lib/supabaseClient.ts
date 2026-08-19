import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id')
);

// Fallback dummy URL/Key if user has not yet populated .env, preventing instant crash
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://mock-phy-ip.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'mock-anon-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    }
  }
);