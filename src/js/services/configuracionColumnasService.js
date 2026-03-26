const API_URL = '/api';

export const configuracionColumnasService = {

    _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        };
    },

    async obtener(tabla, usuarioId = null, rolId = null) {
        const params = new URLSearchParams();
        if (usuarioId) params.append('usuario_id', usuarioId);
        if (rolId) params.append('rol_id', rolId);

        const res = await fetch(`${API_URL}/configuracion-columnas/${tabla}?${params}`, {
            headers: this._headers()
        });
        const json = await res.json();
        return json.data || null;
    },

    async guardar(payload) {
        const res = await fetch(`${API_URL}/configuracion-columnas`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify(payload)
        });
        return await res.json();
    },

    async resetear(tabla, tipo, id) {
        const res = await fetch(`${API_URL}/configuracion-columnas/${tabla}?tipo=${tipo}&id=${id}`, {
            method: 'DELETE',
            headers: this._headers()
        });
        return await res.json();
    }
};