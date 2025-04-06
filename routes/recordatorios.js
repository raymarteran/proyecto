const express = require('express');
const router = express.Router();
const RecordatorioController = require('../controllers/recordatorioController.js');

const recordatorioController = new RecordatorioController();

// Obtener todos los recordatorios
router.get('/', (req, res, next) => {
    recordatorioController.getRecordatorios(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

// Obtener recordatorios próximos (próximos 7 días)
router.get('/proximos', (req, res, next) => {
    recordatorioController.getRecordatoriosProximos(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

// Crear un nuevo recordatorio
router.post('/', (req, res, next) => {
    recordatorioController.postRecordatorio(req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

// Eliminar un recordatorio
router.delete('/:id', (req, res, next) => {
    recordatorioController.deleteRecordatorio(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

// Obtener un recordatorio por ID
router.get('/:id', (req, res, next) => {
    recordatorioController.getRecordatorioById(req.params.id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

// Actualizar un recordatorio
router.put('/:id', (req, res, next) => {
    recordatorioController.putRecordatorio(req.params.id, req.body)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

module.exports = router;