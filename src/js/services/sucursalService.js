const API_URL = '/api';

export const sucursalService = {

    _getToken() {
        return sessionStorage.getItem('access_token');
    },

    _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this._getToken()}`
        };
    },

    async getAll() {
        const res = await fetch(`${API_URL}/sucursales`, { headers: this._headers() });
        const json = await res.json();
        return json.data || [];
    },

    async getById(id) {
        const res = await fetch(`${API_URL}/sucursales/${id}`, { headers: this._headers() });
        const json = await res.json();
        return json.data || null;
    },

    async create(datos) {
        const res = await fetch(`${API_URL}/sucursales`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify(datos)
        });
        return await res.json();
    },

    async update(id, datos) {
        const res = await fetch(`${API_URL}/sucursales/${id}`, {
            method: 'PUT',
            headers: this._headers(),
            body: JSON.stringify(datos)
        });
        return await res.json();
    },

    async delete(id) {
        const res = await fetch(`${API_URL}/sucursales/${id}`, {
            method: 'DELETE',
            headers: this._headers()
        });
        return await res.json();
    }
};