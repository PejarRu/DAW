const express = require('express');
let Libros = require(__dirname + '/../models/libro.js');
let router = express.Router();

//Mostramos todos los libros
router.get('/', (req, res) => {
    Libros.find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(500)
            .send({ ok: false, error: "Error obteniendo contactos" });
    });
})

//Mostramos el libro con el id del enlace
router.get('/:codigo', (req, res) => {
    Libros.findById(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
        else
            res.status(400)
                .send({
                    ok: false,
                    error: "No se han encontrado libros"
                });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error buscando el libro indicado"
            });
    });
})

//Añadimos un nuebo libro si no esta repetido el titulo
router.post('/', (req, res) => {
    let nuevoLibro = {
        codigo: req.body.codigo,
        titulo: req.body.titulo,
        autor: req.body.autor,
        precio: req.body.precio
    };
    nuevoLibro.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error añadiendo libro"
            });
    });
})

//Editamos un libro alamcenado
router.put('/:codigo', (req, res) => {
    l
    Libros.findByIdAndUpdate(req.params.id, {
        $set: {
            codigo: req.body.codigo,
            titulo: req.body.titulo,
            autor: req.body.autor,
            precio: req.body.precio
        }
    }, {new: true}).then(resultado => {
        if (resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, error: "Libro no encontrado"});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
            error:"Error actualizando contacto"});
        });
})

//Eliminamos un libro alamcenado
router.delete('/:codigo', (req, res) => {
    Libros.findByIdAndRemove(req.params.codigo).then(resultado => {
        if (resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, error: "Libro no encontrado"});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error eliminando liboro"});
    });
});

module.exports = router;