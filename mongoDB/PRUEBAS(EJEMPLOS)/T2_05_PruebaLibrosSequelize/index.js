const Sequelize = require('sequelize');
const express = require('express');

const ModeloAutor = require(__dirname + "/models/autor");
const ModeloLibro = require(__dirname + "/models/libro");

const routerAutores = require(__dirname + "/routes/autores");
const routerLibros = require(__dirname + "/routes/libros");

const sequelize = new Sequelize('libros_sequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


const Autor = ModeloAutor(sequelize, Sequelize);
const Libro = ModeloLibro(sequelize, Sequelize);

Libro.belongsTo(Autor, {foreignKey: 'idAutor', as: 'Autor'});

const autores = routerAutores(express, Autor);
const libros = routerLibros(express, Libro, Autor);

let app = express();

app.use(express.json());
app.use('/libros', libros);
app.use('/autores', autores);

sequelize.sync()
.then(() => {
    app.listen(8080);
}).catch (error => {
    console.log(error);
});