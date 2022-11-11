/**
 * Fichero index.js: Archivo principal con todos los 
 * servicios de POST, PUT, GET, DELETE
 */

//Librerias y modulos
const express = require('express');
const bodyParser = require('body-parser');
const fichUtils = require(__dirname + '/utilidades.js');
//Varibales
const ruta = "output/juegos.json"

//Cargamos las librerias y empezamos a escuchar el puerto
const app = express();
app.use(bodyParser.json());

//Cargamos todos los juegos a un array
console.log("##### Cargando array... #####")
let juegosArray = fichUtils.cargarJuegos(ruta);
console.log("##### ...Array cargado #####")
/**
 *let juegoEjemplo =  {
        "id" = "01",
        "nombreJuego" = "Far Cry 4",
        "descripcionJuego" = "Jason es capturado por una banda criminal en una isla abandonada. Tras conseguir escapar...",
        "edadMinima" = 18,
        "numeroJugadores" = 1,
        "tipo" = "Survival",
        "precio" = 59.9
    }
 */ 
/*   ######################    
#### SERVICIOS GET - START ####
    #######################     */

app.get('/juegos', (req, res) => {
    let resultado = juegosArray
    //Procesamos el query '?anyos'
    if (req.query.anyos) {
        switch (true) {
            case req.query.anyos > 0:
                //Si esta puesto juegos?anyos debidamente, filtramos 
                resultado = juegosArray.filter(
                    (juego) => juego.edadMinima >= req.query.anyos
                );
                break;
            case req.query.anyos <= 0:
                //La edad para buscar es incorrecta, devolvemos error
                res.status(400).send({ ok: false, error: "Edad mínima recomendada en años inválida" });
                break;
            default:
                //Si no hay parametro, devolvemos el array tal cual
                resultado = juegosArray;
                break;
        }
    }
    //Procesamos el query '?tipo'
    if (req.query.tipo) {
        resultado = juegosArray.filter(
            (juego) => juego.tipo == req.query.tipo
        );
    }
    //Devolvemos resultado
    res.status(200).send({ ok: true, resultado: resultado });

});

//Servicio para obtener un juego a partir de su id 
app.get('/juegos/:id', (req, res) => {

    let resultado = juegosArray.filter((juego) => juego.id == req.params['id']);

    if (resultado.length > 0) {
        res.status(200).send({ ok: true, resultado: resultado[0] });
    } else {
        res.status(400).send({ ok: false, error: "Codigo del juego inexistente" });
    }
});

/*  ##################### 
#### SERVICIOS GET - END ####
    #####################    */
/*  ######################## 
#### SERVICIOS POST - START ####
    ########################    */
app.post('/juegos', (req, res) => {
    //Asignacion de variables con la libreria body-parser
    let nuevoJuego = {
        id: req.body.id,
        nombreJuego: req.body.nombreJuego,
        descripcionJuego: req.body.descripcionJuego,
        edadMinima: req.body.edadMinima,
        numeroJugadores: req.body.numeroJugadores,
        tipo: req.body.tipo,
        precio: req.body.precio
    }

    //Buscamos un juego con el mismo id
    let existe = juegosArray.filter(
        j => j.id == req.body.id
    );

    if (existe.length == 0) {
        //No existe
        //Añadimos al array
        juegosArray.push(nuevoJuego);

        //Guardamos el array nuevo en el ruta
        fichUtils.guardarJuegos(ruta, juegosArray);

        // *TO-DO: QUITAR EL resultado: nuevoJuego*
        res.status(200).send({ ok: true, resultado: nuevoJuego });
    } else {
        // El id del juego ya existe. Enviamos error
        res.status(400).send({
            ok: false,
            error: "Código de juego repetido"
        });
    }
});
/*  ###################### 
#### SERVICIOS POST - END ####
    #####################     */
/*  ####################### 
#### SERVICIOS PUT - START ####
    #######################    */

app.put('/juegos/:id', (req, res) => {
    //Asignacion de variables con la libreria body-parser
    let id = req.params['id'];
    let nombreJuego = req.body.nombreJuego;
    let descripcionJuego = req.body.descripcionJuego;
    let edadMinima = req.body.edadMinima;
    let numeroJugadores = req.body.numeroJugadores;
    let tipo = req.body.tipo;
    let precio = req.body.precio;

    //Buscamos un juego con el mismo id
    let existe = juegosArray.filter(
        (juego) => juego.id == id
    );

    if (existe.length != 0) {
        // El id del juego si se encontro. Hacemos los cambios
        let juego = existe[0];

        juego.nombreJuego = nombreJuego,
            juego.descripcionJuego = descripcionJuego,
            juego.edadMinima = edadMinima,
            juego.numeroJugadores = numeroJugadores,
            juego.tipo = tipo,
            juego.precio = precio

        //Guardamos el array nuevo en el ruta
        fichUtils.guardarJuegos(ruta, juegosArray);

        //Enviamos la respuesta
        res.status(200).send({ ok: true, resultado: juego });
    } else {
        // No existe el id buscado. Enviamos error
        res.status(400).send({
            ok: false,
            error: "Juego no encontrado"
        });
    }
});

/*  ##################### 
#### SERVICIOS PUT - END ####
    ######################   */
/*  ########################## 
#### SERVICIOS DELETE - START ####
    ##########################     */

app.delete('/juegos/:id', (req, res) => {
    //Asignacion de variables con la libreria body-parser
    let id = req.params['id'];

    //Buscamos el juego con ese id
    let juegoEliminado = juegosArray.filter(
        (juego) => juego.id == id
    );

    if (juegoEliminado.length > 0) {
        //El contacto existe. Eliminamos el juego dentro del arrayJuegos
        juegosArray.splice(juegosArray.indexOf(juegoEliminado))

        //Guardamos el array nuevo en el ruta
        fichUtils.guardarJuegos(ruta, juegosArray);

        //Enviamos respuesta
        res.status(200).send({ ok: true, resultado: juegoEliminado });
    } else {
        // No se ha filtrado nada. El contacto no existe
        res.status(400).send({
            ok: false,
            error: "Juego no encontrado"
        });
    }
});

/*  ######################## 
#### SERVICIOS DELETE - END ####
    ########################     */
//Escuchamos al puerto
app.listen(8080);