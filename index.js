//Librerias y modulos
const express = require('express');
const bodyParser = require('body-parser');
const fichUtils = require('./utilidades.js');
//Varibales
const ruta = "output/juegos.json"

let juegoEjemplo = fichUtils.cargarJuegos(ruta)
console.log("A: " + Date.now())

fichUtils.buscarJuego(ruta, "Far Cry 4");
console.log("B")

fichUtils.buscarJuego(ruta, "Far Cry 3");
console.log("C")


//Cargamos las librerias y empezamos a escuchar el puerto
const app = express();
app.use(bodyParser.json());

app.listen(8080);

//Cargamos todos los juegos a un arrya
console.log("##### Cargando array... #####")
let juegosArray = fichUtils.cargarJuegos(ruta);
console.log("##### ...Array cargado #####")

/*   ######################    
#### SERVICIOS GET - START ####
    #######################     */

app.get('/juegos', (req, res) => {
    let resultado;

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
app.get('/juego/:id', (req, res) => {

    let resultado = juegosArray.filter((juego) => juego.id == req.params['id'])

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
    let id = req.body.id;
    let nombreJuego = req.body.nombreJuego;
    let descripcionJuego = req.body.descripcionJuego;
    let edadMinima = req.body.edadMinima;
    let numeroJugadores = req.body.numeroJugadores;
    let tipo = req.body.tipo;
    let precio = req.body.precio;

    let nuevoJuego = [{
        nombreJuego: nombreJuego,
        descripcionJuego: descripcionJuego,
        edadMinima: edadMinima,
        numeroJugadores: numeroJugadores,
        tipo: tipo,
        precio: precio
    }]

    //Buscamos un juego con el mismo id
    let existe = juegosArray.filter(
        (juego) => juego.id == id
    );

    if (existe.length == 0) {
        // No existe juego. Añadimos al array
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
    let id = req.body.id;
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
        res.status(200).send({ ok: true, resultado: juego});
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
    let id = req.body.id;

    //Buscamos el juego con ese id
    let juegoEliminado = juegosArray.filter(
        (juego) => juego.nombre == id
    );

    if (filtrado.length > 0) {
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