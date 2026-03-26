const express = require('express');
const router = express.Router();
const importacionController = require('../controllers/importacionController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/validar-nombres', verificarToken, importacionController.validarNombres);
router.post('/procesar', verificarToken, importacionController.procesarCarga);

module.exports = router;