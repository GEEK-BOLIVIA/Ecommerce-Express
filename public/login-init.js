import { supabase } from '../config/supabaseClient.js';
import { authService } from './services/authService.js';

let redireccionEjecutada = false;

async function iniciarFlujoAcceso(session) {
    if (redireccionEjecutada) return;

    try {
        redireccionEjecutada = true;

        // Pide el perfil a Express usando el token de Supabase
        const resultado = await authService.obtenerPerfil(session.access_token);

        if (!resultado.exito || resultado.tipo === 'denegado') {
            await supabase.auth.signOut();
            alert('Acceso denegado');
            window.location.href = './index.html';
            return;
        }

        const perfil = resultado.perfil;

        // Guardar en sessionStorage igual que antes
        sessionStorage.setItem('usuario_rol', perfil.rol);
        sessionStorage.setItem('usuario_nombre', perfil.nombres);
        sessionStorage.setItem('usuario_id', perfil.id);
        sessionStorage.setItem('access_token', session.access_token);

        // Redirigir según perfil completo o incompleto
        const camposRequeridos = ['ci', 'nombres', 'celular'];
        const incompleto = camposRequeridos.some(c => !perfil[c]);

        if (incompleto) {
            window.location.href = './registrar-usuario.html';
        } else {
            window.location.href = './administracion.html';
        }

    } catch (error) {
        console.error('Error en flujo de acceso:', error);
        redireccionEjecutada = false;
    }
}

document.addEventListener('DOMContentLoaded', async () => {

    supabase.auth.onAuthStateChange(async (event, session) => {
        if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
            if (window.location.hash)
                window.history.replaceState(null, null, window.location.pathname);

            if (!redireccionEjecutada)
                await iniciarFlujoAcceso(session);
        }

        if (event === 'SIGNED_OUT') redireccionEjecutada = false;
    });

    const { data: { session } } = await supabase.auth.getSession();
    if (session && !redireccionEjecutada) await iniciarFlujoAcceso(session);

    // Eventos de UI (igual que antes)
    const btnGoogle = document.getElementById('btn-google-auth');
    const togglePass = document.getElementById('toggle-password');
    const btnLogin = document.getElementById('btn-login');

    if (togglePass) {
        togglePass.addEventListener('click', () => {
            const input = document.getElementById('password');
            const icon = document.getElementById('password-icon');
            const isPass = input.type === 'password';
            input.type = isPass ? 'text' : 'password';
            icon.textContent = isPass ? 'visibility_off' : 'visibility';
        });
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', async () => {
            const email = document.getElementById('email').value.trim();
            const pass = document.getElementById('password').value.trim();
            if (!email || !pass) return alert('Completa los campos');

            const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
            if (error) alert(error.message);
        });
    }

    if (btnGoogle) {
        btnGoogle.addEventListener('click', async () => {
            redireccionEjecutada = false;
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: { redirectTo: window.location.origin + window.location.pathname }
            });
        });
    }
});