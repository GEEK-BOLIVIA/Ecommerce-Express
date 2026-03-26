import { carruselState } from './carruselState.js';
import { carruselService } from '../../services/carruselService.js';

let searchTimer;
let ICONOS_GLOBALES = [];

async function cargarDiccionarioIconos() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/metadata/icons.json');
        const data = await response.json();
        ICONOS_GLOBALES = Object.keys(data).filter(key => data[key].styles.includes('solid'));
    } catch (error) {
        console.error("Error cargando iconos:", error);
        ICONOS_GLOBALES = ['tag', 'shop', 'heart', 'star', 'user', 'house', 'gear'];
    }
}

cargarDiccionarioIconos();

async function abrirBuscadorIconos(nombreCategoria) {
    return new Promise((resolve) => {
        let translationTimer;
        const sugeridos = ['shop', 'cart-shopping', 'tag', 'star', 'heart', 'truck', 'credit-card', 'user', 'shirt', 'laptop'];

        Swal.fire({
            title: `<span class="text-xs uppercase font-black">Icono para: ${nombreCategoria}</span>`,
            html: `
                <div class="p-2">
                    <input type="text" id="icon_search_input" 
                           class="w-full p-3 rounded-xl border border-slate-200 mb-4 text-sm focus:outline-none focus:border-blue-500 shadow-sm" 
                           placeholder="Busca en español (ej: zapato, comida, casa)..." autofocus>
                    <div id="icon_grid" class="grid grid-cols-4 gap-3 max-h-[350px] overflow-y-auto p-2 scrollbar-thin">
                        ${generarGridHTML(sugeridos)}
                    </div>
                </div>
            `,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            customClass: { popup: 'rounded-[2rem]' },
            didOpen: () => {
                const input = document.getElementById('icon_search_input');
                const grid = document.getElementById('icon_grid');

                input.addEventListener('input', (e) => {
                    const termOriginal = e.target.value.toLowerCase().trim();
                    clearTimeout(translationTimer);

                    if (termOriginal.length < 3) {
                        if (termOriginal.length === 0) grid.innerHTML = generarGridHTML(sugeridos);
                        return;
                    }

                    translationTimer = setTimeout(async () => {
                        grid.innerHTML = `
                            <div class="col-span-4 text-center py-10">
                                <i class="fa-solid fa-circle-notch fa-spin text-2xl text-blue-500"></i>
                                <p class="text-[10px] mt-2 font-bold uppercase text-slate-400">Traduciendo y buscando...</p>
                            </div>`;

                        const termIngles = await traducirBusqueda(termOriginal);
                        const filtrados = ICONOS_GLOBALES
                            .filter(icon => icon.includes(termIngles) || icon.includes(termOriginal))
                            .slice(0, 40);

                        grid.innerHTML = generarGridHTML(filtrados);
                    }, 600);
                });
            }
        });

        window.seleccionarIconoFinal = (clase) => {
            Swal.close();
            resolve(clase);
        };
    });
}

function generarGridHTML(lista) {
    if (lista.length === 0) {
        return `<div class="col-span-4 text-center py-10 text-slate-400 text-[10px] font-bold">SIN RESULTADOS</div>`;
    }
    return lista.map(icon => {
        const nombreIcono = icon.startsWith('fa-') ? icon : `fa-${icon}`;
        const claseCompleta = `fa-solid ${nombreIcono}`;
        return `
            <div onclick="window.seleccionarIconoFinal('${claseCompleta}')" 
                 class="flex flex-col items-center justify-center p-4 border border-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white cursor-pointer transition-all group aspect-square">
                <i class="${claseCompleta} text-2xl mb-1 group-hover:scale-125 transition-transform"></i>
                <span class="text-[7px] uppercase font-black opacity-40 group-hover:opacity-100 truncate w-full text-center">
                    ${icon.replace('fa-', '')}
                </span>
            </div>
        `;
    }).join('');
}

async function traducirBusqueda(texto) {
    if (!texto) return '';
    try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|en`);
        const data = await res.json();
        return data.responseData.translatedText.toLowerCase();
    } catch (e) {
        return texto;
    }
}

export const carruselActions = {

    validarPaso1() {
        const nombreInput = document.getElementById('cfg_nombre');
        const slugInput = document.getElementById('cfg_slug');
        const ordenInput = document.getElementById('cfg_orden_seccion');
        const descInput = document.getElementById('cfg_descripcion');

        const nombre = nombreInput ? nombreInput.value.trim() : '';
        const slug = slugInput ? slugInput.value : 'home-top';
        const orden = ordenInput ? parseInt(ordenInput.value) : 0;

        if (!nombre) {
            this._alertError("Ponle un nombre para identificarlo");
            return false;
        }

        carruselState.config.nombre = nombre;
        carruselState.config.ubicacion_slug = slug;
        carruselState.config.orden_seccion = isNaN(orden) ? 0 : orden;
        carruselState.config.descripcion = descInput ? descInput.value.trim() : '';

        return true;
    },

    buscarRelacionados(termino) {
        clearTimeout(searchTimer);
        const listaResultados = document.getElementById('search_results_list');

        if (!termino || termino.trim().length < 2) {
            if (listaResultados) {
                listaResultados.innerHTML = '';
                listaResultados.classList.add('hidden');
            }
            return;
        }

        searchTimer = setTimeout(async () => {
            try {
                const tipo = carruselState.config.tipo;

                // ✅ Reemplazado: window.carruselController.buscarItemsRelacionados() → carruselService.buscarRelacionados()
                const resultados = await carruselService.buscarRelacionados(tipo, termino);

                if (listaResultados) {
                    if (resultados && resultados.length > 0) {
                        listaResultados.innerHTML = resultados.map(res => {
                            const id = res.id;
                            const nombre = res.nombre || 'Sin nombre';
                            const imagen = res.imagen || 'https://placehold.co/100?text=No+Img';
                            const link = res.link || '';
                            const precio = res.precio || 0;

                            const nombreEscapado = nombre.replace(/'/g, "\\'").replace(/"/g, "&quot;");
                            const imagenEscapada = imagen.replace(/'/g, "\\'");
                            const linkEscapado = link.replace(/'/g, "\\'");
                            const esCategoria = tipo === 'categorias' || imagen.startsWith('fa-');

                            return `
                                <div onclick="carruselActions.seleccionarResultado('${id}', '${nombreEscapado}', '${imagenEscapada}', '${linkEscapado}', ${precio})" 
                                     class="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 transition-colors group">
                                    <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden">
                                        ${esCategoria
                                            ? `<i class="fa-solid fa-layer-group text-blue-500 text-lg"></i>`
                                            : `<img src="${imagen}" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/100?text=No+Img'">`
                                        }
                                    </div>
                                    <div class="flex flex-col min-w-0 flex-1">
                                        <span class="text-xs font-black text-slate-700 uppercase truncate">${nombre}</span>
                                        <div class="flex items-center gap-2">
                                            ${precio > 0
                                                ? `<span class="text-[10px] font-bold text-blue-600">Bs. ${precio.toLocaleString()}</span>`
                                                : `<span class="text-[9px] text-slate-400 font-bold uppercase">${tipo === 'categorias' ? 'Click para asignar icono' : ''}</span>`
                                            }
                                        </div>
                                    </div>
                                    <div class="w-8 h-8 flex items-center justify-center rounded-full group-hover:bg-blue-100 transition-colors">
                                        <i class="fa-solid fa-plus text-slate-300 group-hover:text-blue-600 text-xs"></i>
                                    </div>
                                </div>
                            `;
                        }).join('');
                        listaResultados.classList.remove('hidden');
                    } else {
                        listaResultados.innerHTML = `
                            <div class="p-6 text-center">
                                <i class="fa-solid fa-magnifying-glass text-slate-200 text-2xl mb-2"></i>
                                <p class="text-[10px] font-black text-slate-400 uppercase">Sin resultados para "${termino}"</p>
                            </div>`;
                        listaResultados.classList.remove('hidden');
                    }
                }
            } catch (error) {
                console.error("Error en búsqueda:", error);
                if (listaResultados) {
                    listaResultados.innerHTML = `
                        <div class="p-4 text-center">
                            <span class="text-[10px] text-red-400 uppercase font-bold italic">Error de conexión con el servidor</span>
                        </div>`;
                }
            }
        }, 400);
    },

    async seleccionarResultado(id, nombre, imagen, link, precio) {
        let valorMediaFinal = imagen;
        const tipoActual = carruselState.config.tipo;

        if (tipoActual === 'categorias') {
            const iconoElegido = await abrirBuscadorIconos(nombre);
            if (!iconoElegido) return;
            valorMediaFinal = iconoElegido;
        }

        const inputRelacion = document.getElementById('it_relacion_id');
        const inputTitulo = document.getElementById('it_titulo');
        const inputMedia = document.getElementById('it_media_url');
        const inputLink = document.getElementById('it_link');
        const inputSubtitulo = document.getElementById('it_subtitulo');
        const previewBox = document.getElementById('preview_box');

        if (inputRelacion) inputRelacion.value = id;
        if (inputTitulo) inputTitulo.value = nombre;
        if (inputMedia) inputMedia.value = valorMediaFinal;
        if (inputLink) inputLink.value = link || '';

        if (inputSubtitulo) {
            const precioFormateado = (precio && precio > 0)
                ? `Bs. ${precio.toLocaleString()}`
                : (tipoActual === 'categorias' ? "" : "Consultar precio");
            inputSubtitulo.value = precioFormateado;
        }

        if (previewBox) {
            if (valorMediaFinal.startsWith('fa-')) {
                previewBox.innerHTML = `
                <div class="flex items-center justify-center w-full h-full bg-slate-50 rounded-xl shadow-inner">
                    <i class="${valorMediaFinal} text-6xl text-blue-600 animate-pop"></i>
                </div>`;
            } else {
                const badgePrecio = (precio && precio > 0)
                    ? `<div class="absolute bottom-2 right-2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg border border-white/20">BS. ${precio.toLocaleString()}</div>`
                    : '';
                previewBox.innerHTML = `
                <div class="relative w-full h-full flex items-center justify-center bg-white rounded-xl overflow-hidden shadow-inner">
                    <img src="${valorMediaFinal}" class="max-w-full max-h-full object-contain p-2 animate-fade-in" onerror="this.src='https://placehold.co/400?text=Error+Imagen'">
                    ${badgePrecio}
                </div>`;
            }
        }

        this.limpiarBuscadorRapido();
    },

    limpiarBuscadorRapido() {
        const buscador = document.getElementById('it_search');
        const listaResultados = document.getElementById('search_results_list');
        if (buscador) buscador.value = '';
        if (listaResultados) {
            listaResultados.innerHTML = '';
            listaResultados.classList.add('hidden');
        }
    },

    async previsualizarMediaLocal(input) {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const previewBox = document.getElementById('preview_box');
                const mediaUrlInput = document.getElementById('it_media_url');
                if (mediaUrlInput) mediaUrlInput.value = e.target.result;
                if (previewBox) {
                    if (file.type.startsWith('video/')) {
                        previewBox.innerHTML = `<video src="${e.target.result}" class="w-full h-full object-cover" autoplay muted loop></video>`;
                    } else {
                        previewBox.innerHTML = `<img src="${e.target.result}" class="w-full h-full object-cover animate-fade-in">`;
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    },

    async pedirUrlImagen() {
        const { value: url } = await Swal.fire({
            title: 'URL de Multimedia',
            input: 'url',
            inputLabel: 'Pega el link de la imagen o video',
            showCancelButton: true,
            confirmButtonColor: '#0f172a',
            customClass: { popup: 'rounded-[2rem]' }
        });

        if (url) {
            const mediaUrlInput = document.getElementById('it_media_url');
            if (mediaUrlInput) mediaUrlInput.value = url;
            const previewBox = document.getElementById('preview_box');
            if (previewBox) {
                previewBox.innerHTML = `<img src="${url}" class="w-full h-full object-cover animate-fade-in" onerror="this.src='https://placehold.co/600x400?text=Error+Link'">`;
            }
        }
    },

    capturarItem() {
        const elMedia = document.getElementById('it_media_url');
        const elTitulo = document.getElementById('it_titulo');
        const elSubtitulo = document.getElementById('it_subtitulo');
        const elLink = document.getElementById('it_link');
        const elRelacion = document.getElementById('it_relacion_id');

        const mediaUrl = elMedia?.value || '';
        const titulo = elTitulo?.value.trim() || '';
        const subtitulo = elSubtitulo?.value.trim() || '';
        const link = elLink?.value.trim() || '';
        const relacionId = elRelacion?.value || null;
        const tipoActual = carruselState.config.tipo;

        if (!mediaUrl && tipoActual === 'banners') {
            Swal.fire("Error", "Los banners deben tener una imagen o contenido visual", "warning");
            return null;
        }

        const itemFinal = {
            imagen_preview: mediaUrl,
            titulo,
            subtitulo,
            link,
            relacion_id: relacionId,
            tipo_contenido: tipoActual,
            titulo_manual: titulo,
            subtitulo_manual: subtitulo,
            link_destino_manual: link,
            imagen_url_manual: mediaUrl.startsWith('fa-') ? null : mediaUrl,
            icono_manual: mediaUrl.startsWith('fa-') ? mediaUrl : null,
            producto_id: tipoActual === 'productos' ? (relacionId ? parseInt(relacionId) : null) : null,
            categoria_id: tipoActual === 'categorias' ? (relacionId ? parseInt(relacionId) : null) : null,
        };

        if (carruselState._editingItemIdx !== null) {
            const listaItems = Array.isArray(carruselState.items) ? carruselState.items : (carruselState.items.items || []);
            const itemOriginal = listaItems[carruselState._editingItemIdx];
            if (itemOriginal && itemOriginal.id) itemFinal.id = itemOriginal.id;
        }

        return itemFinal;
    },

    async cambiarIconoEdicion() {
        const elTitulo = document.getElementById('it_titulo');
        const elMedia = document.getElementById('it_media_url');
        const nombreActual = elTitulo ? elTitulo.value : 'Categoría';
        const nuevoIcono = await abrirBuscadorIconos(nombreActual);

        if (nuevoIcono) {
            if (elMedia) elMedia.value = nuevoIcono;
            this._actualizarPreviewLocal(nuevoIcono);
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Icono actualizado', showConfirmButton: false, timer: 2000 });
        }
    },

    async editarItem(index) {
        const item = carruselState.items[index];
        if (!item) return;

        const elMedia = document.getElementById('it_media_url');
        const elTitulo = document.getElementById('it_titulo');
        const elSubtitulo = document.getElementById('it_subtitulo');
        const elLink = document.getElementById('it_link');
        const elRelacion = document.getElementById('it_relacion_id');

        if (elMedia) elMedia.value = item.imagen_preview || '';
        if (elTitulo) elTitulo.value = item.titulo || '';
        if (elSubtitulo) elSubtitulo.value = item.subtitulo || '';
        if (elLink) elLink.value = item.link || '';
        if (elRelacion) elRelacion.value = item.producto_id || item.categoria_id || '';

        this._actualizarPreviewLocal(item.imagen_preview);
        carruselState.items.splice(index, 1);
        this.renderItems();

        Swal.fire({ toast: true, position: 'top-end', icon: 'info', title: 'Modo edición: Actualiza los campos y pulsa (+)', showConfirmButton: false, timer: 3000 });
    },

    _actualizarPreviewLocal(media) {
        const previewBox = document.getElementById('preview_box');
        if (!previewBox) return;

        previewBox.classList.remove('bg-slate-50', 'bg-blue-50');

        if (!media || media.trim() === '') {
            previewBox.innerHTML = `
            <div class="flex flex-col items-center justify-center text-slate-300">
                <span class="material-symbols-outlined text-5xl">image</span>
                <span class="text-xs mt-2 uppercase font-semibold">Sin Contenido</span>
            </div>`;
            previewBox.classList.add('bg-slate-50');
            return;
        }

        if (media.includes('fa-')) {
            previewBox.innerHTML = `
            <div class="flex items-center justify-center w-full h-full animate-fade-in">
                <i class="${media} text-6xl text-blue-600 drop-shadow-sm"></i>
            </div>`;
            previewBox.classList.add('bg-blue-50');
        } else {
            previewBox.innerHTML = `
            <img src="${media}" 
                 class="w-full h-full object-cover animate-fade-in rounded-lg" 
                 onerror="this.onerror=null; this.src='https://placehold.co/400x400?text=Imagen+No+Valida';">`;
        }
    },

    renderItems() {
        const contenedor = document.getElementById('items_agregados_list');
        if (!contenedor) return;

        if (carruselState.items.length === 0) {
            contenedor.innerHTML = `<div class="text-center p-8 text-slate-400">No hay elementos</div>`;
            return;
        }

        contenedor.innerHTML = carruselState.items.map((item, index) => `
            <div class="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-2xl mb-2 shadow-sm group">
                <div class="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                    ${item.imagen_preview.startsWith('fa-')
                        ? `<i class="${item.imagen_preview} text-blue-500"></i>`
                        : `<img src="${item.imagen_preview}" class="w-full h-full object-cover">`
                    }
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-[10px] font-black text-slate-700 uppercase truncate">${item.titulo}</p>
                    <p class="text-[9px] text-slate-400 truncate">${item.subtitulo || 'Sin subtítulo'}</p>
                </div>
                <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onclick="carruselActions.editarItem(${index})" class="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                        <i class="fa-solid fa-pen-to-square text-xs"></i>
                    </button>
                    <button onclick="carruselActions.eliminarItem(${index})" class="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <i class="fa-solid fa-trash text-xs"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    eliminarItem(index) {
        carruselState.items.splice(index, 1);
        this.renderItems();
    },

    seleccionarIcono(nombreIcono) {
        const inputMedia = document.getElementById('it_media_url');
        if (inputMedia) {
            inputMedia.value = nombreIcono;
            this._actualizarPreviewLocal(nombreIcono);
        }
    },

    async enviarAlServidor() {
        const state = window.carruselState;
        const listaItems = Array.isArray(state.items) ? state.items : (state.items?.items || []);

        if (!state || listaItems.length === 0) {
            Swal.fire({ title: "Lista vacía", text: "Agrega al menos un ítem antes de publicar.", icon: "warning", customClass: { popup: 'rounded-[2rem]' } });
            return;
        }

        const nombreCarrusel = state.config.nombre || "nuevo carrusel";
        const result = await Swal.fire({
            title: `¿Publicar "${nombreCarrusel}"?`,
            text: "La configuración y los ítems se actualizarán en la base de datos.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, publicar ahora',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2563eb',
            customClass: { popup: 'rounded-[2rem]' }
        });

        if (!result.isConfirmed) return;

        Swal.fire({
            title: 'Guardando...',
            html: 'Sincronizando con el servidor',
            didOpen: () => { Swal.showLoading(); },
            allowOutsideClick: false,
            customClass: { popup: 'rounded-[2rem]' }
        });

        try {
            // ✅ Reemplazado: window.carruselController.guardarConfiguracion() → carruselService.guardarCompleto()
            const items = listaItems.map((item, i) => ({
                orden: i,
                titulo_manual: item.titulo_manual || item.titulo || null,
                subtitulo_manual: item.subtitulo_manual || item.subtitulo || null,
                imagen_url_manual: item.imagen_preview || item.imagen_url_manual || item.icono_manual || null,
                link_destino_manual: item.link_destino_manual || item.link || null,
                producto_id: item.producto_id || null,
                categoria_id: item.categoria_id || null
            }));

            const res = await carruselService.guardarCompleto(state.config, items, state._id);
            if (!res.exito) throw new Error(res.mensaje);

            await Swal.fire({
                icon: 'success',
                title: '¡Publicado con éxito!',
                text: `El carrusel "${nombreCarrusel}" ha sido actualizado.`,
                timer: 2000,
                showConfirmButton: false,
                customClass: { popup: 'rounded-[2rem]' }
            });

            if (window.carruselController_View) window.carruselController_View.render();
            if (window.RegisterCarrusel?.cerrarYRefrescar) window.RegisterCarrusel.cerrarYRefrescar();
            else location.reload();

        } catch (error) {
            console.error("Error crítico en el guardado:", error);
            Swal.fire({ title: "Fallo en el guardado", text: "Detalle: " + error.message, icon: "error", customClass: { popup: 'rounded-[2rem]' } });
        }
    }
};