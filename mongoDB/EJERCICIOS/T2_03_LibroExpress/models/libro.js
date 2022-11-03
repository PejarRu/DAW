const mongoose = require('mongoose');

// Esquema de libros
let libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    editorial: {
        type: String
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    autor: {
        type: String,
        required: true,
        minlength: 3
    },
    /*
    // Vinculación de libro con autor
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autor'
    },
    */
    // Vinculación de libro con comentarios (subdocumento)
    //comentarios: [comentarioSchema]
});

let Libro = mongoose.model('libro', libroSchema);

module.exports.Libro;