const express = require('express');
const router = express.Router();
const ComentarioController = require('../controllers/comentarioController.js');

const comentarioController = new ComentarioController();

// Obtener todos los comentarios de una actividad específica
router.get('/actividad/:idActividad', (req, res, next) => {
    comentarioController.getComentariosByActividad(req.params.idActividad)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

// Crear un nuevo comentario
router.post('/', (req, res, next) => {
    comentarioController.postComentario(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

// Eliminar un comentario
router.delete('/:id', (req, res, next) => {
    comentarioController.deleteComentario(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

// Actualizar un comentario
router.put('/:id', (req, res, next) => {
    comentarioController.putComentario(req.params.id, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;