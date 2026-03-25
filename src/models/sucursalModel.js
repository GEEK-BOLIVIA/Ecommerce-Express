const supabase = require('../config/supabaseClient');

const sucursalModel = {

    async getAll() {
        try {
            const { data, error } = await supabase
                .from('sucursales_con_conteo')
                .select('*')
                .order('nombre', { ascending: true });
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener sucursales:', error.message);
            return [];
        }
    },

    async getById(id) {
        try {
            const { data, error } = await supabase
                .from('sucursal')
                .select('*')
                .eq('id', id)
                .single();
            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener sucursal:', error.message);
            return null;
        }
    },

    async create(datos) {
        try {
            const { nombre, direccion } = datos;
            const { data, error } = await supabase
                .from('sucursal')
                .insert([{ nombre, direccion }])
                .select();
            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async update(id, updates) {
        try {
            const { data, error } = await supabase
                .from('sucursal')
                .update({ nombre: updates.nombre, direccion: updates.direccion })
                .eq('id', id)
                .select();
            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    },

    async delete(id) {
        try {
            const { error } = await supabase
                .from('sucursal')
                .delete()
                .eq('id', id);
            if (error) throw error;
            return { exito: true };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    }
};

module.exports = sucursalModel;