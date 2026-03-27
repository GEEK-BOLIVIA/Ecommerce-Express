const { getSupabaseAdmin } = require('../config/supabaseClient');

const departamentoModel = {

    async obtenerTodos() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('departamentos')
            .select('*')
            .order('nombre', { ascending: true });
        if (error) throw error;
        return data;
    },

    async obtenerPorId(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('departamentos')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    async crear(datos) {
        const supabaseAdmin = getSupabaseAdmin();
        const { nombre, slug, lat, lng, zoom_sugerido } = datos;
        const { data, error } = await supabaseAdmin
            .from('departamentos')
            .insert([{ nombre, slug, lat, lng, zoom_sugerido }])
            .select();
        if (error) throw error;
        return data[0];
    },

    async actualizar(id, datos) {
        const supabaseAdmin = getSupabaseAdmin();
        const { nombre, slug, lat, lng, zoom_sugerido } = datos;
        const { data, error } = await supabaseAdmin
            .from('departamentos')
            .update({ nombre, slug, lat, lng, zoom_sugerido })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async eliminar(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('departamentos')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }
};

module.exports = departamentoModel;