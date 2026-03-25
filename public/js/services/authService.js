const API_URL = '/api';

export const authService = {

    async obtenerPerfil(token) {
        const res = await fetch(`${API_URL}/usuarios/perfil`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return await res.json();
    },

    async obtenerWhitelist(token) {
        const res = await fetch(`${API_URL}/usuarios/whitelist/pendientes`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        return await res.json();
    }
};