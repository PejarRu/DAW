const express = require('express');
let app = express();

app.get('/', (req, res) => { res.send("Bienvenido/a")})

app.listen(8080);


/*
let atenderPeticion = (request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Bienvenido/a");
    response.end();
}
*/