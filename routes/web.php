<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\CategoryController; // Importamos tu nuevo controlador

// 1. Redirección inicial
Route::get('/', function () {
    return redirect()->route('login');
});

// 2. Autenticación (Pública)
Route::get('/login', function () {
    if (Auth::check()) { // Cambiamos auth()->check() por Auth::check()
        return redirect()->route('admin.dashboard');
    }
    return view('auth.login');
})->name('login');

Route::post('/api/auth/supabase-verify', [AuthController::class, 'handleSupabaseLogin'])
    ->name('auth.supabase.verify');

// 3. Grupo Administrativo Protegido
Route::middleware(['web', 'is_owner'])->prefix('panel')->group(function () {

    Route::get('/dashboard', function () {
        return view('admin.dashboard');
    })->name('admin.dashboard');

    // Módulo de Inventario
    Route::prefix('inventario')->group(function () {

        // --- RUTAS DE CATEGORÍAS (Usando tu nuevo controlador) ---
        Route::get('/categorias', [CategoryController::class, 'index'])->name('admin.inventory.categories');
        Route::post('/categorias', [CategoryController::class, 'store'])->name('admin.inventory.categories.store');
        Route::put('/categorias/{id}', [CategoryController::class, 'update'])->name('admin.inventory.categories.update');
        Route::delete('/categorias/lote', [CategoryController::class, 'destroyBatch'])->name('admin.inventory.categories.batch');
        Route::delete('/categorias/{id}', [CategoryController::class, 'destroy'])->name('admin.inventory.categories.destroy');
        Route::get('/categorias/crear', [CategoryController::class, 'create'])->name('admin.inventory.categories.create');
        // --- RUTAS DE PRODUCTOS ---
        Route::get('/productos', function () {
            return "Módulo de Productos - Pronto";
        })->name('admin.inventory.products');
    });

    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

// 4. Ruta de Bypass para debug (Actualizada para probar el controlador)
Route::get('/test-categorias', [CategoryController::class, 'index'])->middleware(['web']);
