const express = require('express');
const router = express.Router();
const paletaColorController = require('../controllers/paletaColorController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', paletaColorController.obtenerTodas);
router.post('/', verificarToken, paletaColorController.crear);
router.put('/:id', verificarToken, paletaColorController.actualizar);
router.put('/:id/activar', verificarToken, paletaColorController.activar);
router.delete('/:id', verificarToken, paletaColorController.eliminar);

module.exports = router;