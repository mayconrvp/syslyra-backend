const { Router } = require('express');
const FuncionarioController = require('../controllers/FuncionarioController');
const AuthMiddleware = require('../middlewares/authMiddleware')


const router = Router()
router
 .get('/funcionarios', AuthMiddleware, FuncionarioController.listarFuncionarios)
 .get('/funcionarios/:id', AuthMiddleware, FuncionarioController.listarFuncionarioPorId)
 .get('/funcionarios/cg/:cargo', AuthMiddleware, FuncionarioController.listarFuncionariosPorCargo)
 .post('/funcionarios', AuthMiddleware, FuncionarioController.criarFuncionario)
 .put('/funcionarios/:id', AuthMiddleware, FuncionarioController.atualizarFuncionario)
 .delete('/funcionarios/:id', AuthMiddleware, FuncionarioController.excluirFuncionario)
module.exports = router