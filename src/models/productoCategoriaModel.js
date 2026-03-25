const supabase = require('../config/supabaseClient');

const productoCategoriaModel = {

    async vincularMultiple(productoId, categoriasIds) {
        try {
            const payload = categoriasIds.map(idCat => ({
                id_producto: productoId,
                id_categoria: parseInt(idCat)
            }));

            const { error } = await supabase
                .from('producto_categorias_rel')
                .insert(payload);

            if (error) throw error;
            return { exito: true };
        } catch (err) {
            return { exito: false, mensaje: err.message };
        }
    },

    async desvincularTodo(productoId) {
        try {
            const { error } = await supabase
                .from('producto_categorias_rel')
                .delete()
                .eq('id_producto', productoId);

            if (error) throw error;
            return { exito: true };
        } catch (err) {
            return { exito: false, mensaje: err.message };
        }
    },

    async actualizarRelaciones(productoId, nuevasCategoriasIds) {
        try {
            await this.desvincularTodo(productoId);
            if (nuevasCategoriasIds && nuevasCategoriasIds.length > 0) {
                return await this.vincularMultiple(productoId, nuevasCategoriasIds);
            }
            return { exito: true };
        } catch (err) {
            return { exito: false, mensaje: err.message };
        }
    },

    async obtenerCategoriasPorProducto(productoId) {
        try {
            const { data, error } = await supabase
                .from('producto_categorias_rel')
                .select('id_categoria')
                .eq('id_producto', productoId);

            if (error) throw error;
            return data.map(rel => rel.id_categoria);
        } catch (err) {
            console.error('Error al obtener categorías del producto:', err.message);
            return [];
        }
    }
};

module.exports = productoCategoriaModel;