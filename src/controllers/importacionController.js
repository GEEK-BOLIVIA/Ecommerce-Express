const importacionModel = require('../models/importacionModel');
const productoModel = require('../models/productoModel');
const categoriasModel = require('../models/categoriasModel');
const productoCategoriaModel = require('../models/productoCategoriaModel');
const galeriaProductoModel = require('../models/galeriaProductoModel');

const importacionController = {

    async validarNombres(req, res) {
        try {
            const { nombres } = req.body;

            if (!nombres || !Array.isArray(nombres))
                return res.status(400).json({ exito: false, mensaje: 'Se requiere un array de nombres' });

            const existentes = await importacionModel.obtenerNombresExistentes();
            const duplicados = nombres.filter(n => existentes.has(n.toLowerCase().trim()));

            return res.status(200).json({ exito: true, data: { existentes: [...existentes], duplicados } });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async procesarCarga(req, res) {
        try {
            const { datos } = req.body;

            if (!datos || !Array.isArray(datos) || datos.length === 0)
                return res.status(400).json({ exito: false, mensaje: 'No hay datos válidos para cargar' });

            let exitos = 0;
            const errores = [];

            for (let i = 0; i < datos.length; i++) {
                try {
                    const prod = datos[i];
                    const idHija = await _resolverJerarquia(prod.subcategoria, prod.categoria_padre);

                    const resProducto = await productoModel.crear({
                        nombre: prod.nombre,
                        descripcion: prod.descripcion || '',
                        portada: prod.portada,
                        precio: prod.precio,
                        stock: prod.stock,
                        price_visible: true,
                        ws_active: prod.whatsapp
                    });

                    if (resProducto.exito) {
                        const nuevoId = resProducto.data.id;
                        await Promise.all([
                            productoCategoriaModel.vincular(nuevoId, idHija),
                            _crearGaleriaPlaceholder(nuevoId, prod.imagenes_cant, prod.videos_cant)
                        ]);
                        exitos++;
                    }
                } catch (e) {
                    console.error(`Error procesando fila ${i + 1}:`, e.message);
                    errores.push({ fila: i + 1, error: e.message });
                }
            }

            return res.status(200).json({ exito: true, data: { exitos, total: datos.length, errores } });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

// ─────────────────────────────────────────────
// HELPERS PRIVADOS
// ─────────────────────────────────────────────
async function _resolverJerarquia(nombreHija, nombrePadre) {
    const categoriasActuales = await categoriasModel.obtenerTodas();

    const hijaExistente = categoriasActuales.find(c =>
        c.nombre.toLowerCase() === nombreHija.toLowerCase().trim()
    );
    if (hijaExistente) return hijaExistente.id;

    let idPadreFinal = null;
    if (nombrePadre) {
        const padreExistente = categoriasActuales.find(c =>
            c.nombre.toLowerCase() === nombrePadre.toLowerCase().trim()
        );
        if (padreExistente) {
            idPadreFinal = padreExistente.id;
        } else {
            const resPadre = await categoriasModel.crear({ nombre: nombrePadre.trim(), id_padre: null, visible: true });
            if (resPadre.exito) idPadreFinal = resPadre.data.id;
        }
    }

    const resHija = await categoriasModel.crear({ nombre: nombreHija.trim(), id_padre: idPadreFinal, visible: true });
    return resHija.exito ? resHija.data.id : null;
}

async function _crearGaleriaPlaceholder(prodId, imgCant, vidCant) {
    const items = [];
    const nImg = parseInt(imgCant) || 0;
    const nVid = parseInt(vidCant) || 0;

    for (let i = 0; i < nImg; i++) {
        items.push({ url: 'https://via.placeholder.com/800x600?text=Subir+Imagen', tipo: 'imagen', orden: i });
    }
    for (let j = 0; j < nVid; j++) {
        items.push({ url: 'https://www.w3schools.com/html/mov_bbb.mp4', tipo: 'video', orden: nImg + j });
    }

    if (items.length > 0) await galeriaProductoModel.createLote(prodId, items);
}

module.exports = importacionController;