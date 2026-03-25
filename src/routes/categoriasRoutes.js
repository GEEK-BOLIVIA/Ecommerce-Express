const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/buscar', verificarToken, categoriasController.buscarPorNombre);
router.get('/', verificarToken, categoriasController.obtenerTodas);
router.get('/:id', verificarToken, categoriasController.obtenerPorId);
router.post('/', verificarToken, categoriasController.crear);
router.put('/:id', verificarToken, categoriasController.actualizar);
router.delete('/:id', verificarToken, categoriasController.eliminar);

module.exports = router;