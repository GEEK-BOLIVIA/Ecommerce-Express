// src/models/usuarioModel.js
const { getSupabase, getSupabaseAdmin } = require('../config/supabaseClient');

const usuarioModel = {

    async login(email, password) {
        const supabase = getSupabase();
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    },

    async obtenerPorEmail(email) {
        const supabaseAdmin = getSupabaseAdmin();
        const emailLimpio = email.toLowerCase().trim();
        const { data, error } = await supabaseAdmin
            .from('usuario')
            .select('*')
            .eq('correo_electronico', emailLimpio)
            .maybeSingle();
        if (error) throw error;
        return data;
    },

    async obtenerPorId(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('usuario')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    async obtenerPorRol(rol) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('usuario')
            .select('*')
            .eq('visible', true)
            .eq('rol', rol)
            .order('apellido_paterno', { ascending: true });
        if (error) throw error;
        return data;
    },

    async obtenerTodos() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('usuario')
            .select('*')
            .eq('visible', true)
            .order('apellido_paterno', { ascending: true });
        if (error) throw error;
        return data;
    },

    async crear(payload) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('usuario')
            .insert([payload])
            .select();
        if (error) throw error;
        return data[0];
    },

    async actualizar(id, cambios) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('usuario')
            .update(cambios)
            .eq('id', id);
        if (error) throw error;
        return true;
    },

    async eliminarLogico(id) {
        return await this.actualizar(id, { visible: false });
    },

    async autorizarEnWhitelist(datos) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
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
        return data[0];
    },

    async obtenerInvitacionesPendientes() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('whitelist')
            .select('*')
            .order('creado_en', { ascending: false });
        if (error) throw error;
        return data;
    },

    async eliminarInvitacion(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('whitelist')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    },

    async eliminarInvitacionPorCorreo(correo) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('whitelist')
            .delete()
            .eq('correo_electronico', correo.toLowerCase().trim());
        if (error) throw error;
        return true;
    }
};

module.exports = usuarioModel;