const supabase = require('../config/supabaseClient');

const configuracionColumnasModel = {

    async obtenerConfiguracion(tablaNombre, usuarioId = null, rolId = null) {
        try {
            let query = supabase
                .from('configuracion_columnas')
                .select('columnas_visibles')
                .eq('tabla_nombre', tablaNombre);

            if (usuarioId) {
                query = query.eq('usuario_id', usuarioId).is('rol_id', null);
            } else if (rolId) {
                query = query.eq('rol_id', rolId).is('usuario_id', null);
            }

            const { data, error } = await query;
            if (error) throw error;
            if (data && data.length > 0) return data[0].columnas_visibles;
            return null;
        } catch (err) {
            console.error('Error al obtener configuración:', err.message);
            return null;
        }
    },

    async guardarConfiguracion(config) {
        try {
            const esUsuario = !!(config.usuario_id && config.usuario_id !== 'null');

            const payload = {
                tabla_nombre: config.tabla_nombre,
                columnas_visibles: config.columnas_visibles,
                usuario_id: esUsuario ? config.usuario_id : null,
                rol_id: esUsuario ? null : config.rol_id
            };

            const columnasConflicto = esUsuario
                ? 'tabla_nombre,usuario_id'
                : 'tabla_nombre,rol_id';

            const { error } = await supabase
                .from('configuracion_columnas')
                .upsert(payload, { onConflict: columnasConflicto });

            if (error) throw error;
            return { exito: true };
        } catch (err) {
            console.error('Error en guardarConfiguracion:', err.message);
            return { exito: false, mensaje: err.message };
        }
    },

    async resetearConfiguracion(tablaNombre, destinoTipo, destinoId) {
        try {
            let query = supabase
                .from('configuracion_columnas')
                .delete()
                .eq('tabla_nombre', tablaNombre);

            if (destinoTipo === 'usuario') {
                query = query.eq('usuario_id', destinoId);
            } else {
                query = query.eq('rol_id', destinoId);
            }

            const { error } = await query;
            if (error) throw error;
            return { exito: true };
        } catch (err) {
            console.error('Error al resetear:', err.message);
            return { exito: false, mensaje: err.message };
        }
    }
};

module.exports = configuracionColumnasModel;