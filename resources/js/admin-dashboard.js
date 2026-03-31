// resources/js/admin-dashboard.js
import './bootstrap';
import { sidebarController } from './modules/sidebarController';
// Importamos tus controladores (debes moverlos a resources/js/controllers/)
import { productoController } from './controllers/productoController';
import { categoriasController } from './controllers/categoriasController';

// Hacerlos disponibles globalmente si tus botones de Blade los llaman por onclick
window.sidebarController = sidebarController;
window.productoController = productoController;
window.categoriasController = categoriasController;

document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 Admin Dashboard Initialized");

    // Inicialización de componentes como Select2 si los usas
    if ($('.select2').length) {
        $('.select2').select2();
    }
});
