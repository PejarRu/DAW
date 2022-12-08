/*
Pruebas con la librería Mongoose para acceder a una base de datos MongoDB
*/

const mongoose = require('mongoose');

/*
//#####################################################
// - DEFINICION DE ESQUEMAS Y ASOCIACIACIONES:  START - 
//#####################################################
*/
// Definición del esquema de nuestra colección restaurante
let restauranteSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
    },
    direccion: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
    },
    telefono: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^\d{9}$/
    }
   });
// Asociación con el modelo (colección restaurantes)
let Restaurante = mongoose.model('restaurante', restauranteSchema);
   
// Definición del esquema de nuestra colección mascota
let mascotaSchema = new mongoose.Schema({
    nombre: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
    },
    tipo: {
    type: String,
    required: true,
    enum: ['perro', 'gato', 'otros']
    }
   });
// Asociación con el modelo (colección mascotas)
let Mascota = mongoose.model('mascota', mascotaSchema);

// Definición del esquema de nuestra colección contactos
let contactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^\d{9}$/
    },
    edad: {
        type: Number,
        min: 18,
        max: 120
    },
    restauranteFavorito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurante'
    },
    mascota: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mascota'
    }]
});
// Asociación con el modelo (colección contactos)
let Contacto = mongoose.model('contacto', contactoSchema);
/*
//###################################################
// - DEFINICION DE ESQUEMAS Y ASOCIACIACIONES: END - 
//###################################################
*/
// Conexión con la BD
mongoose.connect('mongodb://localhost:27017/contactos_subdocumentos');
/*
//##########################################
// - CREACION Y INSERCCION DE DATOS: START - 
//##########################################
*/
// Inserción restaurante
let restaurante1 = new Restaurante({
    nombre: "La Tagliatella",
    direccion: "C.C. San Vicente s/n",
    telefono: "965678912"
});
restaurante1.save().then(resultado => {
    console.log('Contacto añadido:', resultado);
}).catch(error => {
    console.log('ERROR añadiendo contacto:', error);
});

// Inserción mascota
let mascota1 = new Mascota({
    nombre: "Otto",
    tipo: "perro"
});
mascota1.save().then(resultado => {
    console.log('Contacto añadido:', resultado);
}).catch(error => {
    console.log('ERROR añadiendo contacto:', error);
});
// Inserción contacto
let contacto1 = new Contacto({
    nombre: "Nacho",
    telefono: 677889900,
    edad: 40,
    restauranteFavorito: '5acd3c051d694d04fa26dd8b',
    mascotas: ['5acd3c051d694d04fa26dd90', 
    '5acd3c051d694d04fa26dd91']
   });
   
contacto1.save().then(resultado => {
    console.log('Contacto añadido:', resultado);
}).catch(error => {
    console.log('ERROR añadiendo contacto:', error);
});
/*
//#############################
// - INSERCCION DE DATOS: END - 
//#############################
*/
/*
//#############################
// - BUSQUEDA DE DATOS: START - 
//#############################
*/
//Busqueda de Contacto
Contacto.find().then(resultado => {
    console.log(resultado);
}).catch (error => {
    console.log("ERROR:", error);
});
/*
//###########################
// - BUSQUEDA DE DATOS: END - 
//###########################
*/