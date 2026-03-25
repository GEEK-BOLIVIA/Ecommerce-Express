const supabase = require('../config/supabaseClient');

const categoriasModel = {

    async obtenerTodas() {
        try {
            const { data, error } = await supabase
                .from('categoria')
                .select(`
                    id, nombre, visible, id_padre,
                    categoria_padre:id_padre ( nombre )
                `)
                .eq('visible', true)
                .order('nombre', { ascending: true });

            if (error) throw error;

            return data.map(item => ({
                ...item,
                nombre_padre: item.categoria_padre ? item.categoria_padre.nombre : 'Principal'
            }));
        } catch (err) {
            console.error('Error en obtenerTodas:', err.message);
            return [];
        }
    },

    async obtenerPorId(id) {
        try {
            const { data, error } = await supabase
                .from('categoria')
                .select(`*, categoria_padre:id_padre ( nombre )`)
                .eq('id', id)
                .single();

            if (error) throw error;

            return {
                ...data,
                nombre_padre: data.categoria_padre ? data.categoria_padre.nombre : 'Ninguna (Es Principal)'
            };
        } catch (err) {
            console.error(`Error al obtener categoría ${id}:`, err.message);
            return null;
        }
    },

    async crear(categoria) {
        try {
            const payload = {
                nombre: categoria.nombre.trim(),
                visible: categoria.visible ?? true,
                id_padre: categoria.id_padre || null
            };

            const { data, error } = await supabase
                .from('categoria')
                .insert([payload])
                .select();

            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (err) {
            return { exito: false, mensaje: err.message };
        }
    },

    async actualizar(id, cambios) {
        try {
            if (cambios.hasOwnProperty('id_padre')) {
                cambios.id_padre = cambios.id_padre || null;
            }

            const { data, error } = await supabase
                .from('categoria')
                .update(cambios)
                .eq('id', id)
                .select();

            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (err) {
            return { exito: false, mensaje: err.message };
        }
    },

    async eliminar(id) {
        try {
            const { data, error } = await supabase
                .from('categoria')
                .update({ visible: false })
                .eq('id', id)
                .select();

            if (error) throw error;
            return { exito: true, data: data[0] };
        } catch (err) {
            return { exito: false, mensaje: err.message };
        }
    },

    async buscarPorNombre(termino) {
        try {
            const { data, error } = await supabase
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
        } catch (err) {
            console.error('Error buscando categorías:', err.message);
            return [];
        }
    }
};

module.exports = categoriasModel;