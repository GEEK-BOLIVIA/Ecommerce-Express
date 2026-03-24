const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarToken } = require('../middlewares/authMiddleware');
// Auth
router.post('/login', usuarioController.login);

// CRUD Usuarios
router.get('/', usuarioController.obtenerTodos);
router.get('/rol/:rol', usuarioController.obtenerPorRol);
router.get('/:id', usuarioController.obtenerPorId);
router.get('/perfil', verificarToken, usuarioController.obtenerPerfil);
router.post('/', usuarioController.crear);
router.put('/:id', usuarioController.actualizar);
router.delete('/:id', usuarioController.eliminar);

// Whitelist
router.get('/whitelist/pendientes', usuarioController.obtenerInvitaciones);
router.post('/whitelist', usuarioController.autorizarWhitelist);
router.delete('/whitelist/:id', usuarioController.eliminarInvitacion);

module.exports = router;