require('dotenv').config();
const express = require('express');
const app = express();

// Middlewares
app.use(express.json()); // Para recibir JSON en el body
app.use(express.urlencoded({ extended: true })); // Para recibir formularios HTML
app.use(express.static('public')); // Para servir archivos estáticos (CSS, JS, imágenes)

// Rutas (las iremos agregando aquí)
// app.use('/productos', productosRouter);

module.exports = app;