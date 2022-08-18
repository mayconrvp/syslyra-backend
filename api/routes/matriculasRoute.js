const { Router } = require('express');
const MatriculaController = require('../controllers/MatriculaController');

const router = Router()
router
 .get('/matriculas', MatriculaController.listarMatriculas)
 .get('/matriculas/:id', MatriculaController.listarMatriculaPorId)
 .post('/matriculas', MatriculaController.criarMatricula)
 .put('/matriculas/:id', MatriculaController.atualizarMatricula)
 .delete('/matriculas/:id', MatriculaController.excluirMatricula)
module.exports = router