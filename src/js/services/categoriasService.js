const API_URL = '/api';

export const categoriasService = {

    _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        };
    },

    async obtenerTodas() {
        const res = await fetch(`${API_URL}/categorias`, { headers: this._headers() });
        const json = await res.json();
        return json.data || [];
    },

    async obtenerPorId(id) {
        const res = await fetch(`${API_URL}/categorias/${id}`, { headers: this._headers() });
        const json = await res.json();
        return json.data || null;
    },

    async crear(datos) {
        const res = await fetch(`${API_URL}/categorias`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify(datos)
        });
        return await res.json();
    },

    async actualizar(id, datos) {
        const res = await fetch(`${API_URL}/categorias/${id}`, {
            method: 'PUT',
            headers: this._headers(),
            body: JSON.stringify(datos)
        });
        return await res.json();
    },

    async eliminar(id) {
        const res = await fetch(`${API_URL}/categorias/${id}`, {
            method: 'DELETE',
            headers: this._headers()
        });
        return await res.json();
    },

    async buscarPorNombre(termino) {
        const res = await fetch(`${API_URL}/categorias/buscar?termino=${termino}`, {
            headers: this._headers()
        });
        const json = await res.json();
        return json.data || [];
    }
};