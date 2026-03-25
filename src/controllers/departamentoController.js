const departamentoModel = require('../models/departamentoModel');

const departamentoController = {

    async obtenerTodos(req, res) {
        try {
            const data = await departamentoModel.obtenerTodos();
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const data = await departamentoModel.obtenerPorId(id);
            if (!data)
                return res.status(404).json({ exito: false, mensaje: 'Departamento no encontrado' });

            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async crear(req, res) {
        try {
            const resultado = await departamentoModel.crear(req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await departamentoModel.actualizar(id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await departamentoModel.eliminar(id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

module.exports = departamentoController;