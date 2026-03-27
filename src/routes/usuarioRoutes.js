const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Auth
router.post('/login', usuarioController.login);

// Whitelist — ANTES de /:id para evitar conflicto
router.post('/whitelist', usuarioController.autorizarWhitelist);
router.delete('/whitelist/:id', usuarioController.eliminarInvitacion);
router.get('/whitelist/pendientes', usuarioController.obtenerInvitaciones);

// Rutas específicas
router.get('/perfil', verificarToken, usuarioController.obtenerPerfil);
router.get('/rol/:rol', usuarioController.obtenerPorRol);

// Rutas generales
router.get('/', verificarToken, usuarioController.obtenerTodos);
router.post('/', usuarioController.crear);

// Rutas con parámetros — siempre al final
router.get('/:id', verificarToken, usuarioController.obtenerPorId);
router.put('/:id', verificarToken, usuarioController.actualizar);
router.delete('/:id', verificarToken, usuarioController.eliminar);

module.exports = router;