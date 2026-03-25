const express = require('express');
const router = express.Router();
const configuracionFrontendController = require('../controllers/configuracionFrontendController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, configuracionFrontendController.obtenerTodas);
router.put('/:clave', verificarToken, configuracionFrontendController.actualizar);
router.post('/:clave/restaurar', verificarToken, configuracionFrontendController.restaurar);

module.exports = router;