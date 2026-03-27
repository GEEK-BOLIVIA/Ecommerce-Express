const { getSupabaseAdmin } = require('../config/supabaseClient');

const SELECT_CON_JOINS = `
    *,
    usuario:id_usuario (id, nombres, apellido_paterno, apellido_materno, correo_electronico),
    departamento:id_departamento (id, nombre, slug)
`;

const direccionModel = {

    async obtenerTodas() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('direcciones')
            .select(SELECT_CON_JOINS)
            .order('creado_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async obtenerPorId(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('direcciones')
            .select(SELECT_CON_JOINS)
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    async obtenerClientes() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('usuario')
            .select('id, nombres, apellido_paterno, apellido_materno, correo_electronico, ci')
            .eq('rol', 'cliente')
            .eq('visible', true)
            .order('ci', { ascending: true });
        if (error) throw error;
        return data;
    },

    async crear(datos) {
        const supabaseAdmin = getSupabaseAdmin();
        const { id_usuario, id_departamento, nombre_lugar, lat, lng, referencia, direccion_texto, es_principal } = datos;
        const { data, error } = await supabaseAdmin
            .from('direcciones')
            .insert([{ id_usuario, id_departamento, nombre_lugar, lat, lng, referencia, direccion_texto, es_principal }])
            .select();
        if (error) throw error;
        return data[0];
    },

    async actualizar(id, datos) {
        const supabaseAdmin = getSupabaseAdmin();
        const { id_usuario, id_departamento, nombre_lugar, lat, lng, referencia, direccion_texto, es_principal } = datos;
        const { data, error } = await supabaseAdmin
            .from('direcciones')
            .update({ id_usuario, id_departamento, nombre_lugar, lat, lng, referencia, direccion_texto, es_principal })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async eliminar(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('direcciones')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }
};

module.exports = direccionModel;