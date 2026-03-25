const express = require('express');
const router = express.Router();
const departamentoController = require('../controllers/departamentoController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', departamentoController.obtenerTodos);
router.get('/:id', departamentoController.obtenerPorId);
router.post('/', verificarToken, departamentoController.crear);
router.put('/:id', verificarToken, departamentoController.actualizar);
router.delete('/:id', verificarToken, departamentoController.eliminar);

module.exports = router;