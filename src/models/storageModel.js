const supabase = require('../config/supabaseClient');

const storageModel = {

    async subirArchivo(path, buffer, mimetype) {
        const { data, error } = await supabase.storage
            .from('Almacenamiento')
            .upload(path, buffer, {
                contentType: mimetype,
                cacheControl: '3600',
                upsert: true
            });

        if (error) throw error;
        return data;
    },

    obtenerUrlPublica(path) {
        const { data } = supabase.storage
            .from('Almacenamiento')
            .getPublicUrl(path);

        return data.publicUrl;
    },

    async eliminarArchivo(path) {
        const { error } = await supabase.storage
            .from('Almacenamiento')
            .remove([path]);

        if (error) console.warn('No se pudo eliminar archivo:', error.message);
    }
};

module.exports = storageModel;