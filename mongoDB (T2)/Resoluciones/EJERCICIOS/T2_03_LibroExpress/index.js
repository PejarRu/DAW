/*
Ejercicio de práctica con las diferentes opciones que ofrece Mongoose
para gestionar documentos y colecciones en MongoDB. En este caso añadimos relaciones
entre distintas colecciones, y uso de subdocumentos, además de búsquedas avanzadas.
Nos basamos para ello en el ejercicio de la sesión anterior.
*/

// Librerías
const express = require('express');
const mongoose = require('mongoose');

// Enrutadores
const autores = require(__dirname + '/routes/libros');
const libros = require(__dirname + '/routes/autors');

// Conexión con la BD
mongoose.connect('mongodb://localhost:27017/libros', {useNewUrlParser: true});

// Servidor Express
let app = express();

// Middleware para peticiones POST y PUT
// Enrutadores para cada grupo de rutas
app.use(express.json());
app.use('/libros', libros);
app.use('/autors', autores);

// Puesta en marcha del servidor
app.listen(8080);

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
/*
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
*/