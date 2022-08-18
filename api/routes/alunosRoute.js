const { Router } = require('express');
const AlunoController = require('../controllers/AlunoController');
const AuthMiddleware = require('../middlewares/authMiddleware')


const router = Router()
router
 .get('/alunos', AuthMiddleware, AlunoController.listarAlunos)
 .get('/alunos/:id', AuthMiddleware, AlunoController.listarAlunoPorId)
 .post('/alunos', AuthMiddleware, AlunoController.criarAluno)
 .put('/alunos/:id', AuthMiddleware, AlunoController.atualizarAluno)
 .delete('/alunos/:id', AuthMiddleware, AlunoController.excluirAluno)
 .get('/alunos/:alunoId/matricula/:matriculaId', AuthMiddleware, AlunoController.listarUmaMatricula)
 .get('/alunos/:alunoId/matricula/', AuthMiddleware, AlunoController.listarMatriculasDeAluno)
 .post('/alunos/:alunoId/matricula', AuthMiddleware, AlunoController.criarMatricula)
 .put('/alunos/:alunoId/matricula/:matriculaId', AuthMiddleware, AlunoController.atualizarMatricula)
 .delete('/alunos/:alunoId/matricula/:matriculaId', AuthMiddleware, AlunoController.excluirMatricula)
 .get('/alunos/matricula/turma/:turmaId', AuthMiddleware, AlunoController.listarMatriculasPorTurma)
 

module.exports = router