//Librerias y modulos
const fs = require('fs');
//Constantes y variables


//Devuelve el array de objetos (juegos) Javascript 
//que se hayan leído del JSON o de lo
//contrario, un array vacio
function cargarJuegos(nombreFichero){
    //Leemos y formateaos el archivo donde guardamos los juegos
    let juegosArray = JSON.parse(fs.readFileSync(nombreFichero, 'utf-8'));

    //Devolvemos el array
    console.log(`Se ha encontrado en "${nombreFichero}": ${juegosArray.toString()}`);

    return juegosArray;
}

//Guardará los objetos del array en el fichero en formato JSON. 
//Si el array es nulo o vacío, no se hará nada con el fichero.
function guardarJuegos(nombreFichero, arrayJuegos){

    if (arrayJuegos.length > 0) {
        //Array no esta vacio, debemos guardar los datos
        //Formateaos el array a texto JSON
        let arrayJuegosJSON = JSON.stringify(arrayJuegos);

        //Escribimos el array al fichero y notificamos por consola
        fs.writeFileSync(nombreFichero, arrayJuegosJSON);
        console.log("################################");
        console.log(`Se ha guardado en "${nombreFichero}": ${arrayJuegosJSON}`);
        console.log("################################");
    }else{
        //Array vacio
        console.log("El array esta vacio o solo contiene 1 objeto");
    }
}

//Devuelve el array de objetos (juegos) Javascript 
//que se hayan leído 
//Devuelve un objeto vacio si no encuentra nada
function buscarJuego(nombreFichero, nombreABuscar){
    //Leemos y formateaos el archivo donde guardamos los juegos
    let juegosArray = JSON.parse(fs.readFileSync(nombreFichero, 'utf-8'));

    //Filtamos por nombre
    let objetoJuego = juego => nombreABuscar == juego.nombreJuego

    //Devolvemos el objetoJuego
    console.log(`Se ha encontrado en "${nombreFichero}": ${objetoJuego}`);

    return objetoJuego;
}

module.exports = {
    cargarJuegos,
    guardarJuegos,
    buscarJuego
}