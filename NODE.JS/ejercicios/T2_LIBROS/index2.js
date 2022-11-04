const mongoose = require('mongoose');

/*
//#####################################################
// - DEFINICION DE ESQUEMAS Y ASOCIACIACIONES:  START - 
//#####################################################
*/
//Esquema Autor
let schemaAutor = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
        //minlength: 3,
        //trim: true
    },
    editorial: {
        type: String,
        required: true
        //unique: true,
        //trim: true,
        //match: /^\d{9}$/
    },
    añoNacimiento: {
        required: false,
        type: Number,
        min: 0,
        max: 2000
        //max: 120
    }
});
//Asociacion esquema Autor
let Autor = mongoose.model('autor', schemaAutor);

//Esquema Comentarios
let schemaComentarios = new mongoose.Schema({
    fecha: {
        type: Date,
        required: true,
        default: Date.now
        //trim: true
    },
    nick: {
        type: String,
        required: true
        //unique: true,
        //trim: true,
        //match: /^\d{9}$/
    },
    comentario: {
        required: true,
        type: String,
        min: 0,
        //max: 120
    }
});

//Esquema Libros
let schemaLibros = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
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
        min: 0,
        //max: 120
    },
    autor: [{
        //id: id;
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autor'
    }],
    comentario: [schemaComentarios]
});
//Asociacion esquema Libros
let Libro = mongoose.model('libros', schemaLibros);
/*
//###################################################
// - DEFINICION DE ESQUEMAS Y ASOCIACIACIONES: END - 
//###################################################
*/
//Conexion a la DB
mongoose.connect('mongodb://localhost:27017/libros');
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
    console.log("Libro añadido:", resultado);
}).catch(error => {
    console.log("ERROR añadiendo libro:", error);
});
// Inserción Libro2
let libro2 = new Libro({
    título: "El juego de Ender",
    editorial: "Ediciones B",
    precio: 8.95,
    comentario: [{
        fecha: new Date(2003,10,02),
        nick: "AntonBer",
        comentario: "Magnifico libro. Recomendable!"
    },
    {
        fecha: Date.now,
        nick: "PejaRu",
        comentario: "No me ha gustado. Pero interesante!"
    }]
   });
libro2.save().then(resultado => {
        console.log("Libro añadido:", resultado);
    }).catch(error => {
        console.log("ERROR añadiendo libro:", error);
});
// Inserción Autor1
let autor1 = new Autor({
    nombre: "Nassim Taleb",
    año: 1993
});
autor1.save().then(resultado => {
        console.log("Autor añadido:", resultado);
    }).catch(error => {
        console.log("ERROR añadiendo autor:", error);
});
// Inserción Autor2
let autor2 = new Autor({
    nombre: "Federico Garcia Lorca"
});
autor2.save().then(resultado => {
        console.log("Autor añadido:", resultado);
    }).catch(error => {
        console.log("ERROR añadiendo autor:", error);
});
// Inserción Autor3
let autor3 = new Autor({
    nombre: "Darwin"
});
autor3.save().then(resultado => {
        console.log("Autor añadido:", resultado);
    }).catch(error => {
        console.log("ERROR añadiendo autor:", error);
});
// Inserción Autor4
let autor4 = new Autor({
    nombre: "Tomas de aquino"
});
autor4.save().then(resultado => {
        console.log("Autor añadido:", resultado);
    }).catch(error => {
        console.log("ERROR añadiendo autor:", error);
});
// Inserción Libro3
let libro3 = new Libro({
    título: "Cisne negro",
    editorial: "booket",
    precio: 13.95,
    //TODO: Meter id correcto
    autor: autor1.id
   });
libro3.save().then(resultado => {
        console.log("Libro añadido:", resultado);
    }).catch(error => {
        console.log("ERROR añadiendo libro:", error);
});
// Inserción Libro4
let libro4 = new Libro({
    título: "libro del conocimiento",
    editorial: "igualvalen",
    precio: 5.56,
   });
libro4.save().then(resultado => {
        console.log("Libro añadido:", resultado);
    }).catch(error => {
        console.log("ERROR añadiendo libro:", error);
});
// Inserción Libro4
let libro5 = new Libro({
    título: "La evolucioon",
    editorial: "darwinknowledge",
    precio: 5.56,
   });
libro5.save().then(resultado => {
        console.log("Libro añadido:", resultado);
    }).catch(error => {
        console.log("ERROR añadiendo libro:", error);
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
//Busqueda de libros 1
Libro.find({precio: {$gte: 10, $lte: 20}})
.then(resultado => {
 console.log('Resultado de la búsqueda:', resultado);
})
.catch(error => {
 console.log('ERROR:', error);
});

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

//Actualizar libro
Libro.findByIdAndUpdate(idLibro3, 
        { precio: 13.95 , $inc: {__v: 1}} , 
        {new:true})
   .then(resultado => {
        console.log("Libro modificado:", resultado);
   }).catch (error => {
        console.log("ERROR:", error);
   });

//Busqueda de libros 2
Libro.find({titulo, precio, id}).sort('precio').limit(3)
.then(resultado => {
 console.log('Resultado de la búsqueda:', resultado);
})
.catch(error => {
 console.log('ERROR:', error);
});

//Busqueda AVANZADA
    