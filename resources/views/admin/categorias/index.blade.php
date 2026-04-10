@extends('layouts.admin')

@section('title', 'Categorías - Farmacia Cosmos')

@section('content')
    {{-- Asegúrate de tener Alpine cargado en tu layout principal para evitar este script aquí --}}
    <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>

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
            {{-- Selector de Pestañas (Tailwind puro para estados) --}}
            <div class="flex gap-2 bg-slate-200/50 p-1 rounded-2xl w-fit border border-slate-200/60 font-bold text-sm">
                <button type="button" x-on:click="tab = 'categorias'"
                    :class="tab === 'categorias' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                    class="flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300">
                    <span class="material-symbols-outlined text-[20px]">folder</span> Categorías
                </button>
                <button type="button" x-on:click="tab = 'subcategorias'"
                    :class="tab === 'subcategorias' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                    class="flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300">
                    <span class="material-symbols-outlined text-[20px]">account_tree</span> Subcategorías
                </button>
            </div>

            {{-- Buscador --}}
            <div class="flex items-center gap-3 w-full md:w-auto">
                <div class="relative flex items-center flex-1 md:w-64">
                    <span class="material-symbols-outlined absolute left-3 text-slate-400 text-lg font-light">search</span>
                    <input type="text" placeholder="Buscar por nombre..."
                        class="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-9 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium placeholder:text-slate-400">
                </div>
            </div>
        </div>

        {{-- 3. CONTENEDORES DE TABLA --}}

        {{-- TAB CATEGORÍAS --}}
        <div x-show="tab === 'categorias'" class="animate-fade-in" x-transition>
            <div class="flex justify-between items-center mb-4 px-1">
                <h2 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                    Listado de Categorías ({{ count($padres) }})
                </h2>
                <a href="{{ route('admin.inventory.categories.create') }}"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 font-bold text-sm flex items-center gap-2">
                    <span class="material-symbols-outlined text-[20px]">add</span> Nueva
                </a>
            </div>

            <div class="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50/80 border-b border-slate-200">
                            <th
                                class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase w-32 text-center tracking-wider">
                                #</th>
                            <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center tracking-wider">
                                Nombre</th>
                            <th
                                class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center w-52 tracking-wider">
                                Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach ($padres as $index => $cat)
                            <tr class="hover:bg-blue-50/40 transition-colors duration-200">
                                <td class="px-6 py-4 text-center border-r border-slate-50/50">
                                    <div class="flex items-center justify-center gap-3">
                                        <input type="checkbox"
                                            class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
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
                                        <a href="{{ route('admin.inventory.categories.create', ['id' => $cat->id]) }}"
                                            class="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm">
                                            <span class="material-symbols-outlined text-lg">edit</span>
                                        </a>
                                        <form action="{{ route('admin.inventory.categories.destroy', $cat->id) }}"
                                            method="POST" onsubmit="return confirm('¿Estás seguro?')">
                                            @csrf @method('DELETE')
                                            <button type="submit"
                                                class="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all duration-200 shadow-sm">
                                                <span class="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        {{-- TAB SUBCATEGORÍAS --}}
        <div x-show="tab === 'subcategorias'" x-cloak {{-- Para reemplazar el CSS de x-cloak, asegúrate de tenerlo en tu CSS global o deja el style oculto --}} class="animate-fade-in" x-transition>

            <div class="flex justify-between items-center mb-4 px-1">
                <h2 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                    Listado de Subcategorías ({{ count($hijos) }})
                </h2>
                <a href="{{ route('admin.inventory.categories.create') }}"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md font-bold text-sm flex items-center gap-2 active:scale-95">
                    <span class="material-symbols-outlined text-[20px]">add</span> Nueva
                </a>
            </div>

            <div class="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-50/80 border-b border-slate-200">
                            <th
                                class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase w-32 text-center tracking-wider">
                                #</th>
                            <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center tracking-wider">
                                Nombre</th>
                            <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center tracking-wider">
                                Vinculado a</th>
                            <th
                                class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center w-52 tracking-wider">
                                Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        @foreach ($hijos as $index => $hijo)
                            <tr class="hover:bg-blue-50/40 transition-colors duration-200">
                                <td class="px-6 py-4 text-center border-r border-slate-50/50">
                                    <div class="flex items-center justify-center gap-3">
                                        <input type="checkbox"
                                            class="w-4 h-4 rounded border-slate-300 text-blue-600 cursor-pointer">
                                        <span
                                            class="w-2.5 h-2.5 rounded-full {{ $hijo->visible ? 'bg-emerald-500' : 'bg-slate-300' }} ring-4 ring-white shadow-sm"></span>
                                        <span class="text-sm text-slate-400 font-bold font-mono">{{ $index + 1 }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <span
                                        class="text-slate-800 font-bold text-[13px] tracking-wide">{{ $hijo->nombre }}</span>
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <span
                                        class="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black border border-slate-200 shadow-sm uppercase">
                                        {{ $hijo->parent->nombre ?? 'N/A' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex justify-center">
                                        <a href="{{ route('admin.inventory.categories.create', ['id' => $hijo->id]) }}"
                                            class="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                            <span class="material-symbols-outlined text-lg">edit</span>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
