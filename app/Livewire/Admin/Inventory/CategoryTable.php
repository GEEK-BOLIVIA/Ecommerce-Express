<?php

namespace App\Livewire\Admin\Inventory;

use Livewire\Component;
use Livewire\WithPagination;
use App\Services\CategoryService;
use Livewire\Attributes\Layout;

class CategoryTable extends Component
{
    use WithPagination;

    #[Layout('layouts.admin')] // <--- Usamos atributos en lugar de ->layout()
    public function render(CategoryService $service)
    {
        return view('livewire.admin.inventory.category-table', [
            'categories' => $service->getPaginated(10)
        ]);
    }
}
