const { getSupabaseAdmin } = require('../config/supabaseClient');

const productoModel = {

    async listarActivos(idSucursal = 1) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('v_productos_detallados')
            .select('*')
            .eq('visible_global', true)
            .eq('visible_sucursal', true)
            .eq('id_sucursal', idSucursal)
            .order('producto_id', { ascending: false });
        if (error) throw error;
        return data.map(p => ({
            ...p,
            id: p.producto_id,
            nombre_categoria: p.categoria_padre_nombre
                ? `${p.categoria_padre_nombre} > ${p.categoria_nombre}`
                : (p.categoria_nombre || 'Sin Categoría')
        }));
    },

    async listarTodoDetallado() {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('v_productos_resumen')
            .select('*')
            .order('producto_id', { ascending: false });
        if (error) throw error;
        return data.map(p => ({
            ...p,
            id: p.producto_id,
            nombre_categoria: p.categoria_nombre || 'Sin Categoría'
        }));
    },

    async obtenerPorId(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('producto')
            .select('*')
            .eq('id', id)
            .limit(1);
        if (error) throw error;
        if (!data || data.length === 0) return null;
        return { ...data[0], id: data[0].id };
    },

    async crear(datos) {
        const supabaseAdmin = getSupabaseAdmin();
        const payload = {
            nombre: datos.nombre ? datos.nombre.trim() : 'Sin Nombre',
            descripcion: datos.descripcion || '',
            imagen_url: datos.portada || '',
            visible: true,
            mostrar_precio: datos.price_visible == 1 || datos.price_visible === true,
            habilitar_whatsapp: datos.ws_active == 1 || datos.ws_active === true
        };
        const { data, error } = await supabaseAdmin
            .from('producto')
            .insert([payload])
            .select();
        if (error) throw error;
        return data[0];
    },

    async actualizar(id, cambios) {
        const supabaseAdmin = getSupabaseAdmin();
        const datosLimpios = {
            nombre: cambios.nombre || cambios.producto_nombre,
            descripcion: cambios.descripcion,
            imagen_url: cambios.imagen_url || cambios.portada,
            mostrar_precio: cambios.mostrar_precio !== undefined ? cambios.mostrar_precio
                : (cambios.price_visible !== undefined ? cambios.price_visible : undefined),
            habilitar_whatsapp: cambios.habilitar_whatsapp !== undefined ? cambios.habilitar_whatsapp
                : (cambios.ws_active !== undefined ? cambios.ws_active : undefined)
        };
        Object.keys(datosLimpios).forEach(key => {
            if (datosLimpios[key] === undefined) delete datosLimpios[key];
        });
        const { data, error } = await supabaseAdmin
            .from('producto')
            .update(datosLimpios)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async actualizarVarios(ids, datos) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('producto')
            .update(datos)
            .in('id', ids);
        if (error) throw error;
        return data;
    },

    async eliminar(id) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('producto')
            .update({ visible: false })
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async buscarPorNombre(termino) {
        const supabaseAdmin = getSupabaseAdmin();
        const { data, error } = await supabaseAdmin
            .from('producto')
            .select('id, nombre, imagen_url, precio, visible')
            .ilike('nombre', `%${termino}%`)
            .eq('visible', true)
            .limit(10);
        if (error) throw error;
        return data.map(p => ({
            id: p.id,
            nombre: p.nombre,
            imagen: p.imagen_url,
            precio: p.precio
        }));
    }
};

module.exports = productoModel;