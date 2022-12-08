/*
Pruebas con la librería Mongoose para acceder a una base de datos MongoDB
*/
const mongoose = require('mongoose');

// Definición del esquema de nuestra colección
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
    }
});

// Asociación con el modelo (colección contactos)
let Contacto = mongoose.model('contacto', contactoSchema);

// Conexión con la BD
mongoose.connect('mongodb://localhost:27017/contactos');

// Inserción 1 (correcta)
let contacto1 = new Contacto({
    nombre: "Nacho",
    telefono: "966112233",
    edad: 41
});
contacto1.save().then(resultado => {
    console.log('Contacto añadido:', resultado);
}).catch(error => {
    console.log('ERROR añadiendo contacto:', error);
});
/*
// Inserción 1 (incorrecta)
let contacto2 = new Contacto({
 nombre: "Matuzalem",
 telefono: "965123456",
 edad: 200
});
contacto2.save().then(resultado => {
 console.log("Contacto añadido:", resultado);
}).catch(error => {
 console.log("ERROR añadiendo contacto 2:", error);
});
*/
//Busqueda a nacho de 41 años
Contacto.find("Nacho", "41").then(resultado => {
    console.log(resultado);
}).catch (error => {
    console.log("ERROR:", error);
});
//No existe nache de 24 años
Contacto.find("Nacho", "24").then(resultado => {
    console.log(resultado);
}).catch (error => {
    console.log("ERROR nacho de 24 años:", error);
});
   