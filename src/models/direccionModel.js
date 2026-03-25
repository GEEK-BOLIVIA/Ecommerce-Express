const supabase = require('../config/supabaseClient');

const SELECT_CON_JOINS = `
    *,
    usuario:id_usuario (
        id,
        nombres,
        apellido_paterno,
        apellido_materno,
        correo_electronico
    ),
    departamento:id_departamento (
        id,
        nombre,
        slug
    )
`;

const direccionModel = {

    async obtenerTodas() {
        try {
            const { data, error } = await supabase
                .from('direcciones')
                .select(SELECT_CON_JOINS)
                .order('creado_at', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener direcciones:', error.message);
            return [];
        }
    },

    async obtenerPorId(id) {
        try {
            const { data, error } = await supabase
                .from('direcciones')
                .select(SELECT_CON_JOINS)
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Error al obtener dirección ${id}:`, error.message);
            return null;
        }
    },

    async obtenerClientes() {
        try {
            const { data, error } = await supabase
                .from('usuario')
                .select('id, nombres, apellido_paterno, apellido_materno, correo_electronico, ci')
                .eq('rol', 'cliente')
                .eq('visible', true)
                .order('ci', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener clientes:', error.message);
            return [];
        }
    },

    async crear(datos) {
        try {
            const { id_usuario, id_departamento, nombre_lugar, lat, lng, referencia, direccion_texto, es_principal } = datos;
            const { data, error } = await supabase
                .from('direcciones')
                .insert([{ id_usuario, id_departamento, nombre_lugar, lat, lng, referencia, direccion_texto, es_principal }])
                .select();

            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async actualizar(id, datos) {
        try {
            const { id_usuario, id_departamento, nombre_lugar, lat, lng, referencia, direccion_texto, es_principal } = datos;
            const { data, error } = await supabase
                .from('direcciones')
                .update({ id_usuario, id_departamento, nombre_lugar, lat, lng, referencia, direccion_texto, es_principal })
                .eq('id', id)
                .select();

            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async eliminar(id) {
        try {
            const { error } = await supabase
                .from('direcciones')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return { exito: true };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    }
};

module.exports = direccionModel;