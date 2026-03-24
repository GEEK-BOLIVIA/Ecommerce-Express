const usuarioModel = require('../models/usuarioModel');

const usuarioController = {

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password)
                return res.status(400).json({ exito: false, mensaje: 'Email y contraseña son requeridos' });

            const resultado = await usuarioModel.login(email, password);
            if (!resultado.exito)
                return res.status(401).json(resultado);

            const perfil = await usuarioModel.obtenerPorEmail(email);

            return res.status(200).json({
                exito: true,
                token: resultado.data.session.access_token,
                usuario: perfil
            });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerTodos(req, res) {
        try {
            const usuarios = await usuarioModel.obtenerTodos();
            return res.status(200).json({ exito: true, data: usuarios });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerPorRol(req, res) {
        try {
            const { rol } = req.params;
            const usuarios = await usuarioModel.obtenerPorRol(rol);
            return res.status(200).json({ exito: true, data: usuarios });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuarioModel.obtenerPorId(id);
            if (!usuario)
                return res.status(404).json({ exito: false, mensaje: 'Usuario no encontrado' });

            return res.status(200).json({ exito: true, data: usuario });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async crear(req, res) {
        try {
            const resultado = await usuarioModel.crear(req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await usuarioModel.actualizar(id, req.body);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const resultado = await usuarioModel.eliminarLogico(id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async autorizarWhitelist(req, res) {
        try {
            const resultado = await usuarioModel.autorizarEnWhitelist(req.body);
            return res.status(201).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async obtenerInvitaciones(req, res) {
        try {
            const data = await usuarioModel.obtenerInvitacionesPendientes();
            return res.status(200).json({ exito: true, data });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },

    async eliminarInvitacion(req, res) {
        try {
            const { id } = req.params;
            const resultado = await usuarioModel.eliminarInvitacion(id);
            return res.status(200).json(resultado);
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    },
    async obtenerPerfil(req, res) {
        try {
            const perfil = await usuarioModel.obtenerPorEmail(req.usuario.email);

            if (!perfil)
                return res.status(404).json({ exito: false, mensaje: 'Perfil no encontrado', tipo: 'denegado' });

            return res.status(200).json({ exito: true, perfil, tipo: 'existente' });
        } catch (error) {
            return res.status(500).json({ exito: false, mensaje: error.message });
        }
    }
};

module.exports = usuarioController;