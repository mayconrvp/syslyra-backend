const { Router } = require('express');
const CursoController = require('../controllers/CursoController');
const AuthMiddleware = require('../middlewares/authMiddleware')


const router = Router()
router
 .get('/cursos', AuthMiddleware, CursoController.listarCursos)
 .get('/cursos/:id', AuthMiddleware, CursoController.listarCursoPorId)
 .post('/cursos', AuthMiddleware, CursoController.criarCurso)
 .put('/cursos/:id', AuthMiddleware, CursoController.atualizarCurso)
 .delete('/cursos/:id', AuthMiddleware, CursoController.excluirCurso)
module.exports = router

