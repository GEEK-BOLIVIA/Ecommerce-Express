const { getSupabaseAdmin } = require('../config/supabaseClient');

const categoriasModel = {

    async obtenerTodas() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('categoria')
            .select(`id, nombre, visible, id_padre, categoria_padre:id_padre ( nombre )`)
            .eq('visible', true)
            .order('nombre', { ascending: true });
        if (error) throw error;
        return data.map(item => ({
            ...item,
            nombre_padre: item.categoria_padre ? item.categoria_padre.nombre : 'Principal'
        }));
    },

    async obtenerPorId(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('categoria')
            .select(`*, categoria_padre:id_padre ( nombre )`)
            .eq('id', id)
            .single();
        if (error) throw error;
        return {
            ...data,
            nombre_padre: data.categoria_padre ? data.categoria_padre.nombre : 'Ninguna (Es Principal)'
        };
    },

    async crear(categoria) {
        const supabaseAdmin = getSupabaseAdmin();
        const payload = {
            nombre: categoria.nombre.trim(),
            visible: categoria.visible ?? true,
            id_padre: categoria.id_padre || null
        };
        const { data, error } = await supabaseAdmin
            .from('categoria')
            .insert([payload])
            .select();
        if (error) throw error;
        return data[0];
    },

    async actualizar(id, cambios) {
        const supabaseAdmin = getSupabaseAdmin();
        if (cambios.hasOwnProperty('id_padre'))
            cambios.id_padre = cambios.id_padre || null;
        const { data, error } = await supabaseAdmin
            .from('categoria')
            .update(cambios)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async eliminar(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('categoria')
            .update({ visible: false })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async buscarPorNombre(termino) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('categoria')
            .select('id, nombre')
            .ilike('nombre', `%${termino}%`)
            .eq('visible', true)
            .limit(10);
        if (error) throw error;
        return data.map(c => ({
            id: c.id,
            nombre: c.nombre,
            imagen: 'https://placehold.co/400x400?text=Categoria'
        }));
    }
};

module.exports = categoriasModel;