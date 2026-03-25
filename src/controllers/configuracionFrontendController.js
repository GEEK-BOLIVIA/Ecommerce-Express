const configuracionFrontendModel = require('../models/configuracionFrontendModel');

const configuracionFrontendController = {

    async obtenerTodas(req, res) {
        try {
            const data = await configuracionFrontendModel.obtenerTodas();
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async actualizar(req, res) {
        try {
            const { clave } = req.params;
            const { valor } = req.body;

            if (!valor)
                return res.status(400).json({ exito: false, mensaje: 'El valor es requerido' });

            const resultado = await configuracionFrontendModel.actualizarConfiguracion(clave, valor);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async restaurar(req, res) {
        try {
            const { clave } = req.params;
            const resultado = await configuracionFrontendModel.restaurarPorDefecto(clave);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

module.exports = configuracionFrontendController;