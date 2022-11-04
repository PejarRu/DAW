const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/libros');

let contactoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        minlength: 3,
        //trim: true
    },
    editorial: {
        type: String,
        unique: true,
        //trim: true,
        match: /^\d{9}$/
    },
    precio: {
        required: true,
        type: Number,
        min: 0,
        //max: 120
    }
});

let Libro = mongoose.model('libros', contactoSchema);

let libro1 = new Libro({
    titulo: "Nacho",
    editorial: "966112233", 
    precio: 41
   });

libro1.save().then(resultado => {
    console.log("Libro añadido:", resultado);
}).catch(error => {
    libro1.log("ERROR añadiendo libro:", error);
});