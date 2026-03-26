const API_URL = '/api';

export const importacionService = {

    _headers() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
        };
    },

    async validarNombres(nombres) {
        const res = await fetch(`${API_URL}/importacion/validar-nombres`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ nombres })
        });
        return await res.json();
    },

    async procesarCarga(datos) {
        const res = await fetch(`${API_URL}/importacion/procesar`, {
            method: 'POST',
            headers: this._headers(),
            body: JSON.stringify({ datos })
        });
        return await res.json();
    }
};