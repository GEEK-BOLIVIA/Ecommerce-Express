const { createClient } = require('@supabase/supabase-js');

let supabase;
let supabaseAdmin;

const getSupabase = () => {
    if (!supabase) {
        supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        );
    }
    return supabase;
};

const getSupabaseAdmin = () => {
    if (!supabaseAdmin) {
        supabaseAdmin = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_SERVICE_KEY
        );
    }
    return supabaseAdmin;
};

module.exports = { getSupabase, getSupabaseAdmin };