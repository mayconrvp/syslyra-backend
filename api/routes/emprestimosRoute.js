const { Router } = require('express');
const EmprestimoController = require('../controllers/EmprestimoController');
const AuthMiddleware = require('../middlewares/authMiddleware')

const router = Router()
router
.get('/emprestimos', AuthMiddleware, EmprestimoController.listarEmprestimos)
.get('/emprestimos/data/rel/:dataIni/:dataFim/', EmprestimoController.listarEmprestimosPorDataRelatorio)
.get('/emprestimos/aluno/rel/:id/', EmprestimoController.listarEmprestimoPorAlunoRelatorio)
.get('/emprestimos/rel', EmprestimoController.listarEmprestimosRelatorio)
.get('/pdf/emprestimos/', AuthMiddleware, EmprestimoController.criarPdf)
.get('/emprestimos/dataIni/:dataIni/dataFim/:dataFim', AuthMiddleware, EmprestimoController.listarEmprestimosPorData)
 .get('/emprestimos/:id', AuthMiddleware, EmprestimoController.listarEmprestimoPorId)
 .post('/emprestimos', AuthMiddleware, EmprestimoController.criarEmprestimo)
 .put('/emprestimos/:id', AuthMiddleware, EmprestimoController.atualizarEmprestimo)
 .delete('/emprestimos/:id', AuthMiddleware, EmprestimoController.excluirEmprestimo)
module.exports = router