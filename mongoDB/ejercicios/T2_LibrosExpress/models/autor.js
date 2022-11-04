const mongoose = require('mongoose');
//Esquema Autor
let schemaAutor = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    anyoNacimiento: {
        required: false,
        type: Number,
        min: 0,
        max: 2000
    }
});
//Asociacion esquema Autor
let Autor = mongoose.model('autor', schemaAutor);

module.exports = Autor;