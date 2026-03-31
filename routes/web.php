<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Livewire\Admin\Inventory\CategoryTable;

// 1. Redirección inicial
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. Autenticación
Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::post('/api/auth/supabase-verify', [AuthController::class, 'handleSupabaseLogin'])
    ->name('auth.supabase.verify');

// 3. Grupo Administrativo Protegido
// Añadimos 'web' para asegurar que la sesión esté disponible para 'is_owner'
Route::middleware(['web', 'is_owner'])->prefix('admin')->group(function () {

    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    })->name('admin.dashboard');

    // Módulo de Inventario
    Route::prefix('inventario')->group(function () {

        // Tabla de Categorías
        Route::get('/categorias', CategoryTable::class)
            ->name('admin.inventory.categories');

        // Formulario de Creación
        Route::get('/categorias/nueva', function () {
            return "Formulario en construcción para Farmacia Cosmos";
        })->name('admin.inventory.categories.create');

        // Agregamos una ruta vacía para productos para que el sidebar no explote si la habilitas
        Route::get('/productos', function () {
            return "Pronto";
        })->name('admin.inventory.products');
    });

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// 4. Ruta de Bypass (Elimínala una vez que admin/categorias funcione)
Route::get('/test-categorias', CategoryTable::class);
