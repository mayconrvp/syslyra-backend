const { Router } = require('express');
const EscolaController = require('../controllers/EscolaController');
const AuthMiddleware = require('../middlewares/authMiddleware')

const router = Router()
router
 .get('/escolas', AuthMiddleware, EscolaController.listarEscolas)
 .get('/escolas/:id', AuthMiddleware, EscolaController.listarEscolaPorId)
 .post('/escolas/', AuthMiddleware, EscolaController.criarEscola)
 .put('/escolas/:id', AuthMiddleware, EscolaController.atualizarEscola)
 .delete('/escolas/:id', AuthMiddleware, EscolaController.excluirEscola)
module.exports = router