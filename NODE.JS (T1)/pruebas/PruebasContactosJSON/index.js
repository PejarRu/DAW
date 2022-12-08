const express = require('express');

let contactos = [
    {nombre: "Nacho", edad: 41, telefono: "611223344"},
    {nombre: "Ana", edad: 37, telefono: "699887766"},
    {nombre: "Juan", edad: 70, telefono: "965661564"},
    {nombre: "Fina", edad: 68, telefono: "965262861"},
    {nombre: "Enrique", edad: 12, telefono: "965262861"},
    {nombre: "Pepe", edad: 15, telefono: "966555555"}
   
]
let app = express() 

app.get('/contactos', (req, res) => { res.send(contactos)})
app.get('/contactos/telefono/:numero', (req, res) => { 
    let resultado = contactos.filter(
        contacto => contacto.telefono == req.params['numero']
    )       
    res.send(resultado)
})


app.listen(8081);
