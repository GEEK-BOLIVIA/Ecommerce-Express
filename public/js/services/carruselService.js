const API_URL = '/api';

export const carruselService = {

    _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        };
    },

    async listar() {
        const res = await fetch(`${API_URL}/carruseles`, { headers: this._headers() });
        const json = await res.json();
        return json.data || [];
    },

    async obtenerItems(id) {
        const res = await fetch(`${API_URL}/carruseles/${id}/items`, { headers: this._headers() });
        const json = await res.json();
        return json.data || [];
    },

    async obtenerSiguienteOrden(slug) {
        const res = await fetch(`${API_URL}/carruseles/orden/${slug}`, { headers: this._headers() });
        const json = await res.json();
        return json.orden || 0;
    },

    async guardarCompleto(config, items, id = null) {
        const res = await fetch(`${API_URL}/carruseles/guardar`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ config, items, id })
        });
        return await res.json();
    },

    async eliminar(id) {
        const res = await fetch(`${API_URL}/carruseles/${id}`, {
            method: 'DELETE',
            headers: this._headers()
        });
        return await res.json();
    },

    async buscarRelacionados(tipo, termino) {
        const res = await fetch(`${API_URL}/carruseles/buscar?tipo=${tipo}&termino=${termino}`, {
            headers: this._headers()
        });
        const json = await res.json();
        return json.data || [];
    }
};