/*
Ejercicio de práctica con las diferentes opciones que ofrece Mongoose
para gestionar documentos y colecciones en MongoDB
*/

// Ejercicio 1: instalar Mongoose, cargarlo en la aplicación, 
// conectar con la base de datos y 
// definir el esquema y modelo de la colección de libros

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/libros', { useNewUrlParser: true });

let libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
        trim: true          // Esto no se pedía en el enunciado
    },
    editorial: {
        type: String
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    }
});

let Libro = mongoose.model('libro', libroSchema);

// Ejercicio 2: insertar un par de libros válidos

let libro1 = new Libro({
    titulo: "El capitán Alatriste",
    editorial: "Alfaguara",
    precio: 15
});
libro1.save().then(resultado => {
    console.log("Libro añadido:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

let libro2 = new Libro({
    titulo: "El juego de Ender",
    editorial: "Ediciones B",
    precio: 8.95
});
libro2.save().then(resultado => {
    console.log("Libro añadido:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

// Ejercicio 3: búsquedas de libros
// Buscar libros entre 10 y 20 euros
// Buscar libro por ID (cambiar el id por uno válido para probar)

Libro.find({precio: {$gte: 10, $lte: 20}}).then(resultado => {
    console.log("Resultado de la búsqueda por precios:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

Libro.findById("5ab3953b5a5d4643e9d4cdde").then(resultado => {
    console.log("Resultado de la búsqueda por id:", resultado);
}).catch(error => {
    console.log("ERROR:", error);
});

// Ejercicio 4: Borrado y modificación de libros
// Se debe mostrar por consola el libro borrado/modificado

Libro.findByIdAndRemove("5ab3ff4f42f2304466e4a2cd").then(resultado => {
    console.log("Libro eliminado:", resultado);
}).catch(error => {
    console.log("ERROR eliminando libro:", error)
});

Libro.findByIdAndUpdate("5ab3953b5a5d4643e9d4cdde", 
{$set: {precio: 50}, $inc: {__v: 1}}, {new:true}).then(resultado => {
    console.log("Libro actualizado correctamente:", resultado);
}).catch(error => {
    console.log("ERROR actualizando libro:", error);
});
