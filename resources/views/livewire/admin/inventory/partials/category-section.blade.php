<div class="flex justify-between items-center mb-4 px-1">
    <h2 class="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">
        Listado de {{ $titulo }} ({{ $datos->total() }})
    </h2>
    <div class="flex items-center gap-3">
        <button wire:click="abrirModalCrear('{{ $tipoPadre }}')"
            class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md font-bold text-sm flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px]">add</span> Nueva
        </button>
    </div>
</div>

<div class="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden mb-8">
    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-slate-50/80 border-b border-slate-200">
                    <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center w-24">N°</th>
                    <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase min-w-[250px] text-center">
                        Nombre</th>
                    @if ($mostrarColumnaVinculo)
                        <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase min-w-[200px] text-center">
                            Vinculado a</th>
                    @endif
                    <th class="px-6 py-5 text-[11px] font-bold text-slate-400 uppercase text-center w-52">Acciones</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @forelse($datos as $index => $item)
                    <tr class="hover:bg-blue-50/40 transition-colors group">

                        {{-- N° --}}
                        <td class="px-6 py-4 text-sm text-slate-400 font-bold text-center border-r border-slate-50/50">
                            {{ $datos->firstItem() + $index }}
                        </td>

                        {{-- Nombre --}}
                        <td class="px-6 py-4 text-center">
                            <span class="text-slate-800 font-bold uppercase text-[13px] tracking-wide">
                                {{ $item->nombre }}
                            </span>
                        </td>

                        {{-- Categoría padre (solo subcategorías) --}}
                        @if ($mostrarColumnaVinculo)
                            <td class="px-6 py-4 text-center">
                                <span
                                    class="px-4 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-black border border-slate-200 uppercase shadow-sm">
                                    {{ $item->nombrePadre }}
                                </span>
                            </td>
                        @endif

                        {{-- Acciones --}}
                        <td class="px-6 py-4">
                            <div
                                class="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                <button wire:click="abrirModalEditar({{ $item->id }})" title="Editar"
                                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                    <span class="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                                <button wire:click="verDetalle({{ $item->id }})" title="Ver Detalle"
                                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                                    <span class="material-symbols-outlined text-[18px]">visibility</span>
                                </button>
                                <button wire:click="eliminar({{ $item->id }})"
                                    wire:confirm="¿Estás seguro de eliminar '{{ $item->nombre }}'? Esta acción no se puede deshacer."
                                    title="Eliminar"
                                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                    <span class="material-symbols-outlined text-[18px]">delete</span>
                                </button>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="{{ $mostrarColumnaVinculo ? '4' : '3' }}" class="px-6 py-12 text-center text-slate-400 italic text-sm">
                            No se encontraron resultados.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

    {{-- Paginación --}}
    @if ($datos->hasPages())
        <div class="p-4 bg-slate-50/50 border-t border-slate-100">
            {{ $datos->links() }}
        </div>
    @endif
</div>
