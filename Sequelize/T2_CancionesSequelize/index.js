const Sequelize = require('sequelize');
const express = require('express');

const ModeloArtista = require(__dirname + "/models/artista");
const ModeloCancion = require(__dirname + "/models/cancion");

const routerArtistas = require(__dirname + "/routes/artistas");
const routerCanciones = require(__dirname + "/routes/canciones");

const sequelize = new Sequelize('artistas_sequelize', 'root', '', {
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


const Artista = ModeloArtista(sequelize, Sequelize);
const Cancion = ModeloCancion(sequelize, Sequelize);

Cancion.belongsTo(Artista, {foreignKey: 'idArtista', as: 'Artista'});
Artista.hasMany(Cancion, {foreignKey: 'idCancion', as: 'Cancion'});

const artistas = routerArtistas(express, Artista);
const canciones = routerCanciones(express, Cancion, Artista);

let app = express();

app.use(express.json());
app.use('/artistas', artistas);
app.use('/canciones', canciones);

sequelize.sync()
.then(() => {
    app.listen(8080);
}).catch (error => {
    console.log(error);
});