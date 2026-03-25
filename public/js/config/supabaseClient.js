import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const res = await fetch('/api/config');
const config = await res.json();

export const supabase = createClient(config.supabaseUrl, config.supabaseAnonKey);
export const getSupabase = () => supabase;