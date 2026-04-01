{{-- resources/views/partials/admin/sidebar.blade.php --}}

{{-- Wrapper relativo para que el botón flotante se posicione respecto al conjunto --}}
<div class="relative flex h-screen shrink-0">

    <aside id="sidebar"
        class="relative flex h-screen flex-col border-r border-slate-200 bg-white shadow-sm transition-all duration-300 ease-in-out shrink-0 z-20 overflow-hidden"
        style="width: 280px; min-width: 280px;">

        {{-- ===== HEADER: Logo ===== --}}
        <div class="p-6 shrink-0">
            <div class="flex items-center h-12 w-full overflow-hidden">
                {{-- Logo expandido --}}
                <img src="{{ asset('images/logo.png') }}" alt="Logo"
                    class="h-10 w-auto object-contain transition-transform hover:scale-105 sidebar-show" />
                {{-- Favicon colapsado --}}
                <img src="{{ asset('images/favicon.png') }}" alt="Logo"
                    class="h-8 w-8 object-contain sidebar-only hidden" />
            </div>
            <div class="mt-4 px-1 sidebar-show overflow-hidden">
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] whitespace-nowrap">
                    Farmacia Cosmos · Owner
                </p>
            </div>
        </div>

        {{-- ===== NAVEGACIÓN ===== --}}
        <nav
            class="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 flex flex-col gap-5
                    [&::-webkit-scrollbar]:w-1
                    [&::-webkit-scrollbar-track]:bg-transparent
                    [&::-webkit-scrollbar-thumb]:bg-slate-200
                    [&::-webkit-scrollbar-thumb]:rounded-full">

            {{-- ── INVENTARIO ── --}}
            <div class="flex flex-col gap-0.5">
                <p
                    class="px-3 text-[10px] font-bold text-blue-600/70 uppercase tracking-wider mb-1 sidebar-show whitespace-nowrap">
                    Inventario
                </p>

                {{-- Productos --}}
                <details class="group/prod" {{ request()->routeIs('admin.inventory.products*') ? 'open' : '' }}>
                    <summary
                        class="flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-500
                        hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer list-none
                        {{ request()->routeIs('admin.inventory.products*') ? 'bg-blue-50 text-blue-600' : '' }}">
                        <div class="flex items-center gap-3 min-w-0">
                            <span class="material-symbols-outlined text-[20px] shrink-0">inventory_2</span>
                            <p class="text-sm font-medium sidebar-show whitespace-nowrap">Productos</p>
                        </div>
                        <span
                            class="material-symbols-outlined text-[16px] shrink-0 transition-transform group-open/prod:rotate-180 sidebar-show ml-2">
                            expand_more
                        </span>
                    </summary>
                    <div class="flex flex-col gap-0.5 mt-0.5 ml-4 pl-3 border-l-2 border-slate-100 sidebar-show">
                        <a href="#"
                            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-400 hover:text-blue-500 transition-all text-[10px] font-bold uppercase whitespace-nowrap">
                            <span class="material-symbols-outlined text-[15px] shrink-0">add_circle</span>
                            Añadir Producto
                        </a>
                        <a href="#"
                            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-400 hover:text-orange-500 transition-all text-[10px] font-bold uppercase whitespace-nowrap">
                            <span class="material-symbols-outlined text-[15px] shrink-0">upload_file</span>
                            Carga Masiva
                        </a>
                    </div>
                </details>

                {{-- Categorías --}}
                <details class="group/cat" {{ request()->routeIs('admin.inventory.categories*') ? 'open' : '' }}>
                    <summary
                        class="flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-500
                        hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer list-none
                        {{ request()->routeIs('admin.inventory.categories*') ? 'bg-blue-50 text-blue-600' : '' }}">
                        <a href="{{ route('admin.inventory.categories') }}" wire:navigate
                            class="flex items-center gap-3 flex-1 min-w-0" onclick="event.stopPropagation()">
                            <span class="material-symbols-outlined text-[20px] shrink-0">category</span>
                            <p class="text-sm font-medium sidebar-show whitespace-nowrap">Categorías</p>
                        </a>
                        <span
                            class="material-symbols-outlined text-[16px] shrink-0 transition-transform group-open/cat:rotate-180 sidebar-show ml-2">
                            expand_more
                        </span>
                    </summary>
                    <div class="flex flex-col gap-0.5 mt-0.5 ml-4 pl-3 border-l-2 border-slate-100 sidebar-show">
                        <a href="{{ route('admin.inventory.categories.create') }}" wire:navigate
                            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase transition-all whitespace-nowrap
                            {{ request()->routeIs('admin.inventory.categories.create') ? 'text-blue-600' : 'text-slate-400 hover:text-blue-500' }}">
                            <span class="material-symbols-outlined text-[15px] shrink-0">add_circle</span>
                            Nueva Categoría
                        </a>
                    </div>
                </details>

                {{-- Subcategorías --}}
                <details class="group/subcat">
                    <summary
                        class="flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-500
                        hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer list-none">
                        <div class="flex items-center gap-3 min-w-0">
                            <span class="material-symbols-outlined text-[20px] shrink-0">account_tree</span>
                            <p class="text-sm font-medium sidebar-show whitespace-nowrap">Subcategorías</p>
                        </div>
                        <span
                            class="material-symbols-outlined text-[16px] shrink-0 transition-transform group-open/subcat:rotate-180 sidebar-show ml-2">
                            expand_more
                        </span>
                    </summary>
                    <div class="flex flex-col gap-0.5 mt-0.5 ml-4 pl-3 border-l-2 border-slate-100 sidebar-show">
                        <a href="#"
                            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-400 hover:text-emerald-500 transition-all text-[10px] font-bold uppercase whitespace-nowrap">
                            <span class="material-symbols-outlined text-[15px] shrink-0">add_circle</span>
                            Nueva Subcategoría
                        </a>
                    </div>
                </details>
            </div>

            {{-- ── GESTIÓN HUMANA ── --}}
            <div class="flex flex-col gap-0.5">
                <p
                    class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 sidebar-show whitespace-nowrap">
                    Gestión Humana
                </p>

                <details class="group/owners">
                    <summary
                        class="flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-500
                        hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer list-none">
                        <div class="flex items-center gap-3 min-w-0">
                            <span class="material-symbols-outlined text-[20px] shrink-0">shield_person</span>
                            <p class="text-sm font-medium sidebar-show whitespace-nowrap">Owners</p>
                        </div>
                        <span
                            class="material-symbols-outlined text-[16px] shrink-0 transition-transform group-open/owners:rotate-180 sidebar-show ml-2">
                            expand_more
                        </span>
                    </summary>
                    <div class="flex flex-col gap-0.5 mt-0.5 ml-4 pl-3 border-l-2 border-slate-100 sidebar-show">
                        <a href="#"
                            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-400 hover:text-blue-500 transition-all text-[10px] font-bold uppercase whitespace-nowrap">
                            <span class="material-symbols-outlined text-[15px] shrink-0">add_moderator</span>
                            Nuevo Owner
                        </a>
                    </div>
                </details>

                <details class="group/admins">
                    <summary
                        class="flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-500
                        hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer list-none">
                        <div class="flex items-center gap-3 min-w-0">
                            <span class="material-symbols-outlined text-[20px] shrink-0">manage_accounts</span>
                            <p class="text-sm font-medium sidebar-show whitespace-nowrap">Administradores</p>
                        </div>
                        <span
                            class="material-symbols-outlined text-[16px] shrink-0 transition-transform group-open/admins:rotate-180 sidebar-show ml-2">
                            expand_more
                        </span>
                    </summary>
                    <div class="flex flex-col gap-0.5 mt-0.5 ml-4 pl-3 border-l-2 border-slate-100 sidebar-show">
                        <a href="#"
                            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-400 hover:text-blue-500 transition-all text-[10px] font-bold uppercase whitespace-nowrap">
                            <span class="material-symbols-outlined text-[15px] shrink-0">person_add</span>
                            Nuevo Administrador
                        </a>
                    </div>
                </details>

                <a href="#"
                    class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
                    <span class="material-symbols-outlined text-[20px] shrink-0">group</span>
                    <p class="text-sm font-medium sidebar-show whitespace-nowrap">Clientes</p>
                </a>
            </div>

            {{-- ── ESTRUCTURA DE NEGOCIO ── --}}
            <div class="flex flex-col gap-0.5">
                <p
                    class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 sidebar-show whitespace-nowrap">
                    Estructura de Negocio
                </p>

                <details class="group/suc">
                    <summary
                        class="flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-500
                        hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer list-none">
                        <div class="flex items-center gap-3 min-w-0">
                            <span class="material-symbols-outlined text-[20px] shrink-0">store</span>
                            <p class="text-sm font-medium sidebar-show whitespace-nowrap">Sucursales</p>
                        </div>
                        <span
                            class="material-symbols-outlined text-[16px] shrink-0 transition-transform group-open/suc:rotate-180 sidebar-show ml-2">
                            expand_more
                        </span>
                    </summary>
                    <div class="flex flex-col gap-0.5 mt-0.5 ml-4 pl-3 border-l-2 border-slate-100 sidebar-show">
                        <a href="#"
                            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-400 hover:text-blue-500 transition-all text-[10px] font-bold uppercase whitespace-nowrap">
                            <span class="material-symbols-outlined text-[15px] shrink-0">add_location_alt</span>
                            Nueva Sucursal
                        </a>
                    </div>
                </details>

                <details class="group/dep">
                    <summary
                        class="flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-500
                        hover:bg-emerald-50 hover:text-emerald-600 transition-all cursor-pointer list-none">
                        <div class="flex items-center gap-3 min-w-0">
                            <span class="material-symbols-outlined text-[20px] shrink-0">map</span>
                            <p class="text-sm font-medium sidebar-show whitespace-nowrap">Departamentos</p>
                        </div>
                        <span
                            class="material-symbols-outlined text-[16px] shrink-0 transition-transform group-open/dep:rotate-180 sidebar-show ml-2">
                            expand_more
                        </span>
                    </summary>
                    <div class="flex flex-col gap-0.5 mt-0.5 ml-4 pl-3 border-l-2 border-slate-100 sidebar-show">
                        <a href="#"
                            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-400 hover:text-emerald-500 transition-all text-[10px] font-bold uppercase whitespace-nowrap">
                            <span class="material-symbols-outlined text-[15px] shrink-0">add_location_alt</span>
                            Nuevo Departamento
                        </a>
                    </div>
                </details>

                <details class="group/dir">
                    <summary
                        class="flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-500
                        hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer list-none">
                        <div class="flex items-center gap-3 min-w-0">
                            <span class="material-symbols-outlined text-[20px] shrink-0">location_on</span>
                            <p class="text-sm font-medium sidebar-show whitespace-nowrap">Direcciones</p>
                        </div>
                        <span
                            class="material-symbols-outlined text-[16px] shrink-0 transition-transform group-open/dir:rotate-180 sidebar-show ml-2">
                            expand_more
                        </span>
                    </summary>
                    <div class="flex flex-col gap-0.5 mt-0.5 ml-4 pl-3 border-l-2 border-slate-100 sidebar-show">
                        <a href="#"
                            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-400 hover:text-blue-500 transition-all text-[10px] font-bold uppercase whitespace-nowrap">
                            <span class="material-symbols-outlined text-[15px] shrink-0">add_location_alt</span>
                            Nueva Dirección
                        </a>
                    </div>
                </details>
            </div>

            {{-- ── CONFIGURACIÓN ── --}}
            <div class="flex flex-col gap-0.5">
                <p
                    class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 sidebar-show whitespace-nowrap">
                    Configuración
                </p>

                <a href="#"
                    class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                    <span class="material-symbols-outlined text-[20px] shrink-0">palette</span>
                    <p class="text-sm font-medium sidebar-show whitespace-nowrap">Página Cliente</p>
                </a>

                <details class="group/car">
                    <summary
                        class="flex items-center justify-between rounded-lg px-3 py-2.5 text-slate-500
                        hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer list-none">
                        <div class="flex items-center gap-3 min-w-0">
                            <span class="material-symbols-outlined text-[20px] shrink-0">view_carousel</span>
                            <p class="text-sm font-medium sidebar-show whitespace-nowrap">Carruseles</p>
                        </div>
                        <span
                            class="material-symbols-outlined text-[16px] shrink-0 transition-transform group-open/car:rotate-180 sidebar-show ml-2">
                            expand_more
                        </span>
                    </summary>
                    <div class="flex flex-col gap-0.5 mt-0.5 ml-4 pl-3 border-l-2 border-slate-100 sidebar-show">
                        <a href="#"
                            class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-400 hover:text-blue-500 transition-all text-[10px] font-bold uppercase whitespace-nowrap">
                            <span class="material-symbols-outlined text-[15px] shrink-0">add_circle</span>
                            Nuevo Carrusel
                        </a>
                    </div>
                </details>
            </div>

        </nav>

        {{-- ===== FOOTER: Perfil + Logout ===== --}}
        <div class="border-t border-slate-100 bg-slate-50/50 p-3 flex flex-col gap-2 shrink-0">

            <div
                class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm overflow-hidden">
                <div class="relative shrink-0">
                    <div
                        class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                        {{ strtoupper(substr(auth()->user()->nombres ?? 'O', 0, 1)) }}
                    </div>
                    <span
                        class="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                </div>
                <div class="flex flex-col min-w-0 sidebar-show">
                    <p class="text-slate-800 text-sm font-bold truncate">
                        {{ auth()->user()->nombres ?? 'Owner' }} {{ auth()->user()->apellido_paterno ?? '' }}
                    </p>
                    <p class="text-slate-500 text-[11px] truncate">
                        {{ auth()->user()->correo_electronico ?? '' }}
                    </p>
                </div>
            </div>

            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit"
                    class="flex w-full items-center gap-3 rounded-xl p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                    <span class="material-symbols-outlined text-[20px] shrink-0">logout</span>
                    <span class="text-sm font-bold sidebar-show whitespace-nowrap">Cerrar Sesión</span>
                </button>
            </form>
        </div>

    </aside>

    {{-- Botón toggle FUERA del aside para que no se corte con overflow-hidden --}}
    <button id="sidebar-toggle"
        class="absolute top-10 z-30 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm hover:text-blue-600 transition-all duration-300"
        style="left: calc(280px - 12px);">
        <span id="sidebar-toggle-icon" class="material-symbols-outlined text-[18px]">chevron_left</span>
    </button>

</div>
