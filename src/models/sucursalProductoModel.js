const { getSupabaseAdmin } = require('../config/supabaseClient');

const sucursalProductoModel = {

    async getByProducto(idProducto) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('sucursal_producto')
            .select('id_sucursal, precio, stock, visible')
            .eq('id_producto', idProducto);
        if (error) throw error;
        return data || [];
    },

    async sincronizar(idProducto, sucursales) {
        const supabaseAdmin = getSupabaseAdmin();
        const activas = sucursales.filter(s => s.activa);

        const { data: actuales } = await supabaseAdmin
            .from('sucursal_producto')
            .select('id_sucursal')
            .eq('id_producto', parseInt(idProducto));

        const idsActuales = (actuales || []).map(r => r.id_sucursal);
        const idsNuevas = activas.map(s => parseInt(s.id_sucursal));
        const idsAEliminar = idsActuales.filter(id => !idsNuevas.includes(id));

        if (idsAEliminar.length > 0) {
            const { error } = await supabaseAdmin
                .from('sucursal_producto')
                .delete()
                .eq('id_producto', parseInt(idProducto))
                .in('id_sucursal', idsAEliminar);
            if (error) throw error;
        }

        if (activas.length > 0) {
            const { error } = await supabaseAdmin
                .from('sucursal_producto')
                .upsert(
                    activas.map(s => ({
                        id_sucursal: parseInt(s.id_sucursal),
                        id_producto: parseInt(idProducto),
                        precio: parseFloat(s.precio) || 0,
                        stock: parseInt(s.stock) || 0,
                        visible: true
                    })),
                    { onConflict: 'id_sucursal,id_producto' }
                );
            if (error) throw error;
        }

        return true;
    }
};

module.exports = sucursalProductoModel;