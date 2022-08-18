const { Router } = require('express');
const AulasMatriculasController = require('../controllers/AulasMatriculasController');

const router = Router()
router
 .get('/aulas/:aulaId/matricula/:matriculaId', AulasMatriculasController.listarAulaMatricula)
 .post('/aulas/:aulaId/matricula/', AulasMatriculasController.criarAulaMatricula)
 .put('/aulas/:aulaId/matricula/:matriculaId', AulasMatriculasController.atualizarAulaMatricula)
 .delete('/aulas/:aulaId/matricula/:matriculaId', AulasMatriculasController.excluirAulaMatricula)
module.exports = router

