module.exports = (express, Libro, Autor) => {

    let router = express.Router();

    let nuevoLibro = async (titulo, editorial, idAutor) => {
        try
        {
            let libro = await Libro.create({titulo: titulo, editorial: editorial});
            let autor = await Autor.findByPk(idAutor);
            let resultado = await libro.setAutor(autor);
            return resultado;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    // Servicio de listado
    router.get('/', (req, res) => {
        Libro.findAll().then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(500).send({ ok: false, error: "Error obteniendo libros" });
        });
    });

    // Servicio de búsqueda por id
    router.get('/:id', (req, res) => {
        Libro.findByPk(req.params['id']).then(resultado => {
            if (resultado) {
                resultado.getAutor().then(autor => {
                    res.status(200).send({ ok: true, resultado: resultado, autor: autor });
                });
            }
            else
                res.status(400).send({ ok: false, error: "Libro no encontrado" });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error buscando libro" });
        });
    });

    // Servicio de inserción
    router.post('/', (req, res) => {
        nuevoLibro(req.body.titulo, req.body.editorial, req.body.autor)
        .then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        })
        .catch (error => {
            res.status(400).send({ ok: false, error: "Error añadiendo libro" });
        });
    });

    // Servicio de modificación
    router.put('/:id', (req, res) => {
        Libro.findByPk(req.params['id']).then(libro => {
            if (libro)
                return libro.update({ titulo: req.body.titulo, editorial: req.body.editorial });
            else
                reject ("Error actualizando libro");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error actualizando libro" });            
        });
    });
    
    // Servicio de borrado
    router.delete('/:id', (req, res) => {
        Libro.findByPk(req.params['id']).then(libro => {
            if (libro)
                return libro.destroy();
            else
                reject ("Error borrando libro");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error borrando libro" });            
        });
    });

    return router;
}