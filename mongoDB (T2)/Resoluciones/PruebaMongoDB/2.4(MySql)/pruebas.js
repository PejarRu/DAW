const mysql = require('mysql');

let conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contactos"
});

conexion.connect((error) => {
    if (error)
        console.log("Error al conectar con la BD:", err);
    else
        console.log("Conexión satisfactoria");
});

conexion.query("SELECT * FROM contactos", (error, resultado, campos) => {
    if (error)
        console.log("Error al procesar la consulta");
    else {
        resultado.forEach((contacto) => console.log(contacto.nombre, ":", contacto.telefono));
    }
});

conexion.query("INSERT INTO contactos (nombre, telefono) VALUES ('Fernando', '966566556')", (error, resultado, campos) => {
    if (error)
        console.log("Error al procesar la inserción");
    else
        console.log("Inserción realizada. Nuevo id = ", resultado.insertId);
});

conexion.query("INSERT INTO contactos SET ?", {nombre: 'Nacho C.', telefono: '965771111'}, (error, resultado, campos) => {
    if (error)
        console.log("Error al procesar la inserción");
    else
        console.log("Inserción realizada. Nuevo id = ", resultado.insertId);
});

conexion.query("DELETE FROM contactos WHERE id = 4", (error, resultado, campos) => {
    if (error)
        console.log("Error al realizar el borrado");
    else
        console.log("Borrado realizado.", resultado.affectedRows, "filas afectadas");
});