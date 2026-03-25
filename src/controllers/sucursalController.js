const sucursalModel = require('../models/sucursalModel');

const sucursalController = {

    async getAll(req, res) {
        try {
            const data = await sucursalModel.getAll();
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const data = await sucursalModel.getById(id);
            if (!data) return res.status(404).json({ exito: false, mensaje: 'Sucursal no encontrada' });
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async create(req, res) {
        try {
            const resultado = await sucursalModel.create(req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const resultado = await sucursalModel.update(id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const resultado = await sucursalModel.delete(id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

module.exports = sucursalController;