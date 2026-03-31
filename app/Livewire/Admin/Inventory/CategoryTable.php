<?php

namespace App\Livewire\Admin\Inventory;

use Livewire\Component;
use Livewire\WithPagination;
use App\Services\CategoryService;

class CategoryTable extends Component
{
    use WithPagination;

    // Inyectamos el servicio directamente en el método render
    public function render(CategoryService $service)
    {
        return view('livewire.admin.inventory.category-table', [
            'categories' => $service->getPaginated(10)
        ])->layout('layouts.admin'); // Verifica que el archivo sea resources/views/layouts/admin.blade.php
    }
}
