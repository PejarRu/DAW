//Librerias y modulos
const express = require('express');
const fichUtils = require (__dirname+'/utilidades.js');
//Varibales
const app = express();


fichUtils.cargarJuegos("ds");
fichUtils.guardarJuegos("ds" ["ds","ds"]);
/*
let arrayObjetos = [
    id,
    nombreJuego,
    descripcionJuego,
    edadMinima,
    numeroJugadores,
    tipo,
    precio
]
*/