const { getSupabaseAdmin } = require('../config/supabaseClient');

const galeriaProductoModel = {

    _normalizarItem(item) {
        let urlFinal = '';
        let tipoFinal = 'imagen';
        if (typeof item === 'string') {
            urlFinal = item;
        } else if (item && typeof item === 'object') {
            urlFinal = item.url || item.file_url || '';
            tipoFinal = item.tipo || 'imagen';
        }
        return {
            url: String(urlFinal).trim(),
            tipo: String(tipoFinal).toLowerCase().includes('video') ? 'video' : 'imagen'
        };
    },

    async getByProducto(idProducto) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('galeria_producto')
            .select('*')
            .eq('id_producto', idProducto)
            .eq('visible', true)
            .order('orden', { ascending: true });
        if (error) throw error;
        return data;
    },

    async createLote(idProducto, itemsMultimedia) {
        const supabaseAdmin = getSupabaseAdmin();
        if (!itemsMultimedia || itemsMultimedia.length === 0) return [];
        const payload = itemsMultimedia.map(item => {
            const cleaned = this._normalizarItem(item);
            return {
                id_producto: idProducto,
                url: cleaned.url,
                tipo: cleaned.tipo,
                orden: parseInt(item.orden) || 0,
                visible: true
            };
        });
        const { data, error } = await supabaseAdmin
            .from('galeria_producto')
            .insert(payload)
            .select();
        if (error) throw error;
        return data;
    },

    async limpiarGaleria(idProducto) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error } = await supabaseAdmin
            .from('galeria_producto')
            .delete()
            .eq('id_producto', idProducto);
        if (error) throw error;
        return true;
    }
};

module.exports = galeriaProductoModel;