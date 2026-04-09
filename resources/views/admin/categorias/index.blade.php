@extends('layouts.admin')

@section('content')
    <div x-data="{ tabActiva: 'categorias' }" class="relative">

        {{-- 1. Alertas --}}
        @include('admin.categorias.notification')

        <div class="p-8">
            {{-- 2. Título y Nav --}}
            @include('admin.categorias.navigation')

            <div class="mt-6">
                {{-- 3. Tablas (Categorías y Subcategorías) --}}
                <div x-show="tabActiva === 'categorias'" x-transition>
                    @include('admin.categorias.table', [
                        'titulo' => 'Categorías',
                        'datos' => $padres,
                        'tipoPadre' => 'padre',
                        'mostrarVinculo' => false,
                    ])
                </div>

                <div x-show="tabActiva === 'subcategorias'" x-transition>
                    @include('admin.categorias.table', [
                        'titulo' => 'Subcategorías',
                        'datos' => $hijos,
                        'tipoPadre' => 'hijo',
                        'mostrarVinculo' => true,
                    ])
                </div>
            </div>
        </div>

        {{-- 4. Modales --}}
        @include('admin.categorias.modal-form')
        @include('admin.categorias.modal-detalle')

    </div>
@endsection
