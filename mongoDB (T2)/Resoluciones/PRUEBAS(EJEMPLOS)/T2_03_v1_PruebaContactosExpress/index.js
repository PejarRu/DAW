/*
Pruebas con la Express y Mongoose para proporcionar servicios básicos
sobre una base de datos de contactos
*/

const express = require('express');
const mongoose = require('mongoose');

// Conexión con la BD
mongoose.connect('mongodb://localhost:27017/contactos');

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

// Asociación con el modelo (colección contactos)
let Contacto = mongoose.model('contacto', contactoSchema);

// Servidor Express
let app = express();

// Middleware para peticiones POST y PUT
app.use(express.json());

// Servicio de listado general
app.get('/contactos', (req, res) => {
    Contacto.find().then(resultado => {
        res.status(200)
           .send({ ok: true, resultado: resultado });
    }).catch (error => {
        res.status(500)
           .send({ ok: false, error: "Error obteniendo contactos"});
    }); 
});

// Servicio de listado por id
app.get('/contactos/:id', (req, res) => {
    Contacto.findById(req.params.id).then(resultado => {
        if(resultado)
            res.status(200)
               .send({ ok: true, resultado: resultado });
        else
            res.status(400)
               .send({ ok: false, 
                       error: "No se han encontrado contactos" });
    }).catch (error => {
        res.status(400)
           .send({ ok: false, 
                   error: "Error buscando el contacto indicado" });
    }); 
});

// Servicio para insertar contactos
app.post('/contactos', (req, res) => {

    let nuevoContacto = new Contacto({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        edad: req.body.edad
    });
    nuevoContacto.save().then(resultado => {
        res.status(200)
           .send({ok: true, resultado: resultado});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error: "Error añadiendo contacto"});
    });
});

// Servicio para modificar contactos
app.put('/contactos/:id', (req, res) => {

    Contacto.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            edad: req.body.edad
        }
    }, {new: true}).then(resultado => {
        if (resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, error: "Contacto no encontrado"});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error actualizando contacto"});
    });
});

// Servicio para borrar contactos
app.delete('/contactos/:id', (req, res) => {

    Contacto.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado)
            res.status(200)
               .send({ok: true, resultado: resultado});
        else
            res.status(400)
               .send({ok: false, error: "Contacto no encontrado"});
    }).catch(error => {
        res.status(400)
           .send({ok: false, 
                  error:"Error eliminando contacto"});
    });
});

// Puesta en marcha del servidor
app.listen(8080);