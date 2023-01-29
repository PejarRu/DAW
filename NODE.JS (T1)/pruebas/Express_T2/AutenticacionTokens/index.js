/*
    Ejemplo de autenticación basada en tokens, usando el módulo "jsonwebtoken".
    Definimos una palabra secreta para encriptar los tokens, y un array de usuarios
    registrados para simular una base de datos.

    El middleware "protegerRuta" se aplica a cada servicio con acceso restringido
*/

// Cargamos librerías
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Palabra secreta para cifrar los tokens
const secreto = "secretoNode";

// Base de datos simulada de usuarios registrados
const usuarios = [
    { usuario: 'nacho', password: '12345', rol: 'admin' },
    { usuario: 'pepe', password: 'pepe111', rol: 'normal' }
];

// Método para generar el token cuando el usuario se valide correctamente
let generarToken = (login, rol) => {
    return jwt.sign({login: login, rol: rol}, secreto, {expiresIn: "2 hours"});
};

// Método para validar un token que llega de un usuario presuntamente validado
let validarToken = (token) => {
    try {
        let resultado = jwt.verify(token, secreto);
        return resultado;
    } catch (e) {}
};

// Middleware a aplicar a cada recurso protegido, para dejar pasar sólo a los usuarios
// validados que tengan el rol indicado (cadena vacía para no necesitar ningún rol)
let protegerRuta = rol => {
    return (req, res, next) => {
    let token = req.headers['authorization'];
    if (token) {
        token = token.substring(7);
        let resultado = validarToken(token);
        if (resultado && (rol === "" || rol === resultado.rol))
            next();
        else
            res.send({ok: false, error: "Usuario no autorizado"});        
    } else 
        res.send({ok: false, error: "Usuario no autorizado"});        
}};

let app = express();

app.use(bodyParser.json());

// Ruta de acceso público
app.get('/', (req, res) => {
    res.send({ok: true, resultado: "Bienvenido a la ruta de inicio"});
});

// Ruta de acceso protegido (sólo usuarios validados)
app.get('/protegido', protegerRuta(""), (req, res) => {
    res.send({ok: true, resultado: "Bienvenido a la zona protegida"});
});

// Ruta de acceso protegido con rol (sólo usuarios validados con rol 'admin')
app.get('/protegidoAdmin', protegerRuta("admin"), (req, res) => {
    res.send({ok: true, resultado: "Bienvenido a la zona protegida para administradores"});
});

// Ruta para hacer el login y recibir el token de acceso
app.post('/login', (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;

    let existeUsuario = usuarios.filter(u => 
        u.usuario == usuario && u.password == password);

    if (existeUsuario.length == 1)
        res.send({ok: true, token: generarToken(existeUsuario[0].usuario, existeUsuario[0].rol)});
    else
        res.send({ok: false});
});

app.listen(8080);