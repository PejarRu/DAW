/*
Ejercicio de práctica con las diferentes opciones que ofrece Mongoose
para gestionar documentos y colecciones en MongoDB. En este caso añadimos relaciones
entre distintas colecciones, y uso de subdocumentos, además de búsquedas avanzadas.
Nos basamos para ello en el ejercicio de la sesión anterior.
*/

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/libros', {useNewUrlParser: true});

// Ejercicio 1: definir el esquema para los autores de los libros, y vincularlos al
// esquema para los libros hecho en sesiones anteriores

let autorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    anyoNacimiento: {
        type: Number,
        min: 0,
        max: 2000
    }
});

let Autor = mongoose.model('autor', autorSchema);

// Ejercicio 2: definir un esquema para almacenar los comentarios sobre un libro
// Se añadirá como subdocumento a la colección de libros

let comentarioSchema = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true,
        default: new Date()
    },
    nick: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    texto: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

// Esquema de libros, modificado con los ejercicios de esta sesión

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
    },
    // Vinculación de libro con autor
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autor'
    },
    // Vinculación de libro con comentarios (subdocumento)
    comentarios: [comentarioSchema]
});

let Libro = mongoose.model('libro', libroSchema);

// Ejercicio 1: insertar algún autor con libros asociados
/*
let autor1 = new Autor({
    nombre: 'Orson Scott Card',
    anyoNacimiento: 1956
});
autor1.save().then(resultado => {
    if (resultado) {
        let libro1 = new Libro({
            titulo: 'El juego de Ender',
            editorial: 'Planeta',
            precio: 14.95,
            autor: resultado._id
        });
        libro1.save();              // No tenemos que hacer nada especial con la inserción del libro en sí

        let libro2 = new Libro({
            titulo: 'Ender el genocida',
            editorial: 'Planeta',
            precio: 18.50,
            autor: resultado._id
        });
        libro2.save();
    }
}).catch (error => {
    console.log('Error creando autor:', error);
});
*/

// Ejercicio 2: crear un libro con sus comentarios

/*
let libro1 = new Libro({
    titulo: 'El lazarillo de Tormes',
    editorial: 'Santillana',
    precio: 4.95
});
libro1.comentarios.push({
    nick: 'nacho',
    texto: 'Un libro entretenido'
});
libro1.comentarios.push({
    nick: 'mario13',
    texto: 'Un tostón infumable'
});
libro1.save().then(resultado => {
    console.log("Libro insertado:", resultado);
}).catch(error => {
    console.log("Error insertando libro:", error);
});
*/

// Ejercicio 3: mostrar título y precio de los 3 libros más baratos, ordenados de menor
// a mayor precio
Libro.find()
.sort('precio')
.limit(3)
.select('titulo precio')
.then(resultado => {
    console.log("3 libros más baratos:", resultado);
});

// Ejercicio 4 (opcional): nombres de los autores que tengan algún libro por menos de
// 10 euros
Libro.find({precio: {$lt: 10}}).then(resultadoLibros => {
    let idsAutores = resultadoLibros.map(libro => libro.autor);
    Autor.find({_id: {$in: idsAutores}}).then(resultadoFinal => {
        let nombresAutores = resultadoFinal.map(autor => autor.nombre);
        console.log("Autores con libros a menos de 10 euros:", nombresAutores);
    });
});