<?php

namespace App\Services;

use App\Models\Category;
use App\DTOs\Inputs\CategoryInputDTO;
use App\DTOs\Outputs\CategoryOutputDTO;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryService
{
    public function getPaginated(int $perPage = 10): LengthAwarePaginator
    {
        $paginator = Category::with(['parent'])->paginate($perPage);
        $paginator->getCollection()->transform(fn($c) => CategoryOutputDTO::fromModel($c));
        return $paginator;
    }

    public function getPaginatedFiltered(
        int    $perPage,
        string $busqueda,
        string $orden,
        bool   $soloPadres,
        string $paginaName
    ): LengthAwarePaginator {
        $query = Category::with(['parent'])
            ->when($soloPadres,  fn($q) => $q->whereNull('id_padre'))
            ->when(!$soloPadres, fn($q) => $q->whereNotNull('id_padre'))
            ->when($busqueda,    fn($q) => $q->where('nombre', 'like', "%{$busqueda}%"))
            ->orderBy('nombre', $orden);

        $paginator = $query->paginate($perPage, ['*'], $paginaName);
        $paginator->getCollection()->transform(fn($c) => CategoryOutputDTO::fromModel($c));
        return $paginator;
    }

    public function getAllParents(): array
    {
        return Category::whereNull('id_padre')
            ->orderBy('nombre')
            ->get()
            ->map(fn($c) => CategoryOutputDTO::fromModel($c))
            ->toArray();
    }

    public function findById(int $id): ?CategoryOutputDTO
    {
        $category = Category::with('parent')->find($id);
        return $category ? CategoryOutputDTO::fromModel($category) : null;
    }

    public function store(CategoryInputDTO $dto): Category
    {
        return Category::create([
            'nombre'   => $dto->nombre,
            'visible'  => $dto->visible,
            'id_padre' => $dto->id_padre,
        ]);
    }

    public function update(int $id, CategoryInputDTO $dto): void
    {
        Category::findOrFail($id)->update([
            'nombre'   => $dto->nombre,
            'visible'  => $dto->visible,
            'id_padre' => $dto->id_padre,
        ]);
    }

    public function delete(int $id): void
    {
        Category::findOrFail($id)->delete();
    }
}
