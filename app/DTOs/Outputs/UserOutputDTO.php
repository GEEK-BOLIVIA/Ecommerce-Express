<?php

namespace App\DTOs\Outputs;

class UserOutputDTO
{
    public function __construct(
        public readonly string $fullName,
        public readonly string $ci,
        public readonly string $phone,
        public readonly string $email,
        public readonly string $role,
        public readonly bool $isOwner,
        public readonly bool $isVisible
    ) {}

    public static function fromModel($user): self
    {
        return new self(
            // Concatenamos nombres y apellidos para la UI
            fullName: "{$user->nombres} {$user->apellido_paterno} {$user->apellido_materno}",
            ci: $user->ci,
            phone: $user->celular,
            email: $user->correo_electronico,
            role: $user->rol, // 'owner', 'cliente', etc.
            isOwner: $user->rol === 'owner',
            isVisible: (bool) $user->visible
        );
    }
}
