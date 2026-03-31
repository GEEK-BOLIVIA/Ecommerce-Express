import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite'; // <--- Plugin de v4

export default defineConfig({
    plugins: [
        tailwindcss(), // <--- Agregamos el plugin aquí
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js', 'resources/js/admin-dashboard.js'],
            refresh: true,
        }),
    ],
    server: {
        // Forzamos el uso de IPv4 (127.0.0.1) para evitar el error 'undefined' del WebSocket
        host: '127.0.0.1',
        port: 5173,
        strictPort: true,
        hmr: {
            host: '127.0.0.1',
        },
    },
});
