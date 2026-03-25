const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/buscar', verificarToken, productoController.buscarPorNombre);
router.get('/', verificarToken, productoController.listar);
router.get('/:id', verificarToken, productoController.obtenerPorId);
router.post('/', verificarToken, productoController.crear);
router.put('/varios', verificarToken, productoController.actualizarVarios);
router.put('/:id', verificarToken, productoController.actualizar);
router.delete('/:id', verificarToken, productoController.eliminar);

module.exports = router;