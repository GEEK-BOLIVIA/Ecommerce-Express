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

        if (Auth::user()->rol !== 'owner') {
            return $this->handleUnauthorized($request, 'Acceso denegado. Solo el Owner puede ingresar.');
        }

        if (!Auth::user()->visible) {
            return $this->handleUnauthorized($request, 'Tu cuenta se encuentra inactiva.');
        }

        return $next($request);
    }

    private function handleUnauthorized(Request $request, string $message = 'Debes iniciar sesión.')
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json(['error' => $message], 403);
        }
        return redirect()->route('login')->with('error', $message);
    }
}
