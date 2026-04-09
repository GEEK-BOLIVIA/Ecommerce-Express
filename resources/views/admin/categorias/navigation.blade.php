<div class="flex flex-col gap-8">
    {{-- Título --}}
    <div>
        <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Categorías — Inventario</h1>
        <p class="text-slate-500 text-sm mt-1">Organiza y segmenta el catálogo de productos.</p>
    </div>

    {{-- Barra de Herramientas --}}
    <div class="flex flex-wrap items-center justify-between gap-4">
        {{-- Tabs --}}
        <div class="flex gap-2 bg-slate-200/50 p-1 rounded-2xl border border-slate-200/60">
            <button @click="tabActiva = 'categorias'"
                :class="tabActiva === 'categorias' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'"
                class="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all">
                <span class="material-symbols-outlined text-[20px]">folder</span> Categorías
            </button>
            <button @click="tabActiva = 'subcategorias'"
                :class="tabActiva === 'subcategorias' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'"
                class="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all">
                <span class="material-symbols-outlined text-[20px]">account_tree</span> Subcategorías
            </button>
        </div>

        {{-- Buscador y Orden --}}
        <div class="flex items-center gap-3 w-full md:w-auto">
            <div class="relative flex-1 md:w-64">
                <span
                    class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input type="text" wire:model.live.debounce.500ms="busqueda" placeholder="Buscar..."
                    class="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 transition-all font-medium">
            </div>
            <button onclick="window.location.href='?orden={{ $orden === 'asc' ? 'desc' : 'asc' }}'"
                class="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 transition-all font-bold text-sm flex gap-2">
                <span class="material-symbols-outlined text-lg">
                    {{ $orden === 'asc' ? 'sort_by_alpha' : 'text_rotate_vertical' }}
                </span>
                {{ $orden === 'asc' ? 'A-Z' : 'Z-A' }}
            </button>
        </div>
    </div>
</div>
