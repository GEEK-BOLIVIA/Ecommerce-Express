import './bootstrap';
import Alpine from 'alpinejs'

window.Alpine = Alpine

// Registro Global del Helper de Paginación
Alpine.data('paginationHelper', (totalItems, itemsPerPage, initialPage = 1) => ({
    // Forzamos que todo sea número desde el inicio
    currentPage: parseInt(initialPage),
    totalItems: parseInt(totalItems),
    itemsPerPage: parseInt(itemsPerPage),

    get totalPages() {
        const total = Math.ceil(this.totalItems / this.itemsPerPage);
        return total > 0 ? total : 1;
    },

    get pages() {
        const total = this.totalPages;
        const current = this.currentPage;
        const delta = 1;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    },

    cambiarPagina(page) {
        // Si es el texto "...", no hacer nada
        if (page === '...') return;

        const p = parseInt(page);
        if (p < 1 || p > this.totalPages || p === this.currentPage) return;

        this.currentPage = p;
        this.$dispatch('pagina-cambiada', { pagina: p });
    },

    get from() {
        return ((this.currentPage - 1) * this.itemsPerPage) + 1;
    },

    get to() {
        return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    }
}));
// --- NUEVOS WIDGETS DE TABLA ---
// Los registramos en un objeto global para acceder fácil desde Alpine
window.TableWidgets = {
    // Renderiza el Badge con texto y subtexto
    badge(text, subtext = '') {
        return `
            <div class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/50 shadow-sm">
                <span class="text-slate-700 font-black text-xs">${text}</span>
                ${subtext ? `<span class="ml-1 text-[10px] text-slate-400 font-black uppercase tracking-tighter">${subtext}</span>` : ''}
            </div>
        `;
    },

    // Renderiza los botones de acción con tooltip
    actionButton(id, icon, label, color, callbackName) {
        const colores = {
            blue: 'bg-blue-50 text-blue-600 border-blue-100/50 hover:bg-blue-600',
            indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100/50 hover:bg-indigo-600',
            red: 'bg-red-50 text-red-500 border-red-100/50 hover:bg-red-500',
            slate: 'bg-slate-50 text-slate-600 border-slate-100/50 hover:bg-slate-600'
        };

        const clasesColor = colores[color] || colores.slate;

        return `
            <div class="group/tooltip relative flex justify-center">
                <button onclick="${callbackName}('${id}')"
                        class="w-9 h-9 flex items-center justify-center rounded-xl transition-all shadow-sm hover:text-white ${clasesColor}">
                    <span class="material-symbols-outlined" style="font-variation-settings: 'wght' 250; font-size: 18px;">${icon}</span>
                </button>
                <span class="absolute -top-10 scale-0 transition-all rounded bg-slate-800 px-2 py-1 text-[10px] font-bold text-white group-hover/tooltip:scale-100 z-50 whitespace-nowrap shadow-lg pointer-events-none">
                    ${label}
                    <i class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></i>
                </span>
            </div>
        `;
    }
};
// --- SISTEMA GLOBAL DE SELECCIÓN POR LOTES ---
window.TableSelection = {
    _seleccionados: new Set(),

    // Alternar selección de un solo ítem
    toggle(id, checkboxEl) {
        const idStr = String(id);
        if (this._seleccionados.has(idStr)) {
            this._seleccionados.delete(idStr);
        } else {
            this._seleccionados.add(idStr);
        }
        this._sincronizarFila(checkboxEl);
        this._actualizarInterfaz();
    },

    // Alternar todos los de la vista actual
    toggleTodos(masterCheckbox, selectorHijos) {
        const checkboxes = document.querySelectorAll(selectorHijos);
        checkboxes.forEach(cb => {
            const id = String(cb.dataset.id);
            if (masterCheckbox.checked) {
                this._seleccionados.add(id);
                cb.checked = true;
            } else {
                this._seleccionados.delete(id);
                cb.checked = false;
            }
            this._sincronizarFila(cb);
        });
        this._actualizarInterfaz();
    },

    // Aplica el color de fondo a la fila TR
    _sincronizarFila(checkboxEl) {
        const fila = checkboxEl.closest('tr');
        if (fila) {
            if (checkboxEl.checked) fila.classList.add('bg-blue-50/60');
            else fila.classList.remove('bg-blue-50/60');
        }
    },

    _actualizarInterfaz() {
        const cantidad = this._seleccionados.size;
        const barra = document.getElementById('barra-lote-global');
        const contador = document.getElementById('lote-contador-global');

        if (barra) {
            if (cantidad > 0) {
                barra.classList.remove('translate-y-full', 'opacity-0');
            } else {
                barra.classList.add('translate-y-full', 'opacity-0');
            }
        }
        if (contador) contador.textContent = cantidad;

        // Actualizar estado "Indeterminate" de los headers
        document.querySelectorAll('.checkbox-master').forEach(master => {
            const checkboxesVista = document.querySelectorAll('.cat-checkbox');
            const seleccionadosVista = Array.from(checkboxesVista).filter(cb => cb.checked).length;

            master.checked = seleccionadosVista === checkboxesVista.length && checkboxesVista.length > 0;
            master.indeterminate = seleccionadosVista > 0 && seleccionadosVista < checkboxesVista.length;
        });
    },

    limpiar() {
        this._seleccionados.clear();
        document.querySelectorAll('.cat-checkbox, .checkbox-master').forEach(cb => cb.checked = false);
        document.querySelectorAll('tr').forEach(tr => tr.classList.remove('bg-blue-50/60'));
        this._actualizarInterfaz();
    },

    getSeleccionados() {
        return Array.from(this._seleccionados);
    }
};
Alpine.start()
