<div x-data="{ show: false, mensaje: '', tipo: 'exito' }"
    x-on:notify.window="mensaje = $event.detail.mensaje; tipo = $event.detail.tipo; show = true; setTimeout(() => show = false, 3000)"
    x-show="show" x-transition:enter="transition ease-out duration-300"
    x-transition:enter-start="opacity-0 transform translate-x-8"
    x-transition:enter-end="opacity-100 transform translate-x-0" x-transition:leave="transition ease-in duration-200"
    x-transition:leave-start="opacity-100 transform translate-x-0"
    x-transition:leave-end="opacity-0 transform translate-x-8"
    class="fixed top-6 right-6 z-[60] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border text-sm font-bold min-w-[300px]"
    :class="tipo === 'exito' ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-red-500 border-red-400 text-white'"
    style="display:none">

    <span class="material-symbols-outlined" x-text="tipo === 'exito' ? 'check_circle' : 'error'"></span>
    <span x-text="mensaje"></span>
</div>
