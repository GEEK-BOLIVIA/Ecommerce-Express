{{-- resources/views/admin/dashboard.blade.php --}}

@extends('layouts.admin')

@section('title', 'Dashboard - Farmacia Cosmos')

@section('content')
    <div class="p-6 lg:p-8">

        <div class="mb-8">
            <h1 class="text-2xl font-bold text-slate-800">
                Bienvenido, {{ auth()->user()->nombres ?? 'Owner' }} 👋
            </h1>
            <p class="mt-1 text-sm text-slate-500">
                Panel de control · {{ now()->translatedFormat('d \d\e F \d\e Y') }}
            </p>
        </div>

        {{-- Cards de resumen --}}
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <div class="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                    <span class="material-symbols-outlined text-[24px]"
                        style="font-variation-settings: 'FILL' 1">inventory_2</span>
                </div>
                <div>
                    <p class="text-2xl font-bold text-slate-800">—</p>
                    <p class="text-sm text-slate-500">Productos</p>
                </div>
            </div>

            <div class="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
                    <span class="material-symbols-outlined text-[24px]"
                        style="font-variation-settings: 'FILL' 1">category</span>
                </div>
                <div>
                    <p class="text-2xl font-bold text-slate-800">—</p>
                    <p class="text-sm text-slate-500">Categorías</p>
                </div>
            </div>

            <div class="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm opacity-50">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-400">
                    <span class="material-symbols-outlined text-[24px]"
                        style="font-variation-settings: 'FILL' 1">point_of_sale</span>
                </div>
                <div>
                    <p class="text-2xl font-bold text-slate-800">—</p>
                    <p class="text-sm text-slate-500">Pedidos <span
                            class="text-[10px] font-bold uppercase text-slate-400">(pronto)</span></p>
                </div>
            </div>

            <div class="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm opacity-50">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-400">
                    <span class="material-symbols-outlined text-[24px]"
                        style="font-variation-settings: 'FILL' 1">group</span>
                </div>
                <div>
                    <p class="text-2xl font-bold text-slate-800">—</p>
                    <p class="text-sm text-slate-500">Clientes <span
                            class="text-[10px] font-bold uppercase text-slate-400">(pronto)</span></p>
                </div>
            </div>

        </div>

        {{-- Accesos rápidos --}}
        <div class="mt-8">
            <h2 class="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">Accesos rápidos</h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                <a href="{{ route('admin.inventory.categories') }}"
                    class="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
                    <div
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                        <span class="material-symbols-outlined text-[20px]">category</span>
                    </div>
                    <div>
                        <p class="font-semibold text-slate-700">Ver categorías</p>
                        <p class="text-xs text-slate-400">Gestionar el listado</p>
                    </div>
                    <span
                        class="material-symbols-outlined ml-auto text-[18px] text-slate-300 group-hover:text-blue-500">arrow_forward</span>
                </a>

                <a href="{{ route('admin.inventory.categories.create') }}"
                    class="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
                    <div
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                        <span class="material-symbols-outlined text-[20px]">add_circle</span>
                    </div>
                    <div>
                        <p class="font-semibold text-slate-700">Nueva categoría</p>
                        <p class="text-xs text-slate-400">Agregar al inventario</p>
                    </div>
                    <span
                        class="material-symbols-outlined ml-auto text-[18px] text-slate-300 group-hover:text-blue-500">arrow_forward</span>
                </a>

                <a href="{{ route('admin.inventory.products') }}"
                    class="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md">
                    <div
                        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                        <span class="material-symbols-outlined text-[20px]">inventory_2</span>
                    </div>
                    <div>
                        <p class="font-semibold text-slate-700">Productos</p>
                        <p class="text-xs text-slate-400">Ver inventario completo</p>
                    </div>
                    <span
                        class="material-symbols-outlined ml-auto text-[18px] text-slate-300 group-hover:text-blue-500">arrow_forward</span>
                </a>

            </div>
        </div>

    </div>
@endsection
