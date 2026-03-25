const direccionModel = require('../models/direccionModel');

const direccionController = {

    async obtenerTodas(req, res) {
        try {
            const data = await direccionModel.obtenerTodas();
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const data = await direccionModel.obtenerPorId(id);
            if (!data)
                return res.status(404).json({ exito: false, mensaje: 'Dirección no encontrada' });

            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerClientes(req, res) {
        try {
            const data = await direccionModel.obtenerClientes();
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async crear(req, res) {
        try {
            const resultado = await direccionModel.crear(req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await direccionModel.actualizar(id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await direccionModel.eliminar(id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

module.exports = direccionController;