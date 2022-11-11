/**
 * Fichero routes/juegos.js: Archivo con TODAS las 
 * peticiones al servidor tanto para /juego:   
 *      GET, POST, PUT, DELETE
 * como para /juego/ediciones:
 *      POST, DELETE
 */
//
let Juegos = require(__dirname + '/../models/juego.js');

const express = require('express');
let router = express.Router();

// Servicio de listado general
router.get('/', (req, res) => {
    Juegos.find().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(500)
            .send({ ok: false, error: `No se encontraron juegos de mesa` });
    });
});

//Mostramos el juego con el id del enlace
router.get('/:id', (req, res) => {
    Juegos.findById(req.params.id).then(resultado => {
        if (resultado) {
            res.status(200)
                .send({ ok: true, resultado: resultado })
        } else {
            // Si algo falla es porque el servidor no ha podido recuperar la
            // lista de juegoes, fallo del servidor (500)
            res.status(400)
                .send({ ok: false, error: "Juego no encontrado" })
        }
    }
    )
})

//Añadimos un nuevo juego si no esta repetido el nombre
router.post('/', (req, res) => {
    let nuevoJuego = new Juegos({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        edad: req.body.edad,
        jugadores: req.body.jugadores,
        tipo: req.body.tipo,
        precio: req.body.precio,
        imagen: req.body.imagen
    });

    nuevoJuego.save().then(resultado => {
        res.status(200)
            .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({ ok: false, error: "Error insertando el juego: "+error });
    });

})

//Editamos un nuevo juego si existe
router.put('/:id', (req, res) => {
    Juegos.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            jugadores: req.body.jugadores,
            tipo: req.body.tipo,
            precio: req.body.precio,
            imagen: req.body.imagen
        }
    }, { new: true }).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error modificando juego"
            });
    });
})

//Añadimos una nueva edicion a un juego existente
router.post('/ediciones/:idJuego', (req, res) => {
    let edicion = {
        "edicion": req.body.edicion,
        "anyo": req.body.anyo
    }
    Juegos.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            edad: req.body.edad,
            jugadores: req.body.jugadores,
            tipo: req.body.tipo,
            precio: req.body.precio,
            imagen: req.body.imagen,
            Edicion: edicion
        }
    }, { new: true }).then(resultado => {
        if (resultado)
            res.status(200)
                .send({ ok: true, resultado: resultado });
    }).catch(error => {
        res.status(400)
            .send({
                ok: false,
                error: "Error modificando las ediciones del juego"
            });
    });
})

//Eliminamos un juego alamacenado con TODOS SUS CAMPOS
router.delete('/:id', (req, res) => {
    Juegos.findByIdAndRemove(req.params['id'])
        .then(resultado => {
            if (resultado)
                res.status(200)
                    .send({ ok: true, resultado: resultado });
            else
                res.status(400)
                    .send({ ok: false, error: "Juegos no encontrado" });

        }).catch(error => {
            res.status(400)
                .send({ ok: false, error: "Error eliminando el juego" });
        });
});

//Eliminamos una edicion de un juego alamacenado
router.delete('/ediciones/:idJuego/:idEdicion', (req, res) => {
    Juegos.findOne(req.params['idJuego'])
        .then(resultadoJuego.findByIdAndRemove(req.params['idEdicion'])
            .then(resultadoEdicion => {
                if (resultadoEdicion)
                    res.status(200)
                        .send({ ok: true, resultado: resultadoEdicion });
            }).catch(error => {
                res.status(400)
                    .send({ ok: false, error: "Error eliminando la edicion del juego" });
            }));
});

module.exports = router;
