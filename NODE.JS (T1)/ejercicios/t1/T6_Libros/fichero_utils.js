const fs = require('fs')

let cargarLibros = () => {
    let libros = [];
    if (fs.existsSync('libros.json'))
        libros = JSON.parse(fs.readFileSync('libros.json', 'utf8'));
        return libros;
    };
let guardarLibros = (libros) => {
    fs.writeFileSync('libros.json', JSON.stringify(libros));
};

module.exports = {
    cargarLibros: cargarLibros,
    guardarLibros: guardarLibros,
    libros: this.libros
}
