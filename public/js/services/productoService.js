const API_URL = '/api';

export const productoService = {

    _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        };
    },

    async listar(sucursal = 'todas') {
        const res = await fetch(`${API_URL}/productos?sucursal=${sucursal}`, {
            headers: this._headers()
        });
        const json = await res.json();
        return json.data || [];
    },

    async obtenerPorId(id) {
        const res = await fetch(`${API_URL}/productos/${id}`, {
            headers: this._headers()
        });
        const json = await res.json();
        return json.data || null;
    },

    async crear(payload) {
        const res = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify(payload)
        });
        return await res.json();
    },

    async actualizar(id, payload) {
        const res = await fetch(`${API_URL}/productos/${id}`, {
            method: 'PUT',
            headers: this._headers(),
            body: JSON.stringify(payload)
        });
        return await res.json();
    },

    async eliminar(id) {
        const res = await fetch(`${API_URL}/productos/${id}`, {
            method: 'DELETE',
            headers: this._headers()
        });
        return await res.json();
    },

    async actualizarVarios(ids, datos) {
        const res = await fetch(`${API_URL}/productos/varios`, {
            method: 'PUT',
            headers: this._headers(),
            body: JSON.stringify({ ids, datos })
        });
        return await res.json();
    },

    async buscarPorNombre(termino) {
        const res = await fetch(`${API_URL}/productos/buscar?termino=${termino}`, {
            headers: this._headers()
        });
        const json = await res.json();
        return json.data || [];
    }
};