<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// Importamos los DTOs
use App\DTOs\Inputs\LoginInputDTO;
use App\DTOs\Outputs\UserOutputDTO;

class AuthController extends Controller
{
    /**
     * Maneja el inicio de sesión desde el Frontend (Supabase Auth).
     */
    public function handleSupabaseLogin(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required',
            'email' => 'required|email'
        ]);

        // Si ya está autenticado, simplemente devolver éxito
        if (Auth::check()) {
            return response()->json([
                'success' => true,
                'redirect' => route('admin.dashboard')
            ]);
        }

        $input = new LoginInputDTO(
            id: $validated['id'],
            email: $validated['email']
        );

        $user = User::where('correo_electronico', $input->email)->first();

        if (!$user) {
            return response()->json(['error' => 'Usuario no registrado en Farmacia Cosmos.'], 403);
        }

        if ($user->rol !== 'owner') {
            return response()->json(['error' => 'Acceso denegado. Solo el Owner puede ingresar.'], 403);
        }

        if (!$user->visible) {
            return response()->json(['error' => 'Tu cuenta se encuentra inactiva.'], 403);
        }

        Auth::login($user);
        $request->session()->regenerate();
        $request->session()->save();

        return response()->json([
            'success' => true,
            'redirect' => route('admin.dashboard')
        ]);
    }

    /**
     * Cierra la sesión.
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}
