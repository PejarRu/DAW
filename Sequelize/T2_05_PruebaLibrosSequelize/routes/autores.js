module.exports = (express, Autor) => {

    let router = express.Router();

    // Servicio de listado
    router.get('/', (req, res) => { 
        Autor.findAll().then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(500).send({ ok: false, error: "Error obteniendo autores" });
        });
    });

    // Servicio de búsqueda por id
    router.get('/:id', (req, res) => {
        Autor.findByPk(req.params['id']).then(resultado => {
            if (resultado)
                res.status(200).send({ ok: true, resultado: resultado });
            else
                res.status(400).send({ ok: false, error: "Autor no encontrado" });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error buscando autor" });
        });
    });

    // Servicio de inserción
    router.post('/', (req, res) => {
        Autor.create({
            nombre: req.body.nombre,
            nacimiento: req.body.nacimiento
        }).then(resultado => {
            if (resultado)
                res.status(200).send({ ok: true, resultado: resultado });
            else
                res.status(400).send({ ok: false, error: "Error insertando autor" });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error insertando autor" });
        });
    });

    // Servicio de modificación
    router.put('/:id', (req, res) => {
        Autor.findByPk(req.params['id']).then(autor => {
            if (autor)
                return autor.update({ nombre: req.body.nombre, nacimiento: req.body.nacimiento });
            else
                reject ("Error actualizando autor");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error actualizando autor" });            
        });
    });

    // Servicio de borrado
    router.delete('/:id', (req, res) => {
        Autor.findByPk(req.params['id']).then(autor => {
            if (autor)
                return autor.destroy();
            else
                reject ("Error borrando autor");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error borrando autor" });            
        });
    });

    return router;
}