const { Router } = require('express');
const EstadoController = require('../controllers/EstadoController');

const router = Router()
router
 .get('/estados', EstadoController.listarEstados)
 .get('/estados/:id', EstadoController.listarEstadoPorId)
 .put('/estados/:id', EstadoController.atualizarEstado)
module.exports = router