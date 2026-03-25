const configuracionColumnasModel = require('../models/configuracionColumnasModel');

const configuracionColumnasController = {

    async obtener(req, res) {
        try {
            const { tabla } = req.params;
            const { usuario_id, rol_id } = req.query;

            const columnas = await configuracionColumnasModel.obtenerConfiguracion(
                tabla,
                usuario_id || null,
                rol_id || null
            );

            return res.status(200).json({ exito: true, data: columnas });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async guardar(req, res) {
        try {
            const resultado = await configuracionColumnasModel.guardarConfiguracion(req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async resetear(req, res) {
        try {
            const { tabla } = req.params;
            const { tipo, id } = req.query;

            if (!tipo || !id)
                return res.status(400).json({ exito: false, mensaje: 'tipo e id son requeridos' });

            const resultado = await configuracionColumnasModel.resetearConfiguracion(tabla, tipo, id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

module.exports = configuracionColumnasController;