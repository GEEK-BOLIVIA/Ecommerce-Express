<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Definimos la tabla exacta en Supabase.
     * Al usar el esquema 'public', Laravel lo encontrará sin problemas.
     */
    protected $table = 'public.usuario';

    /**
     * Como tu tabla usa UUID y no un ID autoincremental numérico,
     * debemos configurar estas tres propiedades.
     */
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * Atributos que se pueden asignar masivamente.
     * Incluimos todos los campos de tu esquema SQL.
     */
    protected $fillable = [
        'id',
        'nombres',
        'apellido_paterno',
        'apellido_materno',
        'correo_electronico',
        'celular',
        'ci',
        'rol',
        'visible',
    ];

    /**
     * Los atributos que deben ocultarse en arrays (JSON).
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * Mapeo de tipos para Eloquent.
     */
    protected $casts = [
        'visible' => 'boolean',
        'id' => 'string',
    ];

    // --- MÉTODOS DE COMPATIBILIDAD CON LARAVEL AUTH ---

    /**
     * Laravel busca por defecto la columna 'email'.
     * Con esto le decimos que use 'correo_electronico'.
     */
    public function getEmailAttribute()
    {
        return $this->correo_electronico;
    }

    /**
     * Requerido si alguna vez usas notificaciones de email o
     * recuperación de contraseña en Laravel.
     */
    public function getEmailForVerification()
    {
        return $this->correo_electronico;
    }

    /**
     * Como no usas contraseñas en el backend (solo OAuth de Supabase),
     * devolvemos null para que Laravel no intente validar un hash inexistente.
     */
    public function getAuthPassword()
    {
        return null;
    }

    /**
     * Helper para verificar rápidamente si es el dueño en el código.
     */
    public function isOwner(): bool
    {
        return $this->rol === 'owner';
    }
}
