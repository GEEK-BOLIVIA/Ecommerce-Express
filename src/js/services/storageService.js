const API_URL = '/api';

export const storageService = {

    _token() {
        return sessionStorage.getItem('access_token');
    },

    async subirImagen(file, carpeta = 'varios') {
        const formData = new FormData();
        formData.append('archivo', file);
        formData.append('carpeta', carpeta);

        const res = await fetch(`${API_URL}/storage/subir`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${this._token()}` },
            body: formData
        });
        return await res.json();
    },

    async eliminarArchivo(path) {
        const res = await fetch(`${API_URL}/storage/eliminar`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this._token()}`
            },
            body: JSON.stringify({ path })
        });
        return await res.json();
    }
};