@if ($showModal)
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8" x-trap.noscroll="true">
            <h2 class="text-sm font-black text-slate-800 uppercase tracking-wide mb-6">
                {{ $editingId ? 'Editar Registro' : ($pestanaActiva === 'categorias' ? 'Nueva Categoría' : 'Nueva Subcategoría') }}
            </h2>

            <div class="space-y-5">
                <div class="flex flex-col gap-2">
                    <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Nombre</label>
                    <input type="text" wire:model="nombre"
                        class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-2xl p-4 font-semibold uppercase focus:ring-2 focus:ring-blue-500/20 outline-none"
                        placeholder="EJ: ANALGÉSICOS">
                    @error('nombre')
                        <span class="text-red-500 text-xs font-bold">{{ $message }}</span>
                    @enderror
                </div>

                @if ($pestanaActiva === 'subcategorias')
                    <div class="flex flex-col gap-2">
                        <label class="text-[11px] font-black text-slate-400 uppercase tracking-widest">Categoría
                            Padre</label>
                        <select wire:model="id_padre"
                            class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-2xl p-4 font-semibold uppercase outline-none">
                            <option value="">-- ELIJA UNA --</option>
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

            <div class="flex gap-3 mt-8">
                <button wire:click="$set('showModal', false)"
                    class="flex-1 px-6 py-3 rounded-xl font-bold text-sm bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all uppercase">Cancelar</button>
                <button wire:click="guardar"
                    class="flex-1 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all uppercase shadow-md">Guardar</button>
            </div>
        </div>
    </div>
@endif
