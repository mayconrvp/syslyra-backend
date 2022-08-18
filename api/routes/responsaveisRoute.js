const { Router } = require('express');
const ResponsavelController = require('../controllers/ResponsavelController');
const AuthMiddleware = require('../middlewares/authMiddleware')

const router = Router()
router
 .get('/responsaveis', AuthMiddleware, ResponsavelController.listarResponsaveis)
 .get('/responsaveis/:id', AuthMiddleware, ResponsavelController.listarResponsavelPorId)
 .post('/responsaveis/:idAluno', AuthMiddleware, ResponsavelController.criarResponsavel)
 .put('/responsaveis/:id', AuthMiddleware, ResponsavelController.atualizarResponsavel)
 .delete('/responsaveis/:id', AuthMiddleware, ResponsavelController.excluirResponsavel)
module.exports = router