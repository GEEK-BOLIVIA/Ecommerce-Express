<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    protected $table = 'categoria'; // Nombre exacto de tu tabla
    protected $fillable = ['nombre', 'visible', 'id_padre'];
    public $timestamps = false; // Tu SQL no tiene campos de fecha

    // Relación con la categoría padre
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'id_padre');
    }

    // Relación con las subcategorías (hijos)
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'id_padre');
    }
}
