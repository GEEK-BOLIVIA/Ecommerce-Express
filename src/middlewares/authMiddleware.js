const supabase = require('../config/supabaseClient');

const verificarToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ exito: false, mensaje: 'Token no proporcionado' });

        const token = authHeader.split(' ')[1];

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user)
            return res.status(401).json({ exito: false, mensaje: 'Token inválido o expirado' });

        req.usuario = user;
        next();
    } catch (error) {
        return res.status(500).json({ exito: false, mensaje: error.message });
    }
};

module.exports = { verificarToken };