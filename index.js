//Librerias y modulos
const express = require('express');
const { cargarJuegos } = require('./utilidades');
const fichUtils = require (__dirname+'/utilidades.js');
//Varibales
const archivo = "juegos.json"
/*
let juegoEjemplo = [{
    id: "01",
    nombreJuego: "Far Cry 4",
    descripcionJuego: "Jason es capturado por una banda criminal en una isla abandonada. Tras conseguir escapar...",
    edadMinima: 18,
    numeroJugadores: 1,
    tipo: "Survival",
    precio: 59.9
},
{
    id: "02",
    nombreJuego: "Far Cry 5",
    descripcionJuego: "Manuel es capturado por una banda criminal en una isla abandonada. Tras conseguir escapar...",
    edadMinima: 18,
    numeroJugadores: 1,
    tipo: "Survival",
    precio: 65.6
}];
console.log("A: " + Date.now())
fichUtils.guardarJuegos(archivo, juegoEjemplo);
console.log("B")

fichUtils.buscarJuego(archivo, "Far Cry 4");
console.log("C")

fichUtils.buscarJuego(archivo, "Far Cry 3");
console.log("D ")
*/

//Cargamos todos los juegos a un arrya
let juegosArray = cargarJuegos(archivo);

const app = express();
app.listen(8080);

//Servicio para devolver todos los juegos en array con la posibilidad de filtrar por años y tipo
app.get('/juegos', (req, res) => {
    let resultado;

    //Procesamos el query '?anyos'
    if(req.query.anyos){
        switch (true) {
            case req.query.anyos > 0 :
                //Si esta puesto juegos?anyos debidamente, filtramos 
                resultado = juegosArray.filter(
                    juego => juego.edadMinima >= req.query.anyos
                );
                break;
            case req.query.anyos <= 0 :
                //La edad para buscar es incorrecta, devolvemos error
                res.status(400).send({ok: false, error: "Edad mínima recomendada en años inválida"});
                break;
            default:
                //Si no hay parametro, devolvemos el array tal cual
                resultado = juegosArray;
                break;
        }
    }
     //Procesamos el query '?tipo'
     if(req.query.tipo){
        resultado = juegosArray.filter(
            juego => juego.tipo == req.query.tipo
        );
    }
    //Devolvemos resultado
    res.status(200).send({ok: true, resultado: resultado});

});


//Servicio para obtener un juego a partir de su id 
app.get('/juego/:id', (req, res) => {

    let resultado = juegosArray.filter((juego)=> juego.id == req.params['id'])

    if (resultado.length > 0){
        res.status(200).send({ok: true, resultado: resultado[0]});
    }else{
        res.status(400).send({ok: false, error: "Codigo del juego inexistente"});
    }
});

   
