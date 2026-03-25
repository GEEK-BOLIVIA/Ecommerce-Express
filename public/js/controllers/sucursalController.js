import { sucursalService } from '../services/sucursalService.js';
import { sucursalView } from '../views/sucursalView.js';

export const sucursalController = {
    _datosCache: [],

    async inicializar(silencioso = false) {
        try {
            if (!silencioso) sucursalView.mostrarCargando('Cargando sucursales...');
            const data = await sucursalService.getAll();
            this._datosCache = data;
            sucursalView.render(this._datosCache);
            if (!silencioso) Swal.close();
        } catch (error) {
            console.error('Error:', error);
            sucursalView.notificarError('Error al conectar con la base de datos');
        }
    },

    async mostrarFormularioCrear() {
        const datosForm = await sucursalView.mostrarFormulario({
            titulo: 'Registrar Nueva Sucursal',
            esEdicion: false
        });

        if (datosForm) {
            const confirmacion = await sucursalView.confirmarAccion({
                titulo: '¿Guardar Sucursal?',
                sucursalNombre: datosForm.nombre,
                mensajePersonalizado: '¿Deseas registrar la nueva sucursal?',
                botonConfirmar: 'Sí, registrar'
            });

            if (confirmacion.isConfirmed) {
                try {
                    sucursalView.mostrarCargando('Guardando...');
                    await sucursalService.create(datosForm);
                    await this.inicializar(true);
                    sucursalView.notificarExito('La sucursal ha sido registrada correctamente.');
                } catch (error) {
                    sucursalView.notificarError('No se pudo guardar la sucursal.');
                }
            }
        }
    },

    async editar(id) {
        const sucursal = this._datosCache.find(s => s.id == id);
        if (!sucursal) return;

        const datosEditados = await sucursalView.mostrarFormulario({
            titulo: 'Editar Sucursal',
            datos: sucursal,
            esEdicion: true
        });

        if (datosEditados) {
            const confirmacion = await sucursalView.confirmarAccion({
                titulo: '¿Actualizar Datos?',
                sucursalNombre: sucursal.nombre,
                mensajePersonalizado: '¿Deseas aplicar los cambios a:',
                botonConfirmar: 'Sí, actualizar'
            });

            if (confirmacion.isConfirmed) {
                try {
                    sucursalView.mostrarCargando('Actualizando...');
                    await sucursalService.update(id, datosEditados);
                    await this.inicializar(true);
                    sucursalView.notificarExito('Cambios aplicados con éxito.');
                } catch (error) {
                    sucursalView.notificarError('Error al intentar actualizar.');
                }
            }
        }
    },

    async verDetalle(id) {
        const sucursal = this._datosCache.find(s => s.id == id);
        if (!sucursal) return;
        const editarPresionado = await sucursalView.mostrarDetalle(sucursal);
        if (editarPresionado) {
            const confirmacion = await sucursalView.confirmarAccion({
                titulo: '¿Modificar Sucursal?',
                sucursalNombre: sucursal.nombre,
                mensajePersonalizado: 'Estás por entrar al modo de edición para:',
                botonConfirmar: 'Ir a Editar'
            });
            if (confirmacion.isConfirmed) this.editar(id);
        }
    },

    async confirmarEliminacion(id) {
        const sucursal = this._datosCache.find(s => s.id == id);
        if (!sucursal) return;

        const deseaEliminar = await sucursalView.mostrarConfirmacionEliminar(sucursal);
        if (deseaEliminar) {
            const confirmacionFinal = await sucursalView.confirmarAccion({
                titulo: '¿Eliminar permanentemente?',
                sucursalNombre: sucursal.nombre,
                mensajePersonalizado: '¿Estás seguro? Esta acción borrará la sede y su historial de:',
                botonConfirmar: 'Sí, borrar'
            });

            if (confirmacionFinal.isConfirmed) {
                try {
                    sucursalView.mostrarCargando('Eliminando datos...');
                    await sucursalService.delete(id);
                    await this.inicializar(true);
                    sucursalView.notificarExito('La sucursal ha sido removida exitosamente.');
                } catch (error) {
                    sucursalView.notificarError('Error al intentar eliminar la sucursal.');
                }
            }
        }
    },

    refrescarVista() {
        sucursalView.render(this._datosCache);
    }
};

window.sucursalController = sucursalController;