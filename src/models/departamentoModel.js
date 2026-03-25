const supabase = require('../config/supabaseClient');

const departamentoModel = {

    async obtenerTodos() {
        try {
            const { data, error } = await supabase
                .from('departamentos')
                .select('*')
                .order('nombre', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener departamentos:', error.message);
            return [];
        }
    },

    async obtenerPorId(id) {
        try {
            const { data, error } = await supabase
                .from('departamentos')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Error al obtener departamento ${id}:`, error.message);
            return null;
        }
    },

    async crear(datos) {
        try {
            const { nombre, slug, lat, lng, zoom_sugerido } = datos;
            const { data, error } = await supabase
                .from('departamentos')
                .insert([{ nombre, slug, lat, lng, zoom_sugerido }])
                .select();

            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async actualizar(id, datos) {
        try {
            const { nombre, slug, lat, lng, zoom_sugerido } = datos;
            const { data, error } = await supabase
                .from('departamentos')
                .update({ nombre, slug, lat, lng, zoom_sugerido })
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
                .from('departamentos')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return { exito: true };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    }
};

module.exports = departamentoModel;