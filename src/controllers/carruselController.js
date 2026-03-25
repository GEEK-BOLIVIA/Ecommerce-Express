const carruselModel = require('../models/carruselModel');
const productoModel = require('../models/productoModel');
const categoriasModel = require('../models/categoriasModel');

const carruselController = {

    async listar(req, res) {
        try {
            const data = await carruselModel.listar();
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerSiguienteOrden(req, res) {
        try {
            const { slug } = req.params;
            const orden = await carruselModel.obtenerSiguienteOrden(slug);
            return res.status(200).json({ exito: true, orden });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerItems(req, res) {
        try {
            const { id } = req.params;
            const data = await carruselModel.obtenerItems(id);
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async crear(req, res) {
        try {
            const resultado = await carruselModel.crear(req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await carruselModel.actualizar(id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async guardarCompleto(req, res) {
        try {
            const { config, items, id } = req.body;
            let carruselId = id;

            if (id) {
                const res1 = await carruselModel.actualizar(id, config);
                if (!res1.exito) throw new Error(res1.mensaje);
            } else {
                const res1 = await carruselModel.crear(config);
                if (!res1.exito) throw new Error(res1.mensaje);
                carruselId = res1.data.id;
            }

            await carruselModel.limpiarItemsCarrusel(carruselId);

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                await carruselModel.agregarItem({
                    carrusel_id: carruselId,
                    orden: i,
                    titulo_manual: item.titulo_manual || item.titulo || null,
                    subtitulo_manual: item.subtitulo_manual || item.subtitulo || null,
                    imagen_url_manual: item.imagen_url_manual || item.imagen_preview || null,
                    link_destino_manual: item.link_destino_manual || item.link || null,
                    producto_id: item.producto_id || null,
                    categoria_id: item.categoria_id || null
                });
            }

            return res.status(200).json({ exito: true, id: carruselId });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await carruselModel.eliminar(id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async buscarRelacionados(req, res) {
        try {
            const { tipo, termino } = req.query;
            if (!termino || termino.length < 2)
                return res.status(200).json({ exito: true, data: [] });

            let data = [];
            if (tipo === 'productos') {
                data = await productoModel.buscarPorNombre(termino);
            } else if (tipo === 'categorias') {
                data = await categoriasModel.buscarPorNombre(termino);
            }

            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

module.exports = carruselController;