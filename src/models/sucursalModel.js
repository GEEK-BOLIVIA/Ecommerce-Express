const { getSupabaseAdmin } = require('../config/supabaseClient');

const sucursalModel = {

    async getAll() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('sucursales_con_conteo')
            .select('*')
            .order('nombre', { ascending: true });
        if (error) throw error;
        return data;
    },

    async getById(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('sucursal')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        return data;
    },

    async create(datos) {
        const supabaseAdmin = getSupabaseAdmin();
        const { nombre, direccion } = datos;
        const { data, error } = await supabaseAdmin
            .from('sucursal')
            .insert([{ nombre, direccion }])
            .select();
        if (error) throw error;
        return data[0];
    },

    async update(id, updates) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('sucursal')
            .update({ nombre: updates.nombre, direccion: updates.direccion })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async delete(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('sucursal')
            .delete()
            .eq('id', id);
        if (error) throw error;
        return true;
    }
};

module.exports = sucursalModel;