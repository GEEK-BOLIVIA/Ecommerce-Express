const express = require('express');
const router = express.Router();
const sucursalController = require('../controllers/sucursalController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', verificarToken, sucursalController.getAll);
router.get('/:id', verificarToken, sucursalController.getById);
router.post('/', verificarToken, sucursalController.create);
router.put('/:id', verificarToken, sucursalController.update);
router.delete('/:id', verificarToken, sucursalController.delete);

module.exports = router;