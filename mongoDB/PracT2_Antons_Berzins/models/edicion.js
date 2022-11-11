const mongoose = require('mongoose');
//Esquema Edicion
let schemaEdicion = new mongoose.Schema({
    edicion: {
        type: String,
        required: true,
    },
    anyo: {
        required: false,
        type: Number,
        min: 2000,
        max: new Date().getFullYear()
    }
    
});
//Asociacion esquema Edicion
let Edicion = mongoose.model('edicion', schemaEdicion);

module.exports = Edicion;