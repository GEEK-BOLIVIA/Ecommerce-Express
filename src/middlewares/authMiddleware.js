const { getSupabase } = require('../config/supabaseClient');

const verificarToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer '))
            return res.status(401).json({ exito: false, mensaje: 'Token no proporcionado' });

        const token = authHeader.split(' ')[1];

        const supabase = getSupabase();
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user)
            return res.status(401).json({ exito: false, mensaje: 'Token inválido o expirado' });

        req.usuario = user;
        next();
    } catch (error) {
        console.error('[authMiddleware]', error.message);
        return res.status(500).json({ exito: false, mensaje: 'Error al verificar el token' });
    }
};

const verificarRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        const rolUsuario = req.usuario?.user_metadata?.rol;

        if (!rolUsuario || !rolesPermitidos.includes(rolUsuario))
            return res.status(403).json({
                exito: false,
                mensaje: 'No tienes permisos para realizar esta acción'
            });

        next();
    };
};

module.exports = { verificarToken, verificarRol };