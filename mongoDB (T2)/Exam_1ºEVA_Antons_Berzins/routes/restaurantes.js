/**
 * Fichero routes/restaurantes.js: Archivo con TODAS las 
 * peticiones al servidor tanto para /restaurante:   
 *      GET, POST, PUT, DELETE
 * como para /restaurante/comentarios:
 *      POST, DELETE
 */
//
let Restaurantes = require(__dirname + '/../models/restaurante.js');

const express = require('express');
let router = express.Router();

// Servicio de listado general
router.get('/', (req, res) => {
    Restaurantes.find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(500)
            .send({ ok: false, error: `No se encontraron restaurantes` });
    });
});

//Mostramos el restaurante con el id del enlace
router.get('/:id', (req, res) => {
    Restaurantes.findById(req.params.id).then(resultado => {
        if (resultado) {
            res.status(200)
                .send({ ok: true, resultado: resultado })
        } else {
            // Si algo falla es porque el servidor no ha podido recuperar la
            // lista de restaurantes, fallo del servidor (500)
            res.status(400)
                .send({ ok: false, error: "Restaurante no encontrado" })
        }
    }
    )
})

//Añadimos un nuevo restaurante si no esta repetido el nombre
router.post('/', (req, res) => {
    let nuevoRestaurante = new Restaurantes({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        telefono: req.body.telefono,
        imagen: req.body.imagen,
        tipo: req.body.tipo,
        puntuacion: req.body.puntuacion,
        precio: req.body.precio,
    });

    nuevoRestaurante.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error insertando el restaurante" });
    });
})

//Añadimos una nueva comentario a un restaurante existente
router.post('/comentarios/:idRestaurante', (req, res) => {
    Restaurantes.findById(req.params['idRestaurante'])
        .then(restaurante=> {
            restaurante.Comentarios.push({
                creador: req.body.creador, 
                comentario: req.body.comentario, 
                fecha: req.body.fecha 
            })

            restaurante.save()

            res.status(200)
                .send({ ok: true, resultado: restaurante.Comentarios });

        }).catch(error => {
            res.status(400)
                .send({ ok: false, error: "Error modificadno las comentarios del restaurante"});
        })
});

//Editamos un nuevo restaurante si existe
router.put('/:id', (req, res) => {
    Restaurantes.findByIdAndUpdate(req.params['id'], {
        $set: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            telefono: req.body.telefono,
            imagen: req.body.imagen,
            tipo: req.body.tipo,
            puntuacion: req.body.puntuacion,
            precio: req.body.precio
        }
    }, { new: false, runValidators: true }).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error modificando restaurante"
            });
    });
})

//Eliminamos un restaurante o alamacenado con TODOS SUS CAMPOS
router.delete('/:id', (req, res) => {
    Restaurantes.findByIdAndRemove(req.params.id)
        .then(resultado => {
            if (resultado)
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            else
                res.status(400)
                    .send({ ok: false, error: "Restaurante no encontrado" });

        }).catch(error => {
            res.status(400)
                .send({ ok: false, error: "Error eliminando el restaurante" });
        });
});

//Eliminamos una comentario de un restaurante alamacenado
router.delete('/comentarios/:idRestaurante/:idEdicion', (req, res) => {
    Restaurantes.findByIdAndUpdate(req.params.idRestaurante)
        .then(resultado => {
            resultado.Comentarios.pull(req.params.idEdicion)
            resultado.save()
            //restaurante.Comentarios.id(req.params.idEdicion).remove()
                res.status(200)
                    .send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400)
                .send({ ok: false, error: "Error eliminando la comentario del restaurante" });
        })
    });


module.exports = router;
