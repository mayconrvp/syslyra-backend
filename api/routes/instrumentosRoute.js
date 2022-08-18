const { Router } = require('express');
const InstrumentoController = require('../controllers/InstrumentoController');
const AuthMiddleware = require('../middlewares/authMiddleware')

const router = Router()
router
 .get('/instrumentos', AuthMiddleware, InstrumentoController.listarInstrumentos)
 .get('/instrumentos/disp', AuthMiddleware, InstrumentoController.listarInstrumentosParaEmprestimo)
 .get('/instrumentos/rel', InstrumentoController.listarInstrumentosRelatorio)
 .get('/instrumentos/:id', AuthMiddleware, InstrumentoController.listarInstrumentoPorId)
 .post('/instrumentos', AuthMiddleware, InstrumentoController.criarInstrumento)
 .put('/instrumentos/:id', AuthMiddleware, InstrumentoController.atualizarInstrumento)
 .delete('/instrumentos/:id', AuthMiddleware, InstrumentoController.excluirInstrumento)
module.exports = router