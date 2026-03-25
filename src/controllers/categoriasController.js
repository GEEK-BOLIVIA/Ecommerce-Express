const categoriasModel = require('../models/categoriasModel');

const categoriasController = {

    async obtenerTodas(req, res) {
        try {
            const data = await categoriasModel.obtenerTodas();
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const data = await categoriasModel.obtenerPorId(id);
            if (!data) return res.status(404).json({ exito: false, mensaje: 'Categoría no encontrada' });
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async crear(req, res) {
        try {
            const resultado = await categoriasModel.crear(req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await categoriasModel.actualizar(id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await categoriasModel.eliminar(id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async buscarPorNombre(req, res) {
        try {
            const { termino } = req.query;
            if (!termino) return res.status(400).json({ exito: false, mensaje: 'Termino requerido' });
            const data = await categoriasModel.buscarPorNombre(termino);
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

module.exports = categoriasController;