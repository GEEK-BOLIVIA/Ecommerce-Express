<?php

namespace App\DTOs\Outputs;

use App\Models\Category;

class CategoryOutputDTO
{
    public function __construct(
        public readonly int $id,
        public readonly string $nombre,
        public readonly string $estadoLabel,
        public readonly bool $esVisible,
        public readonly ?string $nombrePadre = '—'
    ) {}

    public static function fromModel(Category $model): self
    {
        return new self(
            id: $model->id,
            nombre: $model->nombre,
            estadoLabel: $model->visible ? 'VISIBLE' : 'OCULTO',
            esVisible: (bool) $model->visible,
            nombrePadre: $model->parent?->nombre ?? '—'
        );
    }
}
