const { getSupabaseAdmin } = require('../config/supabaseClient');

const paletaColorModel = {

    async obtenerTodas() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('paletas_colores')
            .select('*')
            .eq('visible', true)
            .order('id', { ascending: true });
        if (error) throw error;
        return data;
    },

    async crear(paleta) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('paletas_colores')
            .insert([{ ...paleta, visible: true }])
            .select();
        if (error) throw error;
        return data[0];
    },

    async actualizar(id, datos) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('paletas_colores')
            .update({
                nombre: datos.nombre,
                primary_color: datos.primary_color,
                secondary_color: datos.secondary_color,
                accent_color: datos.accent_color,
                primary_dark_color: datos.primary_dark_color,
                background_light_color: datos.background_light_color,
                background_dark_color: datos.background_dark_color,
                surface_dark_color: datos.surface_dark_color
            })
            .eq('id', Number(id))
            .select();
        if (error) throw error;
        return data[0];
    },

    async eliminar(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('paletas_colores')
            .update({ visible: false })
            .eq('id', Number(id));
        if (error) throw error;
        return true;
    },

    async activar(id) {
        const supabaseAdmin = getSupabaseAdmin();
        await supabaseAdmin
            .from('paletas_colores')
            .update({ es_activa: false })
            .eq('es_activa', true);

        const { data, error } = await supabaseAdmin
            .from('paletas_colores')
            .update({ es_activa: true })
            .eq('id', Number(id))
            .select();
        if (error) throw error;
        return data[0];
    }
};

module.exports = paletaColorModel;