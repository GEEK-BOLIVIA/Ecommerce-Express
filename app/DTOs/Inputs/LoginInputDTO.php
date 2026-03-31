<?php

namespace App\DTOs\Inputs;

class LoginInputDTO
{
    public string $id;
    public string $email;

    public function __construct(string $id, string $email)
    {
        $this->id = $id;
        $this->email = $email;
    }

    public static function fromSupabase(object $supabaseUser): self
    {
        return new self(
            id: $supabaseUser->id,
            email: $supabaseUser->email
        );
    }
}
