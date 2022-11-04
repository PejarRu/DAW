const express = require('express');
const moment = require('moment');
const os = require('os');


let app = express();


app.get('/fecha', (req, res) => {

    res.send("Estamos a " + moment().format("d/M/Y - HH:mm"));

});
app.get('/usuario', (req, res) => {

    res.send("Hola " + os.userInfo().username);

});

app.listen(8081);