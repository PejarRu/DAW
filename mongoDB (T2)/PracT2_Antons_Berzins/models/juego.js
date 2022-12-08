/**
 * Fichero models/juego.js: Archivo con el esquema
 * de prototipado para "juego" y "edicion" en mongoose
 */
const mongoose = require('mongoose');

//Esquema Edicion
let schemaEdicion = new mongoose.Schema({
    edicion: {
        type: String,
        required: true,
    },
    anyo: {
        type: Number,
        required: false,
        min: 2000,
        max: new Date().getFullYear()
    }
});

//Esquema Juego
let schemaJuego = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minLength: 6
    },
    descripcion: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true,
        // Rango de 1 a 99 (ambos incluidos)
        min: 1,
        max: 99
    },
    jugadores: {
        type: Number,
        required: true
    },
    tipo: {
        type: String,
        required: false,
        enum: ['rol', 'escape', 'dados', 'fichas', 'cartas', 'tablero']
    },
    precio: {
        type: Number,
        required: true,
        min: 1
    },
    imagen: {
        type: String,
        required: false
    },
    Ediciones: [schemaEdicion]
});
//Asociacion esquema Juego
let Juego = mongoose.model('juego', schemaJuego);

module.exports = Juego;
