import { createClient } from '@supabase/supabase-js';
import { authService } from './services/authService.js';

// ✅ Supabase se inicializa aquí directamente desde npm
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

let redireccionEjecutada = false;

async function iniciarFlujoAcceso(session) {
    if (redireccionEjecutada) return;
    try {
        redireccionEjecutada = true;
        console.log('1. Iniciando flujo, token:', session.access_token?.substring(0, 20));

        const resultado = await authService.obtenerPerfil(session.access_token);
        console.log('2. Resultado perfil:', resultado);

        if (!resultado.exito || resultado.tipo === 'denegado') {
            console.log('3. Acceso denegado, cerrando sesión');
            await supabase.auth.signOut();
            alert('Acceso denegado');
            window.location.href = '/';
            return;
        }

        const perfil = resultado.perfil;
        console.log('4. Perfil obtenido:', perfil);

        sessionStorage.setItem('usuario_rol', perfil.rol);
        sessionStorage.setItem('usuario_nombre', perfil.nombres);
        sessionStorage.setItem('usuario_id', perfil.id);
        sessionStorage.setItem('access_token', session.access_token);

        const camposRequeridos = ['ci', 'nombres', 'celular'];
        const incompleto = camposRequeridos.some(c => !perfil[c]);
        console.log('5. Redirigiendo a:', incompleto ? '/registrar-usuario' : '/administracion');

        window.location.href = incompleto ? '/registrar-usuario' : '/administracion';

    } catch (error) {
        console.error('ERROR en flujo de acceso:', error);
        redireccionEjecutada = false;
    }
}

const btnGoogle = document.getElementById('btn-google-auth');
const btnFacebook = document.getElementById('btn-facebook-auth');
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
            options: { redirectTo: window.location.origin + '/' }
        });
    });
}

if (btnFacebook) {
    btnFacebook.addEventListener('click', async () => {
        redireccionEjecutada = false;
        await supabase.auth.signInWithOAuth({
            provider: 'facebook',
            options: { redirectTo: window.location.origin + '/' }
        });
    });
}

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