<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckOwnerRole
{
    public function handle(Request $request, Closure $next)
    {
        if (!Auth::check()) {
            return $this->handleUnauthorized($request);
        }

        $user = Auth::user();

        // DEBUG: Verifica en storage/logs/laravel.log si esto sale
        // \Illuminate\Support\Facades\Log::info('User Role Check:', ['role' => $user->rol, 'visible' => $user->visible]);

        if ($user->rol !== 'owner' || !$user->visible) {
            Auth::logout();
            // Cambiamos temporalmente el 403 por una redirección clara para no ver el 404
            return redirect()->route('login')->with('error', 'Permisos insuficientes.');
        }

        return $next($request);
    }
    /**
     * Decide si responder con un JSON o con una Redirección
     */
    private function handleUnauthorized(Request $request, string $message = 'Debes iniciar sesión.')
    {
        // Si la petición espera JSON (como tu app.js), enviamos un error 403
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json(['error' => $message], 403);
        }

        // Si es una navegación normal por el navegador, redireccionamos
        return redirect()->route('login')->with('error', $message);
    }
}
