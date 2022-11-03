module.exports = (express, Cancion, Artista) => {

    let router = express.Router();

    let nuevaCancion = async (titulo, duracion, album, idArtista) => {
        try
        {
            let cancion = await Cancion.create({titulo: titulo, duracion: duracion, album: album});
            let artista = await Artista.findByPk(idArtista);
            let resultado = await cancion.setArtista(artista);
            return resultado;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    // Servicio de listado
    router.get('/', (req, res) => {
        Cancion.findAll().then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(500).send({ ok: false, error: "Error obteniendo canciones" });
        });
    });

    // Servicio de búsqueda por id
    router.get('/:id', (req, res) => {
        Cancion.findByPk(req.params['id']).then(resultado => {
            if (resultado) {
                resultado.getArtista().then(artista => {
                    res.status(200).send({ ok: true, resultado: resultado, artista: artista });
                });
            }
            else
                res.status(400).send({ ok: false, error: "Cancion no encontrada" });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error buscando cancion" });
        });
    });

    // Servicio de inserción
    router.post('/', (req, res) => {
        nuevaCancion(req.body.titulo, req.body.duracion, req.body.album, req.body.artista)
        .then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        })
        .catch (error => {
            res.status(400).send({ ok: false, error: "Error añadiendo cancion" });
        });
    });

    // Servicio de modificación
    router.put('/:id', (req, res) => {
        Cancion.findByPk(req.params['id']).then(cancion => {
            if (cancion)
                return cancion.update({ titulo: req.body.titulo, duracion: req.body.duracion, album: req.body.album, artista: req.body.artista });
            else
                reject ("Error actualizando cancion");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error actualizando cancion" });            
        });
    });
    
    // Servicio de borrado
    router.delete('/:id', (req, res) => {
        Cancion.findByPk(req.params['id']).then(cancion => {
            if (cancion)
                return cancion.destroy();
            else
                reject ("Error borrando cancion");
        }).then(resultado => {
            res.status(200).send({ ok: true, resultado: resultado });
        }).catch(error => {
            res.status(400).send({ ok: false, error: "Error borrando cancion" });            
        });
    });

    return router;
}