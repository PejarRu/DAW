const json = require("body-parser");


let personas = [
    { nombre: "Nacho", edad: 42},
    { nombre: "Mario", edad: 4},
    { nombre: "Laura", edad: 2},
    { nombre: "Nora", edad: 10}
   ];
let personaJSON = JSON.stringify(personas);

console.log(personaJSON)
console.log()
console.log(personas)

personas = JSON.parse(personaJSON);

console.log(personas)
//###################

const fs = require("fs");

const archivo = "datos.txt";
const textoPredefinido = "En un lugar de la mancha\n" + "de cuyo nombre no quiero acordarme";

const archivo2 = "personas.txt";
const personas2 = JSON.parse(personaJSON);

let guardarDatos = (nombre_archivo, textoPredefinido) => {
 fs.writeFileSync(nombre_archivo, textoPredefinido);
};

let leerDatos = () => {
 return fs.readFileSync(archivo, 'utf-8');
};


guardarDatos(archivo, textoPredefinido);
console.log("Texto del fichero:\n" + leerDatos(archivo));
console.log();
//=================
guardarDatos(archivo2, JSON.stringify(personas2))
console.log();

