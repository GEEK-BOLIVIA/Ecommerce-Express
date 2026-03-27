const { getSupabaseAdmin } = require('../config/supabaseClient');

const configuracionFrontendModel = {

    async obtenerTodas() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('configuraciones_sitio')
            .select('*');
        if (error) throw error;
        return data;
    },

    async actualizarConfiguracion(clave, nuevoValor) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('configuraciones_sitio')
            .update({ valor_actual: nuevoValor })
            .eq('clave', clave);
        if (error) throw error;
        return true;
    },

    async restaurarPorDefecto(clave) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data: config, error: fetchError } = await supabaseAdmin
            .from('configuraciones_sitio')
            .select('valor_defecto')
            .eq('clave', clave)
            .single();
        if (fetchError) throw fetchError;

        const { error: updateError } = await supabaseAdmin
            .from('configuraciones_sitio')
            .update({ valor_actual: config.valor_defecto })
            .eq('clave', clave);
        if (updateError) throw updateError;
        return config.valor_defecto;
    }
};

module.exports = configuracionFrontendModel;