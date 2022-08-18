const { Router } = require('express');
const AulaController = require('../controllers/AulaController');
const AuthMiddleware = require('../middlewares/authMiddleware')

const router = Router()
router
 .get('/aulas', AulaController.listarAulas)
 //.get('/aulas/:id', AulaController.listarAulaPorId)
 
 .put('/aulas/:aulaId/turma/:turmaId', AuthMiddleware, AulaController.atualizarAula)
 .get('/aulas/close/:aulaId/turma/:turmaId', AuthMiddleware, AulaController.concluirAula)
 .delete('/aulas/:aulaId/turma/:turmaId', AuthMiddleware, AulaController.excluirAula)
 .get('/aulas/turma/:turmaId', AuthMiddleware, AulaController.listarAulasPorTurma)
 .get('/aulas/:aulaId/turma/:turmaId', AuthMiddleware, AulaController.listarAulaPorTurma)
 .get('/aulas/rel/:turmaId', AulaController.listarAulasRelatorio)
 .post('/aulas/turma/:turmaId', AuthMiddleware, AulaController.criarAulaTurma)


 
module.exports = router