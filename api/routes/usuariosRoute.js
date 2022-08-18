const { Router } = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const AuthMiddleware = require('../middlewares/authMiddleware')

const router = Router()
router
 .get('/usuarios', AuthMiddleware, UsuarioController.listarUsuarios)
 .get('/usuarios/:id',AuthMiddleware, UsuarioController.listarUsuarioPorId)
 .post('/usuarios', AuthMiddleware,  UsuarioController.criarUsuario)
 .put('/usuarios/:id', AuthMiddleware, UsuarioController.atualizarUsuario)
 .delete('/usuarios/:id', AuthMiddleware, UsuarioController.excluirUsuario)
module.exports = router