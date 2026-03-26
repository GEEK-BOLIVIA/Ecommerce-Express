const API_URL = '/api';

export const direccionService = {

    _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        };
    },

    async obtenerTodas() {
        const res = await fetch(`${API_URL}/direcciones`, { headers: this._headers() });
        const json = await res.json();
        return json.data || [];
    },

    async obtenerPorId(id) {
        const res = await fetch(`${API_URL}/direcciones/${id}`, { headers: this._headers() });
        const json = await res.json();
        return json.data || null;
    },

    async obtenerClientes() {
        const res = await fetch(`${API_URL}/direcciones/clientes`, { headers: this._headers() });
        const json = await res.json();
        return json.data || [];
    },

    async crear(datos) {
        const res = await fetch(`${API_URL}/direcciones`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify(datos)
        });
        return await res.json();
    },

    async actualizar(id, datos) {
        const res = await fetch(`${API_URL}/direcciones/${id}`, {
            method: 'PUT',
            headers: this._headers(),
            body: JSON.stringify(datos)
        });
        return await res.json();
    },

    async eliminar(id) {
        const res = await fetch(`${API_URL}/direcciones/${id}`, {
            method: 'DELETE',
            headers: this._headers()
        });
        return await res.json();
    }
};