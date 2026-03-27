const { getSupabaseAdmin } = require('../config/supabaseClient');

const importacionModel = {

    async obtenerNombresExistentes() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('producto')
            .select('nombre');
        if (error) throw error;
        return new Set(
            data
                .filter(p => p.nombre)
                .map(p => p.nombre.toLowerCase().trim())
        );
    },

    async buscarCategoria(nombre, idPadre) {
        const supabaseAdmin = getSupabaseAdmin();
        if (!nombre) return null;
        let query = supabaseAdmin
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
    }
};

module.exports = importacionModel;