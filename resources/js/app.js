import './bootstrap';
import { supabase } from './config/supabaseClient';
import Swal from 'sweetalert2';

// Flag para evitar que INITIAL_SESSION y SIGNED_IN se ejecuten dos veces
let authHandled = false;

supabase.auth.onAuthStateChange(async (event, session) => {
    // Solo procesar si hay sesión y no se ha manejado ya
    if (!session || authHandled) return;

    // INITIAL_SESSION sin token nuevo = usuario ya estaba logueado, ignorar
    // Solo actuar en SIGNED_IN (login activo) o si venimos de un redirect OAuth
    const isOAuthRedirect = window.location.hash.includes('access_token');

    if (event === 'INITIAL_SESSION' && !isOAuthRedirect) return;

    authHandled = true;

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
            window.location.href = result.redirect;
        } else {
            authHandled = false; // Resetear para permitir reintento
            await supabase.auth.signOut();
            Swal.fire({
                icon: 'error',
                title: 'Acceso Restringido',
                text: result.error || 'No tienes permisos para entrar aquí.',
                confirmButtonColor: '#53B59D'
            });
        }
    } catch (error) {
        authHandled = false;
        Swal.fire({
            icon: 'error',
            title: 'Error de Conexión',
            text: 'No se pudo comunicar con el servidor.',
            confirmButtonColor: '#53B59D'
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnGoogle = document.getElementById('btn-google-auth');
    const btnFacebook = document.getElementById('btn-facebook-auth');
    const togglePass = document.getElementById('toggle-password');

    if (btnGoogle) {
        btnGoogle.addEventListener('click', async () => {
            try {
                const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: { redirectTo: window.location.origin + '/login' }
                });
                if (error) throw error;
            } catch (err) {
                Swal.fire('Error', 'No se pudo abrir la ventana de Google.', 'error');
            }
        });
    }

    if (btnFacebook) {
        btnFacebook.addEventListener('click', async () => {
            await supabase.auth.signInWithOAuth({
                provider: 'facebook',
                options: { redirectTo: window.location.origin + '/login' }
            });
        });
    }

    if (togglePass) {
        togglePass.addEventListener('click', () => {
            const input = document.getElementById('password');
            const icon = document.getElementById('password-icon');
            const isPass = input.type === 'password';
            input.type = isPass ? 'text' : 'password';
            icon.textContent = isPass ? 'visibility_off' : 'visibility';
        });
    }
});
