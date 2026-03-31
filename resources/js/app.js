import './bootstrap';
import { supabase } from './config/supabaseClient';
import Swal from 'sweetalert2';

/**
 * 1. LÓGICA DE AUTENTICACIÓN (ESCUCHADOR DE SUPABASE)
 */
supabase.auth.onAuthStateChange(async (event, session) => {
    if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session) {
        try {
            const response = await fetch('/api/auth/supabase-verify', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    id: session.user.id,
                    email: session.user.email
                })
            });

            const result = await response.json();

            if (result.success) {
                if (window.location.pathname !== '/admin/dashboard') {
                    window.location.href = result.redirect;
                }
            } else {
                await supabase.auth.signOut();

                Swal.fire({
                    icon: 'error',
                    title: 'Acceso Restringido',
                    text: result.error || 'No tienes permisos para entrar aquí.',
                    confirmButtonColor: '#53B59D'
                });
            }
        } catch (error) {
            // Error de conexión o servidor caído
            Swal.fire({
                icon: 'error',
                title: 'Error de Conexión',
                text: 'No se pudo comunicar con el servidor de autenticación.',
                confirmButtonColor: '#53B59D'
            });
        }
    }
});

/**
 * 2. EVENTOS DE UI (BOTONES SOCIALES Y FORMULARIO)
 */
document.addEventListener('DOMContentLoaded', () => {
    const btnGoogle = document.getElementById('btn-google-auth');
    const btnFacebook = document.getElementById('btn-facebook-auth');
    const togglePass = document.getElementById('toggle-password');

    // Autenticación con Google
    if (btnGoogle) {
        btnGoogle.addEventListener('click', async () => {
            try {
                const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: window.location.origin + '/login'
                    }
                });
                if (error) throw error;
            } catch (err) {
                Swal.fire('Error', 'No se pudo abrir la ventana de Google.', 'error');
            }
        });
    }

    // Autenticación con Facebook
    if (btnFacebook) {
        btnFacebook.addEventListener('click', async () => {
            await supabase.auth.signInWithOAuth({
                provider: 'facebook',
                options: {
                    redirectTo: window.location.origin + '/login'
                }
            });
        });
    }

    // Toggle para mostrar/ocultar contraseña
    if (togglePass) {
        togglePass.addEventListener('click', () => {
            const input = document.getElementById('password');
            const icon = document.getElementById('password-icon');
            const isPass = input.type === 'password';

            input.type = isPass ? 'text' : 'password';
            icon.textContent = isPass ? 'visibility_off' : 'visibility';
        });
    }

    // Verificación manual de sesión (útil para redirects de OAuth)
    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (session && window.location.hash.includes('access_token')) {
            // El evento onAuthStateChange se dispara automáticamente al detectar el token
        }
    };

    checkSession();
});
