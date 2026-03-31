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
        // 1. Validar datos de entrada (Lo mantenemos aquí o en un FormRequest)
        $validated = $request->validate([
            'id' => 'required',
            'email' => 'required|email'
        ]);

        // 2. Transformar el Request en un DTO de Entrada
        $input = new LoginInputDTO(
            id: $validated['id'],
            email: $validated['email']
        );

        // 3. Buscar al usuario usando los datos del DTO
        $user = User::where('correo_electronico', $input->email)->first();

        // 4. Validaciones de seguridad (Lógica de Negocio)
        if (!$user) {
            return response()->json(['error' => 'Usuario no registrado en Farmacia Cosmos.'], 403);
        }

        if ($user->rol !== 'owner') {
            return response()->json(['error' => 'Acceso denegado. Solo el Owner puede ingresar.'], 403);
        }

        if (!$user->visible) {
            return response()->json(['error' => 'Tu cuenta se encuentra inactiva.'], 403);
        }

        // 5. ÉXITO: Iniciar sesión en Laravel
        Auth::login($user);
        $request->session()->regenerate();

        // Opcional: Podrías devolver los datos del usuario formateados con el OutputDTO
        // $userDto = UserOutputDTO::fromModel($user);

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
