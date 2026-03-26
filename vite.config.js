import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        tailwindcss(),
        // ✅ Plugin personalizado para ocultar .html
        {
            name: 'html-rewrite',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    const cleanRoutes = [
                        '/administracion',
                        '/registrar-usuario',
                    ];
                    if (cleanRoutes.includes(req.url)) {
                        req.url = req.url + '.html';
                    }
                    next();
                });
            }
        }
    ],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'index.html'),
                administracion: resolve(__dirname, 'administracion.html')
            }
        }
    },
    server: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    appType: 'mpa'
});