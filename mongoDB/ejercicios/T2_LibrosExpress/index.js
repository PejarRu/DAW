// Librerías externas
const express = require('express');
const mongoose = require('mongoose');

console.log("a")
// Enrutadores
const libros = require(__dirname + '/routes/libros');
const autores = require(__dirname + '/routes/autors');
console.log("b")

// Conexión con la BD
mongoose.connect('mongodb://0.0.0.0:27017/libros', { useNewUrlParser: true });
// Servidor Express
let app = express();
console.log("c")

// Carga de middleware y enrutadores 
app.use(express.json());
app.use('/libros', libros);
app.use('/autors', autores);
console.log("d")

// Puesta en marcha del servidor
app.listen(8081);
console.log("e")
