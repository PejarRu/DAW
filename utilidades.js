//Librerias y modulos
const fs = require('fs');
//Constantes y variables
const archivo = "juegos.json"
//Devuelve el array de objetos (juegos) Javascript 
//que se hayan leído de él en formato JSON o de lo
//contrario, un array vacio
function cargarJuegos(nombreJuego){
    //Leemos el archivo donde guardamos los juegos
    let textoJSON = fs.readFileSync(archivo, 'utf-8');

    //Formateaos el texto JSON a array
    let juegosArray = JSON.parse(textoJSON);

    //Entre todos los juegos del array, buscamos el que contenga el nombre
    let juego = juegosArray.filter(j => j.nombreJuego == nombreJuego);

    //Devolvemos el valor encontrado
    console.log(juego);
    return juego;
}

// guardará los objetos del array en el fichero en formato JSON. 
//Si el array es nulo o vacío, no se hará nada con el fichero.
function guardarJuegos(nombreFichero, arrayJuegos){

    if (arrayJuegos > 0) {
        //Array no esta vacio, debemos guardar los datos
        //Formateaos el array a texto JSON
        let arrayJuegosJSON = JSON.stringify(arrayJuegos);
        console.log(arrayJuegosJSON);
        //Escribimos el arrya al fichero
        fs.writeFileSync(nombreFichero, arrayJuegosJSON);
    }
    //Array vacio o ya se han guardado los datos
}

module.exports = {
    cargarJuegos,
    guardarJuegos
}