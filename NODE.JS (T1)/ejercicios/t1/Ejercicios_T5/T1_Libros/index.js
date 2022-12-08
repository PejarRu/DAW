const express = require('express');

let app = express();

let libros = [
    {codigo: 1, titulo: "El juego de Ender", autor: "Orson Scott Card", precio: 7.95},
    {codigo: 2, titulo: "El Señor de los Anillos", autor: "J.R.R. Tolkien", precio: 19.90},
    {codigo: 3, titulo: "La tabla de Flandes", autor: "Arturo Pérez Reverte", precio: 8.50},
    {codigo: 4, titulo: "La historia interminable", autor: "Michael Ende", precio: 12.35}
   ];

app.get('/libros', (req, res) => {
    res.send(libros);
})
app.get('/libros/:id', (req, res) => {
    let resultado = libros.filter(
        libro => libro.codigo == req.params['id']
    );
    resultado.length > 0 ? res.send(resultado) : res.send("Libro no encontrado");
})

app.listen(8081);