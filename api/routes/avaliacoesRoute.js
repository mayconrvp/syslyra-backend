const { Router } = require('express');
const AvaliacaoController = require('../controllers/AvaliacaoController');

const router = Router()
router
 .get('/avaliacoes', AvaliacaoController.listarAvaliacoes)
 .get('/avaliacoes/rel/:turmaId', AvaliacaoController.listarAvaliacoesRelatorio)
 .get('/avaliacoes/:id', AvaliacaoController.listarAvaliacaoPorId)
 .post('/avaliacoes', AvaliacaoController.criarAvaliacao)
 .put('/avaliacoes/:id', AvaliacaoController.atualizarAvaliacao)
 .delete('/avaliacoes/:id', AvaliacaoController.excluirAvaliacao)
 .get('/avaliacoes/turma/:turmaId', AvaliacaoController.listarAvaliacoesPorTurma)

module.exports = router