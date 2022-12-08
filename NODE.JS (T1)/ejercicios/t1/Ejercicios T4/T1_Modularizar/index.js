const { datos } = require("./personas");

// Programa principal
const personas = require(__dirname + '/personas');


// Inserciones
personas.nuevaPersona({nombre: "Juan", telefono:"965661564", edad: 60}).then(resultado => {
    console.log("Añadida persona:", resultado);
}).catch(error => {
    console.log(error);
});
personas.nuevaPersona({nombre: "Rodolfo", telefono:"910011001", edad: 20}).then(resultado => {
    console.log("Añadida persona:", resultado);
}).catch(error => {
    console.log(error);
});
// Inserción repetida para que dé error
personas.nuevaPersona({nombre: "Rodolfo", telefono:"910011001", edad: 20}).then(resultado => {
    console.log("Añadida persona:", resultado);
}).catch(error => {
    console.log(error);
});

// Borrados
personas.borrarPersona("910011001").then(resultado => {
    console.log("Borrada persona:", resultado);
}).catch(error => {
    console.log(error);
});
// Borrado con número equivocado para que dé error
personas.borrarPersona("000000000").then(resultado => {
    console.log("Borrada persona:", resultado);
}).catch(error => {
    console.log(error);
});

//console.log(datos)