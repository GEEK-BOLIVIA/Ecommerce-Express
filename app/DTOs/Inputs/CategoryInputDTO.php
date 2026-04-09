<?php

namespace App\DTOs\Inputs;

class CategoryInputDTO
{
    public function __construct(
        public readonly string $nombre,
        public readonly bool $visible,
        public readonly ?int $id_padre = null
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            nombre: trim($data['nombre']),
            visible: (bool) ($data['visible'] ?? true),
            id_padre: !empty($data['id_padre']) ? (int) $data['id_padre'] : null
        );
    }
}
