const PdfPrinter = require('pdfmake');
const database = require('../models');
const moment = require("moment");

class AlunoController {

  static async listarAlunos(req, res){
    try{
      const alunos = await database.Alunos.findAll({
        include: [
          {
            model: database.Enderecos,
            attributes: ['logradouro', 'numero', 'bairro', 'cep', 'complemento', 'cidade'],
            include: [{
              model: database.Estados,
              attributes: ['id', 'uf', 'nome']
            }]
          },
          {
            model: database.Escolas,
            attributes: ['nome']
          },
          {
            model: database.Responsaveis,
            attributes: ['responsavel', 'telefone', 'email']
          }
        ]
      });
      return res.status(200).json(alunos);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAlunoPorId(req, res){
    let id = req.params.id;
    try{
      const aluno = await database.Alunos.findOne(
        { 
          where: {
            id: Number(id)
          },
          include: [
            {
              model: database.Enderecos,
              attributes: ['logradouro', 'numero', 'bairro', 'cep', 'complemento', 'cidade'],
              include: [{
                model: database.Estados,
                attributes: ['id', 'uf', 'nome']
              }]
            },
            {
              model: database.Escolas,
              attributes: ['nome']
            },
            {
              model: database.Responsaveis,
              attributes: ['responsavel', 'telefone', 'email']
            }
          ]
        }
      );
      return res.status(200).json(aluno);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirAluno(req, res){
    let id = req.params.id;
    try{
      const aluno = await database.Alunos.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `aluno de Id ${id} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarAluno(req, res){
    const novoAluno = req.body;
    try{
      const aluno = await database.Alunos.create(novoAluno);
      return res.status(201).json(aluno);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarAluno(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Alunos.update(infos, 
        { where: {id: Number(id)}}
      );
      const alunoAtualizado = await database.Alunos.findOne(
        { 
          where: {
            id: Number(id)
          },
          include: [
            {
              model: database.Enderecos,
              attributes: ['logradouro', 'numero', 'bairro', 'cep', 'complemento', 'cidade'],
            },
            {
              model: database.Escolas,
              attributes: ['nome']
            },
            {
              model: database.Responsaveis,
              attributes: ['responsavel']
            }
          ]
        }
      );
      return res.status(200).json(alunoAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  // -------------------------- CONTROLADORES DE MATRICULAS DE ALUNOS --------------------------

  static async listarUmaMatricula(req, res){
    let { alunoId, matriculaId } = req.params;
    try{
      const matricula = await database.Matriculas.findOne(
        { 
          where: {
            id: Number(matriculaId),
            idAluno: Number(alunoId)
          },
          include: [
            {
              model: database.Alunos,
              attributes: ['nome']
            },
            {
              model: database.Turmas,
              attributes: ['id', 'descricao']
            }
          ]
        }
      );
      return res.status(200).json(matricula);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarMatriculasDeAluno(req, res){
    let { alunoId } = req.params;
    try{
      const matricula = await database.Matriculas.findAll(
        { 
          where: {
            idAluno: Number(alunoId)
          },
          include: [
            {
              model: database.Alunos,
              attributes: ['nome']
            },
            {
              model: database.Turmas,
              attributes: ['id', 'descricao']
            }
          ]
        }
      );
      return res.status(200).json(matricula);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarMatricula(req, res){
    const { alunoId } = req.params;
    const novaMatricula = { ...req.body, idAluno: Number(alunoId)}

    try{
      const matriculaCriada = await database.Matriculas.create(novaMatricula);
      return res.status(201).json(matriculaCriada);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarMatricula(req, res){
    const {alunoId, matriculaId } = req.params;
    const infos = req.body;

    try{
      await database.Matriculas.update(infos, { 
        where: {
          id: Number(matriculaId),
          idAluno: Number(alunoId)
        }
      }
      );
      const matriculaAtualizada = await database.Matriculas.findOne(
        { 
          where: {
            id: Number(matriculaId)
          },
        }
      );
      return res.status(200).json(matriculaAtualizada);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirMatricula(req, res){
    let { matriculaId } = req.params;
    try{
      await database.Matriculas.destroy({ where: 
        {
          id: Number(matriculaId),
        
        }
      })
      return res.status(200).send({message: `Matricula de Id ${matriculaId} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarMatriculasPorTurma(req,res){
    let { turmaId } = req.params;
    try{
      const matriculas = await database.Matriculas.findAll(
        { 
          where: {
            idTurma: Number(turmaId)
          },
          include: [
            {
              model: database.Alunos,
              attributes: ['nome']
            },
            {
              model: database.Turmas,
              attributes: ['id', 'descricao']
            }
          ]
        }
      );
      return res.status(200).json(matriculas);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAlunosRelatorio(req, res){
    console.log("Entrei aqui")
    try{
      const alunos = await database.Alunos.findAll({
        include: [
          {
            model: database.Enderecos,
            attributes: ['logradouro', 'numero', 'bairro', 'cep', 'complemento', 'cidade'],
            include: [{
              model: database.Estados,
              attributes: ['id', 'uf', 'nome']
            }]
          },
          {
            model: database.Escolas,
            attributes: ['nome']
          },
          {
            model: database.Responsaveis,
            attributes: ['responsavel', 'telefone', 'email']
          }
        ]
      });

      const fonts = {
        Helvetica: {
          normal: "Helvetica",
          bold: "Helvetica-Bold",
          italics: "Helvetica-Oblique",
          bolditalics: "Helvetica-BoldOblique"
        }
      };
      const printer = new PdfPrinter(fonts);

      const body = [];
  
      for await(let aluno of alunos){
        const rows = new Array();
        rows.push(aluno.id);
        rows.push(aluno.nome);
        rows.push(aluno.telefone);
        rows.push(aluno.email);
        rows.push(aluno.turno);
        rows.push(aluno.idResponsavel ? aluno.Responsavei.responsavel : '');
        body.push(rows);
      }

      const docDefinitions = {
        defaultStyle: {
          fontSize: 10,
          font: "Helvetica"
        },
        content: [
          {
            columns: [
              {text: "Listagem Geral de Alunos", style: "header"},
              {text: moment().format("DD/MM/YYYY hh:mm:ss\n\n"), style: "dateRight"},
            ]
          },
          {
            text: " "
          },
          {
            table: {
              widths: ['auto', 'auto', 100, 'auto', 'auto', 'auto'],
              body: [
                [
                  {text: "Id", style: 'tableHeader'},
                  {text: "Nome", style: 'tableHeader'}, 
                  {text: "Telefone", style: 'tableHeader'}, 
                  {text: "Email", style: 'tableHeader'}, 
                  {text: "Turno", style: 'tableHeader'},
                  {text: "Responsável", style: 'tableHeader'}
                ], 
                  ...body
              ]
            },
            layout: 'lightHorizontalLines',
          },
        ],
        footer: [{text: "Relatório SysLyra", style: "footer"}],
        styles: {
          header: {
            fontSize: 12,
            bold: true
          },
          dateRight: {
            alignment: 'right'
          },
          tableHeader: {
            bold: true,
            fontSize: 10,
            color: 'black',
          },
          footer: {
            fontSize: 8,
            alignment: 'center',
          }
        }
      }
  
      const pdfDoc = printer.createPdfKitDocument(docDefinitions);
      //pdfDoc.pipe(fs.createWriteStream("Relatório.pdf"));
      
      const chunks = [];
      
      pdfDoc.on("data", (chunk)=> {
        chunks.push(chunk);
      })

      pdfDoc.end();

      pdfDoc.on("end", () => {
        const result = Buffer.concat(chunks);
        res.contentType("application/pdf");
        res.end(result);
      })
     
      //return res.send("Relatório Concluido")
  
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = AlunoController;
