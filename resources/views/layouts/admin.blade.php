<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Admin - Farmacia Cosmos')</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
    @stack('styles')
</head>

<body class="bg-slate-50 text-slate-800 font-display antialiased overflow-hidden selection:bg-blue-100">
    <div class="flex h-screen w-full">
        @include('partials.admin.sidebar')

        <main id="main-content" class="flex-1 flex flex-col overflow-hidden h-full">
            <div id="content-area" class="flex-1 overflow-y-auto w-full h-full bg-white/50 backdrop-blur-sm">
                {{-- Livewire inyecta aquí el componente --}}
                {{ $slot ?? '' }}

                {{-- Soporte para vistas Blade tradicionales --}}
                @yield('content')
            </div>
        </main>
    </div>

    @livewireScripts
    @vite(['resources/js/admin-dashboard.js'])
    @stack('scripts')

    <script>
        document.addEventListener('livewire:navigated', () => {
            // Esto asegura que si tu sidebar tiene lógica JS, se reinicie tras navegar
            console.log('Navegación SPA de Farmacia Cosmos lista.');
        });
    </script>
</body>

</html>
