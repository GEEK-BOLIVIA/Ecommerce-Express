const API_URL = '/api';

export const paletaColorService = {

    _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        };
    },

    async obtenerTodas() {
        const res = await fetch(`${API_URL}/paletas`, { headers: this._headers() });
        const json = await res.json();
        return json.data || [];
    },

    async crear(datos) {
        const res = await fetch(`${API_URL}/paletas`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify(datos)
        });
        return await res.json();
    },

    async actualizar(id, datos) {
        const res = await fetch(`${API_URL}/paletas/${id}`, {
            method: 'PUT',
            headers: this._headers(),
            body: JSON.stringify(datos)
        });
        return await res.json();
    },

    async activar(id) {
        const res = await fetch(`${API_URL}/paletas/${id}/activar`, {
            method: 'PUT',
            headers: this._headers()
        });
        return await res.json();
    },

    async eliminar(id) {
        const res = await fetch(`${API_URL}/paletas/${id}`, {
            method: 'DELETE',
            headers: this._headers()
        });
        return await res.json();
    }
};