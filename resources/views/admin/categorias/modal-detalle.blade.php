@if ($showDetalle && $detalleActual)
    <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8" x-trap.noscroll="true">
            <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <span class="material-symbols-outlined">info</span>
                </div>
                <h2 class="text-sm font-black text-slate-800 uppercase tracking-wide">Detalle del Registro</h2>
            </div>

            <div class="space-y-4">
                {{-- Nombre --}}
                <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Nombre Completo</p>
                    <p class="text-slate-800 font-bold text-lg uppercase">{{ $detalleActual['nombre'] }}</p>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    {{-- Tipo --}}
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tipo</p>
                        <p class="text-slate-700 font-bold text-sm">
                            {{ $detalleActual['nombrePadre'] !== '—' ? 'Subcategoría' : 'Categoría' }}
                        </p>
                    </div>
                    {{-- Estado --}}
                    <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estado</p>
                        <div class="flex items-center gap-2">
                            <span
                                class="w-2 h-2 rounded-full {{ $detalleActual['esVisible'] ? 'bg-emerald-500' : 'bg-slate-300' }}"></span>
                            <p
                                class="font-bold text-sm {{ $detalleActual['esVisible'] ? 'text-emerald-600' : 'text-slate-400' }}">
                                {{ $detalleActual['estadoLabel'] }}
                            </p>
                        </div>
                    </div>
                </div>

                {{-- Si es subcategoría, mostrar a quién pertenece --}}
                @if ($detalleActual['nombrePadre'] !== '—')
                    <div class="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                        <p class="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Pertenece a la
                            categoría</p>
                        <p class="text-blue-700 font-bold uppercase text-sm">{{ $detalleActual['nombrePadre'] }}</p>
                    </div>
                @endif
            </div>

            <div class="flex gap-3 mt-8">
                <button wire:click="$set('showDetalle', false)"
                    class="flex-1 px-6 py-3 rounded-xl font-bold text-sm bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all uppercase">
                    Cerrar
                </button>
                <button wire:click="abrirModalEditar({{ $detalleActual['id'] }}); $set('showDetalle', false)"
                    class="flex-1 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all uppercase shadow-md">
                    Editar
                </button>
            </div>
        </div>
    </div>
@endif
