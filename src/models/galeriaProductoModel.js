const supabase = require('../config/supabaseClient');

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
        try {
            const { data, error } = await supabase
                .from('galeria_producto')
                .select('*')
                .eq('id_producto', idProducto)
                .eq('visible', true)
                .order('orden', { ascending: true });

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error en getByProducto:', error.message);
            return [];
        }
    },

    async createLote(idProducto, itemsMultimedia) {
        try {
            if (!itemsMultimedia || itemsMultimedia.length === 0) return { exito: true, data: [] };

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

            const { data, error } = await supabase
                .from('galeria_producto')
                .insert(payload)
                .select();

            if (error) throw error;
            return { exito: true, data };
        } catch (error) {
            console.error('Error en createLote:', error.message);
            throw error;
        }
    },

    async limpiarGaleria(idProducto) {
        try {
            const { error } = await supabase
                .from('galeria_producto')
                .delete()
                .eq('id_producto', idProducto);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Fallo el delete físico:', error.message);
            await supabase
                .from('galeria_producto')
                .update({ visible: false })
                .eq('id_producto', idProducto);
            return false;
        }
    }
};

module.exports = galeriaProductoModel;