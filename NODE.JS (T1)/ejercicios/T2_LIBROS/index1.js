const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/libros');

/*
//#####################################################
// - DEFINICION DE ESQUEMAS Y ASOCIACIACIONES:  START - 
//#####################################################
*/
let contactoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3
        //trim: true
    },
    editorial: {
        type: String,
        required: true
        //unique: true,
        //trim: true,
        //match: /^\d{9}$/
    },
    precio: {
        required: true,
        type: Number,
        min: 0
        //max: 120
    }
});

let Libro = mongoose.model('libros', contactoSchema);
/*
//###################################################
// - DEFINICION DE ESQUEMAS Y ASOCIACIACIONES: END - 
//###################################################
*/

/*
//##########################################
// - CREACION Y INSERCCION DE DATOS: START - 
//##########################################
*/
// Inserción Libro1
let libro1 = new Libro({
    titulo: "El capitán Alatriste",
    editorial: "Alfaguara",
    precio: 15
   });
libro1.save().then(resultado => {
    console.log("Libro1 añadido:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo libro :", error);
});
// Inserción Libro2
let libro2 = new Libro({
    titulo: "El juego de Ender",
    editorial: "Ediciones B",
    precio: 8.95
   });
libro2.save().then(resultado => {
        console.log("Libro2 añadido:", resultado);
    }).catch(error => {
        console.log("ERROR añadiendo libro 2:", error);
    });
// Inserción Libro3
let libro3 = new Libro({
        titulo: "Cisne negro",
        editorial: "booket",
        precio: 13.95
       });
libro3.save().then(resultado => {
            console.log("Libro3 añadido:", resultado);
        }).catch(error => {
            console.log("ERROR añadiendo libro 3:", error);
        });
/*
//#############################
// - INSERCCION DE DATOS: END - 
//#############################
*/
/*
//#############################
// - BUSQUEDA DE DATOS: START - 
//#############################
*/
//Busqueda de libros
Libro.find({precio: {$gte: 10, $lte: 20}})
.then(resultado => {
 console.log('Resultado de la búsqueda:', resultado);
})
.catch(error => {
 console.log('ERROR:', error);
});
/*
//No lo he encontrado por que no me conecta l mongoDB
let idLibro = '2';
let idLibr2 = '3';
let idLibr3 = '4';

//Encontrar libro
Libro.findById(idLibro)
    .then(resultado => {
        console.log('Resultado del libro por ID:', resultado);
    })
    .catch(error => {
        console.log('ERROR:', error);
    });

//Eliminar libro
Libro.findByIdAndRemove(idLibro2)
    .then(resultado => {
        console.log("Libro eliminado:", resultado);
    }).catch (error => {
        console.log("ERROR:", error);
    });

//Actualizazr libro
Libro.findByIdAndUpdate(idLibro3, 
        { precio: 13.95 , $inc: {__v: 1}} , 
        {new:true})
   .then(resultado => {
        console.log("Libro modificado:", resultado);
   }).catch (error => {
        console.log("ERROR:", error);
   });
   
    */