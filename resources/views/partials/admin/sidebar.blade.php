<nav class="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar flex flex-col gap-6">

    <div class="flex flex-col gap-1">
        <p class="px-3 text-[11px] font-bold text-blue-600/70 uppercase tracking-wider mb-2 sidebar-hide">
            Inventario
        </p>

        <details class="group px-1" {{ request()->routeIs('admin.inventory.categories*') ? 'open' : '' }}>
            <summary
                class="flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer list-none">
                <a href="{{ route('admin.inventory.categories') }}" wire:navigate class="flex items-center gap-3 flex-1">
                    <span class="material-symbols-outlined text-[20px]">category</span>
                    <p class="text-sm font-medium sidebar-hide">Categorías</p>
                </a>
                <span
                    class="material-symbols-outlined text-[18px] transition-transform group-open:rotate-180 sidebar-hide">expand_more</span>
            </summary>

            <div class="flex flex-col gap-1 mt-1 ml-4 pl-4 border-l-2 border-slate-100 sidebar-hide">
                <a href="{{ route('admin.inventory.categories.create') }}" wire:navigate
                    class="flex items-center gap-3 rounded-lg px-3 py-1.5 text-slate-400 hover:text-blue-500 transition-all text-[10px] font-bold uppercase text-left">
                    <span class="material-symbols-outlined text-[16px]">add_circle</span>
                    Nueva Categoría
                </a>
            </div>
        </details>
    </div>

</nav>
