<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Livewire\Admin\Inventory\CategoryTable;

// 1. Redirección inicial
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. Autenticación (Pública)
Route::get('/login', function () {
    if (auth()->check()) {
        return redirect()->route('admin.dashboard');
    }
    return view('auth.login');
})->name('login');

Route::post('/api/auth/supabase-verify', [AuthController::class, 'handleSupabaseLogin'])
    ->name('auth.supabase.verify');

// 3. Grupo Administrativo Protegido
Route::middleware(['web', 'is_owner'])->prefix('panel')->group(function () {

    Route::get('/dashboard', function () {
        return view('admin.dashboard');  // ← ya apunta al archivo nuevo
    })->name('admin.dashboard');

    Route::prefix('inventario')->group(function () {

        Route::get('/categorias', CategoryTable::class)
            ->name('admin.inventory.categories');

        Route::get('/categorias/nueva', function () {
            return "Formulario de Nueva Categoría - En desarrollo";
        })->name('admin.inventory.categories.create');

        Route::get('/productos', function () {
            return "Módulo de Productos - Pronto";
        })->name('admin.inventory.products');
    });

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// 4. Ruta de Bypass para debug
Route::get('/test-categorias', CategoryTable::class)->middleware(['web']);
