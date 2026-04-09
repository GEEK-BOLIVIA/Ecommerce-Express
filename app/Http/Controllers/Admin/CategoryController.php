<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Carga inicial (Equivalente a inicializar() y refrescarVista())
     */
    public function index(Request $request)
    {
        $orden = $request->get('orden', 'asc');
        $busqueda = $request->get('busqueda', '');

        $padres = Category::with('children')
            ->whereNull('id_padre')
            ->orderBy('nombre', $orden)
            ->get();

        $hijos = Category::whereNotNull('id_padre')
            ->orderBy('nombre', $orden)
            ->get();

        // Definimos las variables que los modales están pidiendo
        $showModal = false;
        $showDetalle = false;
        $editingId = null;
        $pestanaActiva = 'categorias';
        $categoriasPadre = $padres; // Para el select del formulario
        $detalleActual = null;

        return view('admin.categorias.index', compact(
            'padres',
            'hijos',
            'orden',
            'busqueda',
            'showModal',
            'showDetalle',
            'editingId',
            'pestanaActiva',
            'categoriasPadre',
            'detalleActual'
        ));
    }

    /**
     * Guardar registro (Equivalente a mostrarFormularioCreacion + crear)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre'   => 'required|string|max:255',
            'id_padre' => 'nullable|exists:categoria,id',
            'visible'  => 'boolean'
        ]);

        try {
            Category::create([
                'nombre'   => $validated['nombre'],
                'id_padre' => $validated['id_padre'],
                // Si no viene 'visible' en el request, por defecto es 1
                'visible'  => $request->has('visible') ? $request->visible : 1,
            ]);

            return redirect()->back()->with('success', 'Registro creado con éxito');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'No se pudo crear el registro');
        }
    }

    /**
     * Actualizar registro (Equivalente a editar + actualizar)
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre'   => 'required|string|max:255',
            'id_padre' => 'nullable|exists:categoria,id'
        ]);

        $category = Category::findOrFail($id);
        $category->update($validated);

        return redirect()->back()->with('success', 'Cambios guardados correctamente');
    }

    /**
     * Eliminar (Equivalente a eliminarRegistro)
     */
    public function destroy($id)
    {
        try {
            $category = Category::findOrFail($id);

            // Verificamos si tiene hijos antes de borrar (Lógica de seguridad)
            if ($category->children()->count() > 0) {
                return redirect()->back()->with('error', 'No puedes eliminar una categoría que tiene subcategorías');
            }

            $category->delete();
            return redirect()->back()->with('success', 'Registro eliminado correctamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al eliminar');
        }
    }

    /**
     * Eliminar en lote (Equivalente a eliminarLote)
     */
    public function destroyBatch(Request $request)
    {
        $ids = $request->input('ids'); // Espera un array de IDs

        if (empty($ids)) {
            return redirect()->back()->with('error', 'No se seleccionaron registros');
        }

        try {
            Category::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Registros eliminados en lote');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error al eliminar el lote');
        }
    }
}
