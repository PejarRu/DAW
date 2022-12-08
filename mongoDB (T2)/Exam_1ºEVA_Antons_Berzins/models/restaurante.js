/**
 * Fichero models/restaurante.js: Archivo con el esquema
 * de prototipado para "restaurantes" y "comentario" en mongoose
 */
const mongoose = require('mongoose');

//Esquema Comentario
let schemaComentario = new mongoose.Schema({
    creador: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    comentario: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    fecha: {
        type: Date,
        required: true,
        min: "01-01-2022",
        max: new Date().now
    }
});

//Esquema Restaurante
let schemaRestaurante = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        minLenght: 9,
        /*unique: true,*/
        trim: true,
        match: /^\d{9}$/
    },
    imagen: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    tipo: {
        type: String,
        required: false,
        trim: true,
        enum: ['italiano', 'vegano', 'comida rapida', 'vegetariano', 'otro']
    },
    puntuacion: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    Comentarios: [schemaComentario]
    
});

//Asociacion esquema Restaurante
let Restaurante = mongoose.model('restaurante', schemaRestaurante);

module.exports = Restaurante;
