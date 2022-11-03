module.exports = (express, Artista) => {

    let router = express.Router();

    // Servicio de listado
    router.get('/', (req, res) => {
        Artista.findAll().then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(500).send({ ok: false, error: "Error obteniendo artistas" });
        });
    });

    // Servicio de búsqueda por id
    router.get('/:id', (req, res) => {
        Artista.findByPk(req.params['id']).then(resultado => {
            if (resultado)
                res.status(200).send({ ok: true, resultado: resultado });
            else
                res.status(400).send({ ok: false, error: "Artista no encontrado" });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error buscando artista" });
        });
    });

    // Servicio de inserción
    router.post('/', (req, res) => {
        Artista.create({
            nombre: req.body.nombre,
            nacimiento: req.body.nacionalidad
        }).then(resultado => {
            if (resultado)
                res.status(200).send({ ok: true, resultado: resultado });
            else
                res.status(400).send({ ok: false, error: "Error insertando artista" });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error insertando artista" });
        });
    });

    // Servicio de modificación
    router.put('/:id', (req, res) => {
        Artista.findByPk(req.params['id']).then(artista => {
            if (artista)
                return artista.update({ nombre: req.body.nombre, nacionalidad: req.body.nacionalidad });
            else
                reject ("Error actualizando artista");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error actualizando artista" });            
        });
    });

    // Servicio de borrado
    router.delete('/:id', (req, res) => {
        Artista.findByPk(req.params['id']).then(artista => {
            if (artista)
                return artista.destroy();
            else
                reject ("Error borrando artista");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error borrando artista" });            
        });
    });

    return router;
}