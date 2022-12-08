const express = require('express');

let Autors = require(__dirname + '/../models/autor.js');
let router = express.Router();

// Servicio de listado general
router.get('/', (req, res) => {
    Autors.find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(500)
            .send({ ok: false, error: "Error obteniendo autor" });
    });
});

//Mostramos el autor con el id del enlace
router.get('/:nombre', (req, res) => {
    Autors.findOne(req.params['nombre']).then(resultado => {
        if (resultado) {
            res.status(200)
                .send({ ok: true, autor: autor })
        } else {
            // Si algo falla es porque el servidor no ha podido recuperar la
            // lista de autores, fallo del servidor (500)
            res.status(500)
                .send({ ok: false, error: "No se encontro a ese autor" })
        }
    }
    )
})

//Añadimos un nuevo autor si no esta repetido el nombre
router.post('/', (req, res) => {
    let nuevoAutor = {
        nombre: req.body.nombre,
        editorial: req.body.editorial,
        anyoNacimiento: req.body.anyoNacimiento,
    };

    nuevoAutor.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error añadiendo mascota" });
    });

})

//Eliminamos un autor alamcenado
router.delete('/:nombre', (req, res) => {
    Autors.findByIdAndRemove(req.params['nombre'])
        .then(resultado => {
            if (resultado)
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            else
                res.status(400)
                    .send({ ok: false, error: "Autors no encontrada" });

        }).catch(error => {
            res.status(400)
                .send({ ok: false, error: "Error borrando autor" });
        });
});

module.exports = router;
