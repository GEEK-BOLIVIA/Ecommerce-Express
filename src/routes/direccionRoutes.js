const express = require('express');
const router = express.Router();
const direccionController = require('../controllers/direccionController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, direccionController.obtenerTodas);
router.get('/clientes', verificarToken, direccionController.obtenerClientes);
router.get('/:id', verificarToken, direccionController.obtenerPorId);
router.post('/', verificarToken, direccionController.crear);
router.put('/:id', verificarToken, direccionController.actualizar);
router.delete('/:id', verificarToken, direccionController.eliminar);

module.exports = router;