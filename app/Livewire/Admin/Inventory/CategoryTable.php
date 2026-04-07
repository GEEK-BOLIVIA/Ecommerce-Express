<?php

namespace App\Livewire\Admin\Inventory;

use Livewire\Component;
use Livewire\WithPagination;
use App\Services\CategoryService;
use App\DTOs\Inputs\CategoryInputDTO;

class CategoryTable extends Component
{
    use WithPagination;

    // --- Estado de la UI ---
    public string $pestanaActiva  = 'categorias';
    public string $busqueda       = '';
    public string $orden          = 'asc';
    public int    $filasPorPagina = 10;

    // --- Estado del Modal ---
    public bool    $showModal  = false;
    public bool    $showDetalle = false;
    public ?int    $editingId  = null;
    public ?array  $detalleActual = null;

    // --- Campos del formulario ---
    public string $nombre   = '';
    public ?int   $id_padre = null;

    // Resetear página al buscar o cambiar tab
    public function updatingBusqueda(): void
    {
        $this->resetPage('pageP');
        $this->resetPage('pageH');
    }

    public function cambiarTab(string $tab): void
    {
        $this->pestanaActiva = $tab;
        $this->resetPage('pageP');
        $this->resetPage('pageH');
    }

    public function toggleOrden(): void
    {
        $this->orden = $this->orden === 'asc' ? 'desc' : 'asc';
    }

    // --- CRUD ---

    public function abrirModalCrear(string $tipo = 'padre'): void
    {
        $this->resetForm();
        $this->pestanaActiva = $tipo === 'padre' ? 'categorias' : 'subcategorias';
        $this->showModal = true;
    }

    public function abrirModalEditar(int $id, CategoryService $service): void
    {
        $category = $service->findById($id);
        if (!$category) return;

        $this->editingId  = $id;
        $this->nombre     = $category->nombre;
        $this->id_padre   = $category->nombrePadre !== '—' ? $id : null;
        $this->pestanaActiva = $category->nombrePadre !== '—' ? 'subcategorias' : 'categorias';
        $this->showModal  = true;
    }

    public function verDetalle(int $id, CategoryService $service): void
    {
        $category = $service->findById($id);
        if (!$category) return;
        $this->detalleActual = (array) $category;
        $this->showDetalle = true;
    }

    public function guardar(CategoryService $service): void
    {
        $this->validate([
            'nombre'   => 'required|string|min:2|max:100',
            'id_padre' => $this->pestanaActiva === 'subcategorias' ? 'required|integer' : 'nullable',
        ], [
            'nombre.required'   => 'El nombre es obligatorio.',
            'nombre.min'        => 'Mínimo 2 caracteres.',
            'id_padre.required' => 'Debe seleccionar una categoría padre.',
        ]);

        $dto = CategoryInputDTO::fromLivewire([
            'nombre'   => $this->nombre,
            'visible'  => true,
            'id_padre' => $this->id_padre,
        ]);

        if ($this->editingId) {
            $service->update($this->editingId, $dto);
            $this->dispatch('notify', tipo: 'exito', mensaje: 'Categoría actualizada correctamente.');
        } else {
            $service->store($dto);
            $this->dispatch('notify', tipo: 'exito', mensaje: 'Categoría creada con éxito.');
        }

        $this->resetForm();
        $this->showModal = false;
    }

    public function eliminar(int $id, CategoryService $service): void
    {
        $service->delete($id);
        $this->dispatch('notify', tipo: 'exito', mensaje: 'Registro eliminado correctamente.');
    }

    private function resetForm(): void
    {
        $this->editingId  = null;
        $this->nombre     = '';
        $this->id_padre   = null;
        $this->resetValidation();
    }

    public function render(CategoryService $service)
    {
        $padres = $service->getPaginatedFiltered(
            perPage: $this->filasPorPagina,
            busqueda: $this->busqueda,
            orden: $this->orden,
            soloPadres: true,
            paginaName: 'pageP'
        );

        $hijos = $service->getPaginatedFiltered(
            perPage: $this->filasPorPagina,
            busqueda: $this->busqueda,
            orden: $this->orden,
            soloPadres: false,
            paginaName: 'pageH'
        );

        $categoriasPadre = $service->getAllParents();

        return view('livewire.admin.inventory.category-table', [
            'padres'         => $padres,
            'hijos'          => $hijos,
            'categoriasPadre' => $categoriasPadre,
        ]);
    }
}
