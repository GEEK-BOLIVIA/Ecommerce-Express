import { createClient } from '@supabase/supabase-js'

// Estas variables Laravel ya las inyecta en Vite automáticamente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("❌ Error: Las credenciales de Supabase no están definidas en el .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,   // Guarda la sesión en el navegador
    autoRefreshToken: true, // Mantiene la sesión activa
    detectSessionInUrl: true // Captura el #access_token de la URL de Google
  }
})
