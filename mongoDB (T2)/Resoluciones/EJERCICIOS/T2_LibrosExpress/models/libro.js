const mongoose = require('mongoose');
//Esquema Libros
let schemaLibros = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
    },
    editorial: {
        type: String,
        required: true
    },
    precio: {
        required: true,
        type: Number,
        min: 0,
    },
    autor: {
        //id: id;
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autor'
    }
});
//Asociacion esquema Libros
let Libro = mongoose.model('libro', schemaLibros);

module.exports = Libro;