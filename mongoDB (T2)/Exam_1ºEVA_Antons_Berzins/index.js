/**
 * Fichero index.js: Archivo principal con require
 * de librerias y modulos principales, conexion con el 
 * servidor y puesta en marcha en puerto especifico
 */
console.clear();
// Modulos de apoyo
const bodyParser = require('body-parser');
// Librerias y modulos de parte servidor
const express = require('express');
const mongoose = require('mongoose');

const restaurantes = require(__dirname + '/routes/restaurantes.js');

// Conexion con el servidor mongoose
mongoose.connect('mongodb://0.0.0.0:27017/restaurantes', { useNewUrlParser: true });

// Servidor Express
let app = express();

// Carga de middleware y enrutadores 
app.use(express.json());
//Permite otros tipos de peticiones (JSON & QueryString)
app.use('/restaurantes', restaurantes);

// Puesta en marcha del servidor
app.listen(8080);
