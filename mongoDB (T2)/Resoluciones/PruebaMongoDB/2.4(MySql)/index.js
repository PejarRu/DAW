/* Ejemplo de API REST con Express conectando a una base de datos de contactos
   en MySQL */

const express = require('express');
const mysql = require('mysql');

// Parámetros de la conexión
let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contactos'
});

let app = express();
app.use(express.json());

// Servicio de consulta general
app.get('/contactos', (req, res) => {
    conexion.query("SELECT * FROM contactos", (error, resultado, campos) => {
        if (error)
            res.status(500).send({ ok: false, error: "Error listando contactos"});
        else
            res.status(200).send({ ok: true, resultado: resultado});
    });    
})

// Servicio de consulta por id
app.get('/contactos/:id', (req, res) => {
    conexion.query("SELECT * FROM contactos WHERE id = ?", req.params['id'], (error, resultado, campos) => {
        if (error || !resultado || resultado.length == 0)
            res.status(400).send({ ok: false, error: "Error buscando contacto"});
        else
            res.status(200).send({ ok: true, resultado: resultado[0]});
    });    
});

// Servicio de inserción
app.post('/contactos', (req, res) => {
    let nuevoContacto = {
        nombre: req.body.nombre,
        telefono: req.body.telefono
    };
    console.log("a")
    conexion.query("INSERT INTO contactos SET ?", nuevoContacto, (error, resultado, campos) => {
    console.log("c")
        
        if (error || resultado.affectedRows == 0){
        console.log("cF")

            res.status(400).send({ ok: false, error: "Error insertando contacto" });
    console.log("FF")

        }else{
        console.log("cA")

            res.status(200).send({ ok: true, resultado: resultado });
    console.log("AA")

    }});
    console.log("b")

});

// Servicio de modificación
app.put('/contactos/:id', (req, res) => {
    let datosModificados = {
        nombre: req.body.nombre,
        telefono: req.body.telefono
    };
    conexion.query("UPDATE contactos SET ? WHERE id = ?", [datosModificados, req.params['id']], (error, resultado, campos) => {
        if (error)
            res.status(400).send({ ok: false, error: "Error modificando contacto" });
        else
            res.status(200).send({ ok: true, resultado: resultado });
    });

});

// Servicio de borrado
app.delete('/contactos/:id', (req, res) => {
    conexion.query("DELETE FROM contactos WHERE id = ?", req.params['id'], (error, resultado, campos) => {
        if (error)
            res.status(400).send({ ok: false, error: "Error eliminando contacto" });
        else
            res.status(200).send({ ok: true, resultado: resultado });
    });

});

app.listen(8080);