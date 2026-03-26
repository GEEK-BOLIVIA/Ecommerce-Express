const express = require('express');
const router = express.Router();
const multer = require('multer');
const storageController = require('../controllers/storageController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Multer en memoria — el buffer se pasa directo a Supabase
const upload = multer({ storage: multer.memoryStorage() });

router.post('/subir', verificarToken, upload.single('archivo'), storageController.subirImagen);
router.delete('/eliminar', verificarToken, storageController.eliminarArchivo);

module.exports = router;