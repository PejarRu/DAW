/**
 * Fichero index.js: Archivo principal con todos los 
 * servicios de POST, PUT, GET, DELETE
 */

//Librerias y modulos
const express = require('express');
const mongoose = require('mongoose');

const juegos = require(__dirname + '/routes/juegos');

mongoose.connect('mongodb://0.0.0.0:27017/juegos', { useNewUrlParser: true });

// Servidor Express
let app = express();

// Carga de middleware y enrutadores 
app.use(express.json());
app.use('/juegos', juegos);

// Puesta en marcha del servidor
app.listen(8080);
