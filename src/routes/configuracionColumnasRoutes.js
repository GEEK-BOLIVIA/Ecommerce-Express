const express = require('express');
const router = express.Router();
const configuracionColumnasController = require('../controllers/configuracionColumnasController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/:tabla', verificarToken, configuracionColumnasController.obtener);
router.post('/', verificarToken, configuracionColumnasController.guardar);
router.delete('/:tabla', verificarToken, configuracionColumnasController.resetear);

module.exports = router;