const express = require('express');
const router = express.Router();
const carruselController = require('../controllers/carruselController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/buscar', verificarToken, carruselController.buscarRelacionados);
router.get('/', verificarToken, carruselController.listar);
router.get('/:id/items', verificarToken, carruselController.obtenerItems);
router.get('/orden/:slug', verificarToken, carruselController.obtenerSiguienteOrden);
router.post('/', verificarToken, carruselController.crear);
router.post('/guardar', verificarToken, carruselController.guardarCompleto);
router.put('/:id', verificarToken, carruselController.actualizar);
router.delete('/:id', verificarToken, carruselController.eliminar);

module.exports = router;