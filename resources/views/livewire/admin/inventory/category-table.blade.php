<div x-data="{ confirmarEliminar: null, idEliminar: null, tabActiva: @entangle('pestanaActiva') }">

    {{-- NOTIFICACIONES --}}
    <div x-data="{ show: false, mensaje: '', tipo: 'exito' }"
        x-on:notify.window="mensaje = $event.detail.mensaje; tipo = $event.detail.tipo; show = true; setTimeout(() => show = false, 3000)"
        x-show="show" x-transition class="fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl shadow-lg text-sm font-bold"
        :class="tipo === 'exito' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'" style="display:none">
        <span x-text="mensaje"></span>
    </div>

    <div class="p-8">

        {{-- ENCABEZADO --}}
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Categorías — Clasificación de Inventario
                </h1>
                <p class="text-slate-500 text-sm mt-1">Organiza y segmenta el catálogo de productos.</p>
            </div>
        </div>

        {{-- TABS + BUSCADOR --}}
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6">

            {{-- Tabs --}}
            <div class="flex gap-2 bg-slate-200/50 p-1 rounded-2xl w-fit border border-slate-200/60">
                <button @click="tabActiva = 'categorias'"
                    :class="tabActiva === 'categorias' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                    class="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300">
                    <span class="material-symbols-outlined text-[20px]">folder</span>
                    Categorías
                </button>
                <button @click="tabActiva = 'subcategorias'"
                    :class="tabActiva === 'subcategorias' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
                    class="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300">
                    <span class="material-symbols-outlined text-[20px]">account_tree</span>
                    Subcategorías
                </button>
            </div>

            {{-- Búsqueda + Orden --}}
            <div class="flex items-center gap-3 w-full md:w-auto">
                <div class="relative flex-1 md:w-64">
                    <span
                        class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                    <input type="text" wire:model.live.debounce.300ms="busqueda" placeholder="Buscar por nombre..."
                        class="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium">
                </div>
                <button wire:click="toggleOrden"
                    class="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-blue-600 transition-all shadow-sm font-bold text-sm">
                    <span class="material-symbols-outlined text-lg">
                        {{ $orden === 'asc' ? 'sort_by_alpha' : 'text_rotate_vertical' }}
                    </span>
                    {{ $orden === 'asc' ? 'A-Z' : 'Z-A' }}
                </button>
            </div>
        </div>

        {{-- SECCIÓN CATEGORÍAS PADRE --}}
        <div x-show="tabActiva === 'categorias'" x-transition:enter="transition ease-out duration-200"
            x-transition:enter-start="opacity-0 transform -translate-y-2"
            x-transition:enter-end="opacity-100 transform translate-y-0"
            x-transition:leave="transition ease-in duration-150"
            x-transition:leave-start="opacity-100 transform translate-y-0"
            x-transition:leave-end="opacity-0 transform -translate-y-2">
            @include('livewire.admin.inventory.partials.category-section', [
                'titulo' => 'Categorías',
                'datos' => $padres,
                'tipoPadre' => 'padre',
                'mostrarColumnaVinculo' => false,
            ])
        </div>

        {{-- SECCIÓN SUBCATEGORÍAS --}}
        <div x-show="tabActiva === 'subcategorias'" x-transition:enter="transition ease-out duration-200"
            x-transition:enter-start="opacity-0 transform -translate-y-2"
            x-transition:enter-end="opacity-100 transform translate-y-0"
            x-transition:leave="transition ease-in duration-150"
            x-transition:leave-start="opacity-100 transform translate-y-0"
            x-transition:leave-end="opacity-0 transform -translate-y-2">
            @include('livewire.admin.inventory.partials.category-section', [
                'titulo' => 'Subcategorías',
                'datos' => $hijos,
                'tipoPadre' => 'hijo',
                'mostrarColumnaVinculo' => true,
            ])
        </div>

    </div>

    {{-- MODAL FORMULARIO --}}
    @if ($showModal)
        <div class="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8" x-trap.noscroll="true">

                <h2 class="text-sm font-black text-slate-800 uppercase tracking-wide mb-6">
                    {{ $editingId ? 'Editar Registro' : ($pestanaActiva === 'categorias' ? 'Nueva Categoría Principal' : 'Nueva Subcategoría') }}
                </h2>

                <div class="space-y-5">
                    {{-- Nombre --}}
                    <div class="flex flex-col gap-2">
                        <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Nombre</label>
                        <input type="text" wire:model="nombre"
                            class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-2xl p-4 font-semibold uppercase focus:ring-2 focus:ring-blue-500/20 outline-none"
                            placeholder="Ej: ANALGÉSICOS" autofocus>
                        @error('nombre')
                            <span class="text-red-500 text-xs font-bold">{{ $message }}</span>
                        @enderror
                    </div>

                    {{-- Selector padre (solo subcategorías) --}}
                    @if ($pestanaActiva === 'subcategorias')
                        <div class="flex flex-col gap-2">
                            <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                Categoría Padre <span class="text-red-400">(Obligatorio)</span>
                            </label>
                            <select wire:model="id_padre"
                                class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-2xl p-4 font-semibold uppercase outline-none cursor-pointer">
                                <option value="">-- ELIJA UNA CATEGORÍA --</option>
                                @foreach ($categoriasPadre as $padre)
                                    <option value="{{ $padre->id }}">{{ $padre->nombre }}</option>
                                @endforeach
                            </select>
                            @error('id_padre')
                                <span class="text-red-500 text-xs font-bold">{{ $message }}</span>
                            @enderror
                        </div>
                    @endif

                </div>

                {{-- Botones --}}
                <div class="flex gap-3 mt-8">
                    <button wire:click="$set('showModal', false)"
                        class="flex-1 px-6 py-3 rounded-xl font-bold text-sm bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all uppercase">
                        Cancelar
                    </button>
                    <button wire:click="guardar"
                        class="flex-1 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all uppercase shadow-md">
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    @endif

    {{-- MODAL DETALLE --}}
    @if ($showDetalle && $detalleActual)
        <div class="fixed inset-0 bg-black/40 z-40 flex items-center justify-center p-4">
            <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
                <h2 class="text-sm font-black text-slate-800 uppercase tracking-wide mb-6">Detalle del Registro</h2>

                <div class="space-y-4">
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nombre</p>
                        <p class="text-slate-800 font-bold text-lg uppercase">{{ $detalleActual['nombre'] }}</p>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tipo</p>
                            <p class="text-slate-700 font-bold text-sm">
                                {{ $detalleActual['nombrePadre'] !== '—' ? 'Subcategoría' : 'Categoría' }}
                            </p>
                        </div>
                        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estado</p>
                            <p
                                class="font-bold text-sm {{ $detalleActual['esVisible'] ? 'text-emerald-600' : 'text-slate-400' }}">
                                {{ $detalleActual['estadoLabel'] }}
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex gap-3 mt-8">
                    <button wire:click="$set('showDetalle', false)"
                        class="flex-1 px-6 py-3 rounded-xl font-bold text-sm bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all uppercase">
                        Cerrar
                    </button>
                    <button wire:click="abrirModalEditar({{ $detalleActual['id'] }}); $set('showDetalle', false)"
                        class="flex-1 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all uppercase shadow-md">
                        Editar Registro
                    </button>
                </div>
            </div>
        </div>
    @endif

</div>
