const supabase = require('../config/supabaseClient');

const usuarioModel = {

    async login(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (error) throw error;
            return { exito: true, data };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async obtenerPorEmail(email) {
        try {
            const emailLimpio = email.toLowerCase().trim();
            const { data: perfil, error } = await supabase
                .from('usuario')
                .select('*')
                .eq('correo_electronico', emailLimpio)
                .maybeSingle();

            if (error) throw error;
            return perfil;
        } catch (error) {
            console.error('Error al obtener perfil:', error.message);
            return null;
        }
    },

    async obtenerPorId(id) {
        try {
            const { data, error } = await supabase
                .from('usuario')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Error al obtener usuario ${id}:`, error.message);
            return null;
        }
    },

    async obtenerPorRol(rol) {
        try {
            const { data, error } = await supabase
                .from('usuario')
                .select('*')
                .eq('visible', true)
                .eq('rol', rol)
                .order('apellido_paterno', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error(`Error al obtener usuarios con rol ${rol}:`, error.message);
            return [];
        }
    },

    async obtenerTodos() {
        try {
            const { data, error } = await supabase
                .from('usuario')
                .select('*')
                .eq('visible', true)
                .order('apellido_paterno', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener usuarios:', error.message);
            return [];
        }
    },

    async crear(payload) {
        try {
            const { data, error } = await supabase
                .from('usuario')
                .insert([payload])
                .select();

            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async actualizar(id, cambios) {
        try {
            const { error } = await supabase
                .from('usuario')
                .update(cambios)
                .eq('id', id);

            if (error) throw error;
            return { exito: true };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async eliminarLogico(id) {
        return await this.actualizar(id, { visible: false });
    },

    async autorizarEnWhitelist(datos) {
        try {
            const { data, error } = await supabase
                .from('whitelist')
                .insert([{
                    correo_electronico: datos.correo_electronico,
                    rol: datos.rol,
                    creado_en: new Date().toISOString()
                }])
                .select();

            if (error) {
                if (error.code === '23505') throw new Error('Este correo ya está autorizado.');
                throw error;
            }
            return { exito: true, data: data[0] };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async obtenerInvitacionesPendientes() {
        try {
            const { data, error } = await supabase
                .from('whitelist')
                .select('*')
                .order('creado_en', { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener invitaciones:', error.message);
            return [];
        }
    },

    async eliminarInvitacion(id) {
        const { error } = await supabase.from('whitelist').delete().eq('id', id);
        return { exito: !error, mensaje: error?.message };
    },

    async eliminarInvitacionPorCorreo(correo) {
        try {
            const { error } = await supabase
                .from('whitelist')
                .delete()
                .eq('correo_electronico', correo.toLowerCase().trim());

            if (error) throw error;
            return { exito: true };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    }
};

module.exports = usuarioModel;