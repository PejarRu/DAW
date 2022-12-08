const express = require('express');
const bodyParser = require('body-parser');
const fichero = require('./fichero_utils')


let app = express();
let jsonParser = bodyParser.json();
/*
let libros = [
    {codigo: 1, titulo: "El juego de Ender", autor: "Orson Scott Card", precio: 7.95},
    {codigo: 2, titulo: "El Señor de los Anillos", autor: "J.R.R. Tolkien", precio: 19.90},
    {codigo: 3, titulo: "La tabla de Flandes", autor: "Arturo Pérez Reverte", precio: 8.50},
    {codigo: 4, titulo: "La historia interminable", autor: "Michael Ende", precio: 12.35}
   ];
*/

let libros = fichero.cargarLibros();



//Mostramos todos los libros
app.get('/libros', (req, res) => {
    if (libros && libros.length > 0) {
        res.status(200)
            .send({ok: true, libros: libros})
    }else{
        // Si algo falla es porque el servidor no ha podido recuperar la
        // lista de libros, fallo del servidor (500)
        res.status(500)
            .send({ok:false, error: "No se encontraros libros"})
    }
})

//Mostramos el libro con el id del enlace
app.get('/libros/:codigo', (req, res) => {
     let resultado = libros.filter(
        libro => libro.codigo == req.query.codigo
     )
    if (resultado && resultado.length > 0) {
        res.status(200)
            .send({ok: true, libros: libro})
    }else{
        // Si algo falla es porque el servidor no ha podido recuperar la
        // lista de libros, fallo del servidor (500)
        res.status(500)
            .send({ok:false, error: "No se encontraros libros"})
    }
})

//Añadimos un nuebo libro si no esta repetido el titulo
app.post('/libros', jsonParser, (req, res) => {
    let nuevoLibro = {
        codigo: req.body.codigo,
        titulo: req.body.titulo,
        autor: req.body.autor,
        precio: req.body.precio
        };
    let existe = libros.filter(
        libro => libro.titulo == nuevoLibro.titulo
    );
    if (existe.length == 0) {
        // No existe libro. Añadimos y enviamos OK
        libros.push(nuevoLibro);
        fichero.guardarLibros(libros);
        res.status(200).send({ok: true, libros: libros});
    } else {
        // El libro ya existe. Enviamos error
        res.status(400).send({ok: false, 
        error: "Libro duplicado"});
    }
})

//Editamos un libro alamcenado
app.put('/libros/:codigo', jsonParser, (req, res) => {
    let existe = libros.filter(
        libro => libro.codigo == req.params['codigo']
    );
    
    if (existe.length > 0) {
        // Existe libro. Editamos y enviamos OK
        let libro = existe[0];
        libro.codigo = req.body.codigo; 
        libro.titulo = req.body.titulo; 
        libro.autor = req.body.autor; 
        libro.precio = req.body.precio; 

        fichero.guardarLibros(libros);

        res.status(200).send({ok: true, libros: libros});
    } else {
        
        // El libro no existe. Enviamos error
        res.status(400).send({ok: false, error: "Libro no encontrado"});
    }
})

//Eliminamos un libro alamcenado
app.delete('/libros/:codigo', (req, res) => {

    let filtrado = libros.filter(
        libro => libro.codigo != req.params['codigo']
    );
    if (filtrado.length != libros.length) {
        // El contacto existe. Reemplazamos el array y OK
        libros = filtrado;
        fichero.guardarLibros(libros);
        res.status(200).send({ok: true, libros: libros});
    } else {
        // No se ha filtrado nada. El contacto no existe
        res.status(400).send({ok: false, error: "Contacto no encontrado"});
    }
});
       


app.listen(8081);
