const bodyParser = require('body-parser');

//import PdfPrinter from 'pdfmake';

const cursos = require('./cursosRoute');

const avaliacoes = require('./avaliacoesRoute');
const instrumentos = require('./instrumentosRoute');
const funcionarios = require('./funcionariosRoute');
const usuarios = require('./usuariosRoute');
const escolas = require('./escolasRoute');
const responsaveis = require('./responsaveisRoute');
const enderecos = require('./enderecosRoute');
const turmas = require('./turmasRoute');
const alunos = require('./alunosRoute');
const emprestimos = require('./emprestimosRoute');
const aulas = require('./aulasRoute')
const aulasMatriculas = require('./aulasMatriculasRoute')
const estados = require('./estadosRoute')
const login = require('./loginRoute')


module.exports = app => {
  app.use(
    bodyParser.json(),
    login,
    avaliacoes,
    instrumentos,
    funcionarios,
    usuarios,
    cursos,
    escolas,
    responsaveis,
    enderecos,
    turmas,
    alunos,
    emprestimos,
    aulas,
    aulasMatriculas,
    estados
  )
}