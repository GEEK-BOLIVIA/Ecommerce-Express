const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Auth
router.post('/login', usuarioController.login);

// Rutas específicas PRIMERO (antes de /:id)
router.get('/perfil', verificarToken, usuarioController.obtenerPerfil);
router.get('/rol/:rol', usuarioController.obtenerPorRol);
router.get('/whitelist/pendientes', usuarioController.obtenerInvitaciones);

// Rutas con parámetros DESPUÉS
router.get('/', usuarioController.obtenerTodos);
router.get('/:id', verificarToken, usuarioController.obtenerPorId);
router.post('/', usuarioController.crear);
router.put('/:id', usuarioController.actualizar);
router.delete('/:id', usuarioController.eliminar);

// Whitelist
router.post('/whitelist', usuarioController.autorizarWhitelist);
router.delete('/whitelist/:id', usuarioController.eliminarInvitacion);

module.exports = router;