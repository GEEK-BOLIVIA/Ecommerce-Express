const { getSupabaseAdmin } = require('../config/supabaseClient');

const carruselModel = {

    async listar() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('carruseles')
            .select('*')
            .order('ubicacion_slug', { ascending: true })
            .order('orden_seccion', { ascending: true });
        if (error) throw error;
        return data;
    },

    async obtenerSiguienteOrden(slug) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('carruseles')
            .select('orden_seccion')
            .eq('ubicacion_slug', slug)
            .order('orden_seccion', { ascending: false })
            .limit(1);
        if (error) throw error;
        return data.length > 0 ? (parseInt(data[0].orden_seccion) + 1) : 0;
    },

    async crear(datos) {
        const supabaseAdmin = getSupabaseAdmin();
        const payload = {
            nombre: datos.nombre.trim(),
            descripcion: datos.descripcion || '',
            tipo: datos.tipo,
            ubicacion_slug: datos.ubicacion_slug.toLowerCase(),
            orden_seccion: parseInt(datos.orden_seccion) || 0,
            activo: datos.activo !== undefined ? datos.activo : true
        };
        const { data, error } = await supabaseAdmin
            .from('carruseles')
            .insert([payload])
            .select();
        if (error) throw error;
        return data[0];
    },

    async actualizar(id, cambios) {
        const supabaseAdmin = getSupabaseAdmin();
        if (cambios.orden_seccion !== undefined)
            cambios.orden_seccion = parseInt(cambios.orden_seccion) || 0;
        const { data, error } = await supabaseAdmin
            .from('carruseles')
            .update(cambios)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async eliminar(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { error: errorItems } = await supabaseAdmin
            .from('carrusel_items')
            .delete()
            .eq('carrusel_id', id);
        if (errorItems) throw errorItems;

        const { error: errorCarrusel } = await supabaseAdmin
            .from('carruseles')
            .delete()
            .eq('id', id);
        if (errorCarrusel) throw errorCarrusel;
        return true;
    },

    async obtenerItems(carruselId) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('carrusel_items')
            .select(`
                *,
                producto:producto_id (id, nombre, imagen_url, precio),
                categoria:categoria_id (id, nombre)
            `)
            .eq('carrusel_id', carruselId)
            .order('orden', { ascending: true });
        if (error) throw error;
        return data;
    },

    async limpiarItemsCarrusel(carruselId) {
        const supabaseAdmin = getSupabaseAdmin();
        if (!carruselId) throw new Error('ID de carrusel no válido');
        const { error } = await supabaseAdmin
            .from('carrusel_items')
            .delete()
            .eq('carrusel_id', carruselId);
        if (error) throw error;
        return true;
    },

    async agregarItem(item) {
        const supabaseAdmin = getSupabaseAdmin();
        const payload = {
            carrusel_id: item.carrusel_id,
            orden: item.orden || 0,
            titulo_manual: item.titulo_manual || null,
            subtitulo_manual: item.subtitulo_manual || null,
            imagen_url_manual: item.imagen_url_manual || item.icono_manual || null,
            link_destino_manual: item.link_destino_manual || null,
            producto_id: item.producto_id || null,
            categoria_id: item.categoria_id || null
        };
        const { data, error } = await supabaseAdmin
            .from('carrusel_items')
            .insert([payload])
            .select();
        if (error) throw error;
        return data[0];
    }
};

module.exports = carruselModel;