const { getSupabaseAdmin } = require('../config/supabaseClient');

const productoCategoriaModel = {

    async vincularMultiple(productoId, categoriasIds) {
        const supabaseAdmin = getSupabaseAdmin();
        const payload = categoriasIds.map(idCat => ({
            id_producto: productoId,
            id_categoria: parseInt(idCat)
        }));
        const { error } = await supabaseAdmin
            .from('producto_categorias_rel')
            .insert(payload);
        if (error) throw error;
        return true;
    },

    async desvincularTodo(productoId) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('producto_categorias_rel')
            .delete()
            .eq('id_producto', productoId);
        if (error) throw error;
        return true;
    },

    async actualizarRelaciones(productoId, nuevasCategoriasIds) {
        await this.desvincularTodo(productoId);
        if (nuevasCategoriasIds && nuevasCategoriasIds.length > 0)
            await this.vincularMultiple(productoId, nuevasCategoriasIds);
        return true;
    },

    async obtenerCategoriasPorProducto(productoId) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('producto_categorias_rel')
            .select('id_categoria')
            .eq('id_producto', productoId);
        if (error) throw error;
        return data.map(rel => rel.id_categoria);
    }
};

module.exports = productoCategoriaModel;