@extends('layouts.admin')

@section('title', 'Categorías - Farmacia Cosmos')

@section('content')
    <div class="p-8 animate-fade-in max-h-[calc(100vh-64px)] overflow-y-auto" x-data="{ tab: 'categorias' }">

        {{-- 1. HEADER --}}
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Categorías - Clasificación de Inventario</h1>
                <p class="text-slate-500 text-sm">Organiza y segmenta el catálogo de productos.</p>
            </div>
        </div>

        {{-- 2. BARRA DE HERRAMIENTAS --}}
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div class="flex gap-2 bg-slate-200/50 p-1 rounded-2xl w-fit border border-slate-200/60 font-bold text-sm">
                <button type="button" x-on:click="tab = 'categorias'; TableSelection.limpiar()"
                    :class="tab === 'categorias' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                    class="flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300">
                    <span class="material-symbols-outlined text-[20px]">folder</span> Categorías
                </button>
                <button type="button" x-on:click="tab = 'subcategorias'; TableSelection.limpiar()"
                    :class="tab === 'subcategorias' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                    class="flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300">
                    <span class="material-symbols-outlined text-[20px]">account_tree</span> Subcategorías
                </button>
            </div>

            <div class="flex items-center gap-3 w-full md:w-auto">
                <div class="relative flex items-center flex-1 md:w-64">
                    <span class="material-symbols-outlined absolute left-3 text-slate-400 text-lg">search</span>
                    <input type="text" placeholder="Buscar por nombre..."
                        class="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-9 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400">
                </div>
            </div>
        </div>

        {{-- 3. TABLA DE CATEGORÍAS --}}
        <div x-show="tab === 'categorias'" x-transition:enter.duration.300ms x-data="paginationHelper({{ count($padres) }}, 10)">
            <div class="flex justify-between items-center mb-4 px-1">
                <h2 class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Listado de Categorías
                    ({{ count($padres) }})</h2>
                <a href="{{ route('admin.inventory.categories.create') }}"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 font-bold text-sm flex items-center gap-2">
                    <span class="material-symbols-outlined text-[20px]">add</span> Nueva
                </a>
            </div>

            <div class="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50/80 border-b border-slate-200">
                            <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase w-32 text-center">
                                <div class="flex items-center justify-center gap-3">
                                    <input type="checkbox"
                                        class="checkbox-master w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                                        onclick="TableSelection.toggleTodos(this, '.cat-checkbox')">
                                    <span>N°</span>
                                </div>
                            </th>
                            <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center">Nombre</th>
                            <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center w-64">Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach ($padres as $index => $cat)
                            <tr x-show="({{ $index }} + 1) >= from && ({{ $index }} + 1) <= to"
                                class="hover:bg-blue-50/40 transition-colors duration-200">
                                <td class="px-6 py-4 text-center border-r border-slate-50/50">
                                    <div class="flex items-center justify-center gap-3">
                                        <input type="checkbox"
                                            class="cat-checkbox w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                                            data-id="{{ $cat->id }}"
                                            onclick="TableSelection.toggle('{{ $cat->id }}', this)">
                                        <span
                                            class="w-2.5 h-2.5 rounded-full {{ $cat->visible ? 'bg-emerald-500' : 'bg-slate-300' }} ring-4 ring-white shadow-sm"></span>
                                        <span class="text-sm text-slate-400 font-bold font-mono">{{ $index + 1 }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <span
                                        class="text-slate-800 font-bold text-[13px] tracking-wide">{{ $cat->nombre }}</span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center justify-center gap-2">
                                        <div
                                            x-html="TableWidgets.actionButton('{{ $cat->id }}', 'visibility', 'Ver detalles', 'slate', 'verDetalles')">
                                        </div>
                                        <div
                                            x-html="TableWidgets.actionButton('{{ $cat->id }}', 'edit', 'Editar registro', 'blue', 'editarRegistro')">
                                        </div>
                                        <div
                                            x-html="TableWidgets.actionButton('{{ $cat->id }}', 'delete', 'Eliminar permanentemente', 'red', 'confirmarEliminar')">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            {{-- CONTROLES PAGINACIÓN CATEGORÍAS --}}
            <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Mostrando <span x-text="from"></span> - <span x-text="to"></span> de <span
                        x-text="totalItems"></span>
                </p>
                <div class="flex items-center gap-1.5">
                    <button @click="cambiarPagina(currentPage - 1)" :disabled="currentPage === 1"
                        class="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 transition-all shadow-sm disabled:opacity-20 disabled:pointer-events-none">
                        <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>

                    <template x-for="page in pages" :key="page">
                        <div class="flex items-center">
                            <template x-if="page !== '...'">
                                <button @click="cambiarPagina(page)"
                                    :class="currentPage === page ? 'bg-blue-600 text-white shadow-md shadow-blue-200' :
                                        'bg-white border border-slate-200 text-slate-600 hover:border-blue-400'"
                                    class="w-9 h-9 flex items-center justify-center rounded-xl text-[11px] font-black transition-all"
                                    x-text="page">
                                </button>
                            </template>
                            <template x-if="page === '...'">
                                <span
                                    class="w-9 h-9 flex items-center justify-center text-slate-400 text-xs font-bold">...</span>
                            </template>
                        </div>
                    </template>

                    <button @click="cambiarPagina(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 transition-all shadow-sm disabled:opacity-20 disabled:pointer-events-none">
                        <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>

        {{-- 4. TABLA DE SUBCATEGORÍAS --}}
        <div x-show="tab === 'subcategorias'" x-cloak x-transition:enter.duration.300ms x-data="paginationHelper({{ count($hijos) }}, 10)">
            <div class="flex justify-between items-center mb-4 px-1">
                <h2 class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Listado de Subcategorías
                    ({{ count($hijos) }})</h2>
                <a href="{{ route('admin.inventory.categories.create') }}"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md font-bold text-sm flex items-center gap-2">
                    <span class="material-symbols-outlined text-[20px]">add</span> Nueva
                </a>
            </div>

            <div class="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50/80 border-b border-slate-200">
                            <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase w-32 text-center">
                                <div class="flex items-center justify-center gap-3">
                                    <input type="checkbox"
                                        class="checkbox-master w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                                        onclick="TableSelection.toggleTodos(this, '.cat-checkbox')">
                                    <span>N°</span>
                                </div>
                            </th>
                            <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center tracking-wider">
                                Nombre</th>
                            <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center tracking-wider">
                                Vinculado a</th>
                            <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center w-64">Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach ($hijos as $index => $hijo)
                            <tr x-show="({{ $index }} + 1) >= from && ({{ $index }} + 1) <= to"
                                class="hover:bg-blue-50/40 transition-colors">
                                <td class="px-6 py-4 text-center border-r border-slate-50/50">
                                    <div class="flex items-center justify-center gap-3">
                                        <input type="checkbox"
                                            class="cat-checkbox w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                                            data-id="{{ $hijo->id }}"
                                            onclick="TableSelection.toggle('{{ $hijo->id }}', this)">
                                        <span
                                            class="w-2.5 h-2.5 rounded-full {{ $hijo->visible ? 'bg-emerald-500' : 'bg-slate-300' }} ring-4 ring-white shadow-sm"></span>
                                        <span
                                            class="text-sm text-slate-400 font-bold font-mono">{{ $index + 1 }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <span
                                        class="text-slate-800 font-bold text-[13px] tracking-wide">{{ $hijo->nombre }}</span>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div x-html="TableWidgets.badge('{{ $hijo->parent->nombre ?? 'N/A' }}', '')"></div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center justify-center gap-2">
                                        <div
                                            x-html="TableWidgets.actionButton('{{ $hijo->id }}', 'visibility', 'Ver detalles', 'slate', 'verDetalles')">
                                        </div>
                                        <div
                                            x-html="TableWidgets.actionButton('{{ $hijo->id }}', 'edit', 'Editar registro', 'blue', 'editarRegistro')">
                                        </div>
                                        <div
                                            x-html="TableWidgets.actionButton('{{ $hijo->id }}', 'delete', 'Eliminar permanentemente', 'red', 'confirmarEliminar')">
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            {{-- CONTROLES PAGINACIÓN SUBCATEGORÍAS --}}
            <div class="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Mostrando <span x-text="from"></span> - <span x-text="to"></span> de <span
                        x-text="totalItems"></span>
                </p>
                <div class="flex items-center gap-1.5">
                    <button @click="cambiarPagina(currentPage - 1)" :disabled="currentPage === 1"
                        class="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 transition-all shadow-sm disabled:opacity-20 disabled:pointer-events-none">
                        <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                    </button>

                    <template x-for="page in pages" :key="page">
                        <div class="flex items-center">
                            <template x-if="page !== '...'">
                                <button @click="cambiarPagina(page)"
                                    :class="currentPage === page ? 'bg-blue-600 text-white shadow-md shadow-blue-200' :
                                        'bg-white border border-slate-200 text-slate-600 hover:border-blue-400'"
                                    class="w-9 h-9 flex items-center justify-center rounded-xl text-[11px] font-black transition-all"
                                    x-text="page">
                                </button>
                            </template>
                            <template x-if="page === '...'">
                                <span
                                    class="w-9 h-9 flex items-center justify-center text-slate-400 text-xs font-bold">...</span>
                            </template>
                        </div>
                    </template>

                    <button @click="cambiarPagina(currentPage + 1)" :disabled="currentPage === totalPages"
                        class="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 transition-all shadow-sm disabled:opacity-20 disabled:pointer-events-none">
                        <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>

        {{-- BARRA FLOTANTE GLOBAL --}}
        <div id="barra-lote-global"
            class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] translate-y-full opacity-0 transition-all duration-500 ease-in-out pointer-events-none">
            <div
                class="flex items-center gap-4 bg-slate-900 border border-slate-700 px-6 py-3 rounded-2xl shadow-2xl pointer-events-auto">
                <div class="flex flex-col border-r border-slate-700 pr-4 text-left">
                    <span class="text-[9px] text-slate-400 font-black uppercase tracking-widest">Seleccionados</span>
                    <span class="text-white font-bold text-sm"><span id="lote-contador-global">0</span> registros</span>
                </div>

                <button onclick="eliminarEnLote()"
                    class="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white transition-all font-bold text-[10px] uppercase">
                    <span class="material-symbols-outlined text-[18px]">delete_sweep</span> Eliminar
                </button>

                <button onclick="TableSelection.limpiar()" class="text-slate-500 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[20px]">close</span>
                </button>
            </div>
        </div>
    </div>
@endsection
