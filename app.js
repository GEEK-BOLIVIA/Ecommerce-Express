const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public', { extensions: ['html'] }));

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const sucursalRoutes = require('./src/routes/sucursalRoutes');
const categoriasRoutes = require('./src/routes/categoriasRoutes');
const productoRoutes = require('./src/routes/productoRoutes');
const carruselRoutes = require('./src/routes/carruselRoutes');
const configuracionColumnasRoutes = require('./src/routes/configuracionColumnasRoutes');
const configuracionFrontendRoutes = require('./src/routes/configuracionFrontendRoutes');
const departamentoRoutes = require('./src/routes/departamentoRoutes');
const direccionRoutes = require('./src/routes/direccionRoutes');
const importacionRoutes = require('./src/routes/importacionRoutes');
const paletaColorRoutes = require('./src/routes/paletaColorRoutes');
const storageRoutes = require('./src/routes/storageRoutes');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/carruseles', carruselRoutes);
app.use('/api/configuracion-columnas', configuracionColumnasRoutes);
app.use('/api/configuracion-frontend', configuracionFrontendRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/direcciones', direccionRoutes);
app.use('/api/importacion', importacionRoutes);
app.use('/api/paletas', paletaColorRoutes);
app.use('/api/storage', storageRoutes);

// Error handler global — debe ir al final siempre
app.use((err, req, res, next) => {
    console.error(`[Error] ${req.method} ${req.path}:`, err.message);
    res.status(err.status || 500).json({
        exito: false,
        mensaje: err.message || 'Error interno del servidor'
    });
});

module.exports = app;