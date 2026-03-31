<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carrusel extends Model
{
    // 1. Nombre exacto de la tabla en Supabase
    protected $table = 'carruseles';

    // 2. Definimos que no use los nombres por defecto de Laravel para fechas
    const CREATED_AT = 'creado_en';
    const UPDATED_AT = null; // Si no tienes columna de "actualizado_en", lo desactivamos

    // 3. Campos que se pueden llenar (Mass Assignment)
    protected $fillable = [
        'id',
        'nombre',
        'descripcion',
        'tipo',
        'ubicacion_slug',
        'activo',
        'orden_seccion'
    ];
}
