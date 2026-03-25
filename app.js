require('dotenv').config();
const express = require('express');
const app = express();

// Middlewares primero
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public', { extensions: ['html'] }));

// Rutas después
app.get('/api/config', (req, res) => {
    res.json({
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    });
});

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const sucursalRoutes = require('./src/routes/sucursalRoutes');
const categoriasRoutes = require('./src/routes/categoriasRoutes');
const productoRoutes = require('./src/routes/productoRoutes');
const carruselRoutes = require('./src/routes/carruselRoutes');
const configuracionColumnasRoutes = require('./src/routes/configuracionColumnasRoutes');
const configuracionFrontendRoutes = require('./src/routes/configuracionFrontendRoutes');
const departamentoRoutes = require('./src/routes/departamentoRoutes');
const direccionRoutes = require('./src/routes/direccionRoutes');

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/sucursales', sucursalRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/carruseles', carruselRoutes);
app.use('/api/configuracion-columnas', configuracionColumnasRoutes);
app.use('/api/configuracion-frontend', configuracionFrontendRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/direcciones', direccionRoutes);

module.exports = app;