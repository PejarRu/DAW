const mongoose = require('mongoose');
let Juegos = require(__dirname + '/../models/juego.js');

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
        required: false,
        // Rango de 1a 99 (ambos incluidos)
        min: 1,
        max: 99
    },
    jugadores: {
        type: Number,
        required: false
    },
    tipo: {
        type: String,
        required: false,
        enum: ['rol','escape','dados','fichas','cartas','tablero']
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
    //Ediciones: schemaEdicion,
    Ediciones: {
        required: false,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'edicion'
    }
    
});
//Asociacion esquema Juego
let Juego = mongoose.model('juego', schemaJuego);

module.exports = Juego;
