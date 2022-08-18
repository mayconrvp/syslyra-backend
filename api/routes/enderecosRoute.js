const { Router } = require('express');
const EnderecoController = require('../controllers/EnderecoController');
const AuthMiddleware = require('../middlewares/authMiddleware');

const router = Router()
router
 .get('/enderecos', AuthMiddleware, EnderecoController.listarEnderecos)
 .get('/enderecos/:id', AuthMiddleware, EnderecoController.listarEnderecoPorId)
 .post('/enderecos/:idAluno', AuthMiddleware, EnderecoController.criarEndereco)
 .put('/enderecos/:id', AuthMiddleware, EnderecoController.atualizarEndereco)
 .delete('/enderecos/:id', AuthMiddleware, EnderecoController.excluirEndereco)
module.exports = router