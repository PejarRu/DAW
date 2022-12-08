/*
Pruebas con la librería Mongoose para acceder a una base de datos MongoDB
*/
console.log("0")

const mongoose = require('mongoose');
console.log("a")
// Conexión con la BD
mongoose.connect('mongodb://localhost:27017/contactos',{useNewUrlParser: true}).then(()=>{
    console.log(`successfully connected`);
    }).catch((e)=>{
    console.log(`not connected`);
    });
    console.log("b")

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
console.log("c")
// Asociación con el modelo (colección contactos)
let Contacto = mongoose.model('contacto', contactoSchema);
console.log("cd")
// Inserción 1 (correcta)
let contacto1 = new Contacto({
    nombre: "Nacho",
    telefono: "966112233",
    edad: 41
});
console.log("e")

contacto1.save().then(resultado => {
    console.log('Contacto añadido:', resultado);
}).catch(error => {
    console.log('ERROR añadiendo contacto:', error);
});
console.log("f")

// Inserción 2 (incorrecta por la edad)
let contacto2 = new Contacto({
    nombre: "Matuzalem",
    telefono: "965123456",
    edad: 120
});
contacto2.save().then(resultado => {
    console.log('Contacto añadido:', resultado);
}).catch(error => {
    console.log('ERROR añadiendo contacto:', error);
});
console.log("01")
// Búsquedas parametrizadas: buscar por nombre y rango de edades
Contacto.findOne({nombre:'Nacho', edad: { $gte: 18, $lte: 40}}).then(resultado => {
    console.log("Resultado de la búsqueda:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});
console.log("02")
// Búsqueda por id (cambiar el id por uno válido para probarlo)
Contacto.findById('5d5916c4f620630dc395f92e').then(resultado => {
    console.log("Resultado de la búsqueda por ID:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});
console.log("03")
// Borrado por id (cambiar el id por uno válido para probarlo)
Contacto.findByIdAndRemove("5d5916c4f620630dc395f92e").then(resultado => {
    console.log("Eliminado contacto:", resultado);
}).catch(error => {
    console.log("ERROR:", error); 
});
console.log("04")
// Modificar contacto por ID (cambiar id por uno válido para probarlo)
Contacto.findByIdAndUpdate('5d5916c4f620630dc395f92e',
{$set: {nombre:'Nacho Iborra', edad: 40}}, {new:true}).then(resultado => {
    console.log("Modificado contacto:", resultado);
}).catch (error => {
    console.log("ERROR:", error);
});
console.log("05")
// Modificar contacto y versión por ID (cambiar id por uno válido para probarlo)
Contacto.findByIdAndUpdate('5d5916c4f620630dc395f92e',
{$set: {nombre:'Nacho Iborra Baeza', edad: 35}, $inc: {__v: 1}}, {new:true}).then(resultado => {
    console.log("Modificado contacto y versión:", resultado);
}).catch (error => {
    console.log("ERROR:", error);
});
console.log("06")