const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController');
const AuthMiddleware = require('../middlewares/authMiddleware')

const router = Router()
router
 .get('/turmas', AuthMiddleware, TurmaController.listarTurmas)
 .get('/turmas/:id', AuthMiddleware, TurmaController.listarTurmaPorId)
 .post('/turmas', AuthMiddleware, TurmaController.criarTurma)
 .put('/turmas/:id', AuthMiddleware, TurmaController.atualizarTurma)
 .get('/turmas/close/:id', AuthMiddleware, TurmaController.finalizarTurma)
 .delete('/turmas/:id', AuthMiddleware, TurmaController.excluirTurma)
module.exports = router