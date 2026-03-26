const API_URL = '/api';

export const configuracionFrontendService = {

    _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        };
    },

    async obtenerTodas() {
        const res = await fetch(`${API_URL}/configuracion-frontend`, {
            headers: this._headers()
        });
        const json = await res.json();
        return json.data || [];
    },

    async actualizar(clave, valor) {
        const res = await fetch(`${API_URL}/configuracion-frontend/${clave}`, {
            method: 'PUT',
            headers: this._headers(),
            body: JSON.stringify({ valor })
        });
        return await res.json();
    },

    async restaurar(clave) {
        const res = await fetch(`${API_URL}/configuracion-frontend/${clave}/restaurar`, {
            method: 'POST',
            headers: this._headers()
        });
        return await res.json();
    }
};