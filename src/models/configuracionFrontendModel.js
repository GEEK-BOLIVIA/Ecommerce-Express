const supabase = require('../config/supabaseClient');

const configuracionFrontendModel = {

    async obtenerTodas() {
        try {
            const { data, error } = await supabase
                .from('configuraciones_sitio')
                .select('*');

            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Error al obtener configuraciones:', err.message);
            return null;
        }
    },

    async actualizarConfiguracion(clave, nuevoValor) {
        try {
            const { error } = await supabase
                .from('configuraciones_sitio')
                .update({ valor_actual: nuevoValor })
                .eq('clave', clave);

            if (error) throw error;
            return { exito: true };
        } catch (err) {
            return { exito: false, mensaje: err.message };
        }
    },

    async restaurarPorDefecto(clave) {
        try {
            const { data: config, error: fetchError } = await supabase
                .from('configuraciones_sitio')
                .select('valor_defecto')
                .eq('clave', clave)
                .single();

            if (fetchError) throw fetchError;

            const { error: updateError } = await supabase
                .from('configuraciones_sitio')
                .update({ valor_actual: config.valor_defecto })
                .eq('clave', clave);

            if (updateError) throw updateError;
            return { exito: true, valorRestaurado: config.valor_defecto };
        } catch (err) {
            console.error('Error al restaurar:', err.message);
            return { exito: false, mensaje: err.message };
        }
    }
};

module.exports = configuracionFrontendModel;