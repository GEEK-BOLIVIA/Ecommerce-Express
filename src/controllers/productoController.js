const productoModel = require('../models/productoModel');
const productoCategoriaModel = require('../models/productoCategoriaModel');
const galeriaProductoModel = require('../models/galeriaProductoModel');
const sucursalProductoModel = require('../models/sucursalProductoModel');
const sucursalModel = require('../models/sucursalModel');
const categoriasModel = require('../models/categoriasModel');

const productoController = {

    async listar(req, res) {
        try {
            const { sucursal } = req.query;
            let data;
            if (sucursal === 'todas') {
                data = await productoModel.listarTodoDetallado();
            } else {
                data = await productoModel.listarActivos(sucursal || 1);
            }
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const producto = await productoModel.obtenerPorId(id);
            if (!producto) return res.status(404).json({ exito: false, mensaje: 'Producto no encontrado' });

            const [categorias, galeria, sucursales, todasSucursales] = await Promise.all([
                productoCategoriaModel.obtenerCategoriasPorProducto(id),
                galeriaProductoModel.getByProducto(id),
                sucursalProductoModel.getByProducto(id),
                sucursalModel.getAll()
            ]);

            return res.status(200).json({
                exito: true,
                data: { producto, categorias, galeria, sucursales, todasSucursales }
            });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async crear(req, res) {
        try {
            const { datos, categoriasIds, galeria, sucursales } = req.body;
            const resultado = await productoModel.crear(datos);

            if (!resultado.exito) return res.status(400).json(resultado);

            const nuevoId = resultado.data.id;
            const promesas = [];

            if (categoriasIds?.length > 0)
                promesas.push(productoCategoriaModel.vincularMultiple(nuevoId, categoriasIds));
            if (galeria?.length > 0)
                promesas.push(galeriaProductoModel.createLote(nuevoId, galeria));
            if (sucursales?.length > 0)
                promesas.push(sucursalProductoModel.sincronizar(nuevoId, sucursales));

            await Promise.all(promesas);
            return res.status(201).json({ exito: true, data: resultado.data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const { datos, categoriasIds, galeria, sucursales } = req.body;

            const resultado = await productoModel.actualizar(id, datos);
            if (!resultado.exito) return res.status(400).json(resultado);

            await productoCategoriaModel.actualizarRelaciones(id, categoriasIds || []);
            await galeriaProductoModel.limpiarGaleria(id);
            await sucursalProductoModel.sincronizar(id, sucursales || []);

            if (galeria?.length > 0)
                await galeriaProductoModel.createLote(id, galeria);

            return res.status(200).json({ exito: true, data: resultado.data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await productoModel.eliminar(id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async actualizarVarios(req, res) {
        try {
            const { ids, datos } = req.body;
            const resultado = await productoModel.actualizarVarios(ids, datos);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async buscarPorNombre(req, res) {
        try {
            const { termino } = req.query;
            if (!termino) return res.status(400).json({ exito: false, mensaje: 'Termino requerido' });
            const data = await productoModel.buscarPorNombre(termino);
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

module.exports = productoController;