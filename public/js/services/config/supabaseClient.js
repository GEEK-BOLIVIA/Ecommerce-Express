import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const supabase = createClient(
    'https://tuproyecto.supabase.co',
    'tu-anon-key-publica'
);