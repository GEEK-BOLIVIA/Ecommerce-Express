const supabase = require('../config/supabaseClient');

const importacionModel = {

    async obtenerNombresExistentes() {
        try {
            const { data, error } = await supabase
                .from('producto')
                .select('nombre');

            if (error) throw error;

            return new Set(
                data
                    .filter(p => p.nombre)
                    .map(p => p.nombre.toLowerCase().trim())
            );
        } catch (error) {
            console.error('Error al obtener nombres existentes:', error.message);
            return new Set();
        }
    },

    async buscarCategoria(nombre, idPadre) {
        try {
            if (!nombre) return null;

            let query = supabase
                .from('categoria')
                .select('id')
                .ilike('nombre', nombre.trim());

            if (idPadre === null) {
                query = query.is('id_padre', null);
            } else {
                query = query.eq('id_padre', idPadre);
            }

            const { data, error } = await query.maybeSingle();
            if (error) throw error;
            return data;
        } catch (error) {
            console.warn(`Error buscando categoría ${nombre}:`, error.message);
            return null;
        }
    }
};

module.exports = importacionModel;