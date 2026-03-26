const supabase = require('../config/supabaseClient');

const paletaColorModel = {

    async obtenerTodas() {
        try {
            const { data, error } = await supabase
                .from('paletas_colores')
                .select('*')
                .eq('visible', true)
                .order('id', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener paletas:', error.message);
            return [];
        }
    },

    async crear(paleta) {
        try {
            const { data, error } = await supabase
                .from('paletas_colores')
                .insert([{ ...paleta, visible: true }])
                .select();

            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async actualizar(id, datos) {
        try {
            const { data, error } = await supabase
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
            return { exito: true, data: data[0] };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async eliminar(id) {
        try {
            const { error } = await supabase
                .from('paletas_colores')
                .update({ visible: false })
                .eq('id', Number(id));

            if (error) throw error;
            return { exito: true };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async activar(id) {
        try {
            await supabase
                .from('paletas_colores')
                .update({ es_activa: false })
                .eq('es_activa', true);

            const { data, error } = await supabase
                .from('paletas_colores')
                .update({ es_activa: true })
                .eq('id', Number(id))
                .select();

            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    }
};

module.exports = paletaColorModel;