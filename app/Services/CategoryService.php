<?php

namespace App\Services;

use App\Models\Category;
use App\DTOs\Inputs\CategoryInputDTO;
use App\DTOs\Outputs\CategoryOutputDTO;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryService
{
    /**
     * Obtiene las categorías paginadas y las transforma en DTOs de salida.
     */
    public function getPaginated(int $perPage = 10): LengthAwarePaginator
    {
        $paginator = Category::with(['parent'])->paginate($perPage);

        // Transformamos la colección interna de Modelos a DTOs
        $paginator->getCollection()->transform(fn($category) => CategoryOutputDTO::fromModel($category));

        return $paginator;
    }

    /**
     * Guarda una nueva categoría usando el DTO de entrada.
     */
    public function store(CategoryInputDTO $dto): Category
    {
        return Category::create([
            'nombre' => $dto->nombre,
            'visible' => $dto->visible,
            'id_padre' => $dto->id_padre,
        ]);
    }
}
