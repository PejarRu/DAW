/* Ejemplo de API REST con Express conectando a una base de datos de libros
   en MySQL */

const express = require('express');
const mysql = require('mysql');
// Parámetros de la conexión
let conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libros'
});

let app = express();
app.use(express.json());


// Servicio de consulta general
app.get('/libros', (req, res) => {
    conexion.query("SELECT * FROM libros", (error, resultado, campos) => {
        if (error)
            res.status(500).send({ ok: false, error: "Error listando libros"});
        else
            res.status(200).send({ ok: true, resultado: resultado});
    });    
})

// Servicio de consulta por id
app.get('/libros/:id', (req, res) => {
    conexion.query("SELECT * FROM libros WHERE id = ?", req.params['id'], (error, resultado, campos) => {
        if (error || !resultado || resultado.length == 0)
            res.status(400).send({ ok: false, error: "Error buscando libro"});
        else
            res.status(200).send({ ok: true, resultado: resultado[0]});
    });    
});

// Servicio de inserción
app.post('/libros', (req, res) => {
    let nuevoLibro = {
        id: "",
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio,
        autor: req.body.autor
    };

    conexion.query("INSERT INTO libros SET ?", nuevoLibro, (error, resultado, campos) => {
        if (error || resultado.affectedRows == 0){
            res.status(400).send({ ok: false, error: "Error al insertar libro" });
        }else{
            res.status(200).send({ ok: true, resultado: resultado });
        }
    });
});

// Servicio de modificación
app.put('/libros/:id', (req, res) => {
    let datosModificados = {
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio,
        autor: req.body.autor
    };
    console.log(req.body.titulo)
    console.log(req.body.editorial)
    console.log(req.body.precio)
    console.log(req.body.autor)
    conexion.query("UPDATE libros SET ? WHERE 'id' = ?", [datosModificados, req.params['id']], (error, resultado, campos) => {
        if (error || resultado.affectedRows == 0)
            res.status(400).send({ ok: false, error: "Error modificando libro" });
        else
            res.status(200).send({ ok: true, resultado: resultado });
    });

});

// Servicio de borrado
app.delete('/libros/:id', (req, res) => {
    conexion.query("DELETE FROM libros WHERE id = ?", req.params['id'], (error, resultado, campos) => {
        if (error || resultado.affectedRows == 0 )
            res.status(400).send({ ok: false, error: "Error eliminando libro" });
        else
            res.status(200).send({ ok: true, resultado: resultado });
    });

});

app.listen(8080);