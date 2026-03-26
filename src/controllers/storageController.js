const storageModel = require('../models/storageModel');

const storageController = {

    async subirImagen(req, res) {
        try {
            if (!req.file)
                return res.status(400).json({ exito: false, mensaje: 'No se proporcionó ningún archivo' });

            const { carpeta = 'varios' } = req.body;
            const extension = req.file.originalname.split('.').pop();
            const path = `${carpeta}/${Date.now()}.${extension}`;

            await storageModel.subirArchivo(path, req.file.buffer, req.file.mimetype);
            const url = storageModel.obtenerUrlPublica(path);

            return res.status(200).json({ exito: true, data: { url, path } });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async eliminarArchivo(req, res) {
        try {
            const { path } = req.body;
            if (!path)
                return res.status(400).json({ exito: false, mensaje: 'El path es requerido' });

            await storageModel.eliminarArchivo(path);
            return res.status(200).json({ exito: true });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

module.exports = storageController;