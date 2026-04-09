<div class="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
    <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h2 class="text-sm font-black text-slate-800 uppercase tracking-widest">{{ $titulo }}</h2>
        <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">add</span> NUEVO
        </button>
    </div>

    <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="bg-slate-50/50">
                    <th
                        class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        Nombre</th>
                    @if ($mostrarVinculo)
                        <th
                            class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                            Categoría Padre</th>
                    @endif
                    <th
                        class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        Estado</th>
                    <th
                        class="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">
                        Acciones</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
                @foreach ($datos as $item)
                    <tr class="hover:bg-blue-50/30 transition-colors group">
                        <td class="px-8 py-4">
                            <span class="text-sm font-bold text-slate-700 uppercase">{{ $item->nombre }}</span>
                        </td>
                        @if ($mostrarVinculo)
                            <td class="px-8 py-4">
                                <span class="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase">
                                    {{ $item->parent->nombre ?? '—' }}
                                </span>
                            </td>
                        @endif
                        <td class="px-8 py-4">
                            <div class="flex items-center gap-2">
                                <span
                                    class="w-2 h-2 rounded-full {{ $item->visible ? 'bg-emerald-500' : 'bg-slate-300' }}"></span>
                                <span
                                    class="text-xs font-bold {{ $item->visible ? 'text-emerald-600' : 'text-slate-400' }} uppercase">
                                    {{ $item->visible ? 'Visible' : 'Oculto' }}
                                </span>
                            </div>
                        </td>
                        <td class="px-8 py-4 text-right">
                            <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button class="p-2 text-slate-400 hover:text-blue-600 transition-colors"><span
                                        class="material-symbols-outlined text-lg">edit</span></button>
                                <button class="p-2 text-slate-400 hover:text-red-600 transition-colors"><span
                                        class="material-symbols-outlined text-lg">delete</span></button>
                            </div>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
