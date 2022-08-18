const PdfPrinter = require('pdfmake');
const database = require('../models');
const moment = require("moment");
const puppeter = require('puppeteer');
const fs = require('fs');

class AulaController {

  static async listarAulas(req, res){
    try{
      const avaliacoes = await database.Aulas.findAll({
        
        include: [
          {
            model: database.Turmas,
            attributes: ['id','descricao']
          },
          {
            model: database.Funcionarios,
            attributes: ['id','nome']
          },
        ]
      });
      return res.status(200).json(avaliacoes);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  // static async listarAulaPorId(req, res){
  //   let id = req.params.id;
  //   try{
  //     const aula = await database.Aulas.findOne({ 
  //       where: 
  //       {
  //         id: Number(id)
  //       },
  //       include: {
  //         model: database.Turmas,
  //         attributes: ['descricao']
  //       }
  //     })
  //     return res.status(200).json(aula);
  //   }catch(err){
  //     return res.status(500).json(err.message);
  //   }
  // }

  static async listarAulasPorTurma(req, res){
    let { turmaId } = req.params;

    try{
      const aulas = await database.Aulas.findAll({ 
        where: 
        {
          idTurma: Number(turmaId)
        },
        include: {
          model: database.Turmas,
          attributes: ['id','descricao']
        }
      })
      return res.status(200).json(aulas);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAulaPorTurma(req, res){
    let { aulaId, turmaId } = req.params;

    try{
      const aula = await database.Aulas.findAll({ 
        where: 
        {
          id: Number(aulaId),
          idTurma: Number(turmaId),
        },
        include: [
          {
            model: database.Turmas,
            attributes: ['id','descricao']
          },
          {
            model: database.Funcionarios,
            attributes: ['id','nome']
          },
        ]
      })
      return res.status(200).json(aula);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarAulaTurma(req, res){
    const { turmaId } = req.params;
    const novaAula = { ...req.body, idTurma: Number(turmaId)}

    try{
      const aulaCriada = await database.Aulas.create(novaAula);
      return res.status(201).json(aulaCriada);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirAula(req, res){
    let { aulaId, turmaId } = req.params;
    try{
      await database.Aulas.destroy({ where: 
        {
          id: Number(aulaId),
          idTurma: Number(turmaId)
        }
      })
      return res.status(200).send({message: `Aula de Id ${aulaId} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarAula(req, res){
    const {turmaId, aulaId } = req.params;
    const infos = req.body;

    try{
      await database.Aulas.update(infos, { 
        where: {
          id: Number(aulaId),
          idTurma: Number(turmaId)
        }
      }
      );
      const aulaAtualizada = await database.Aulas.findOne(
        { 
          where: {
            id: Number(aulaId)
          },
        }
      );
      return res.status(200).json(aulaAtualizada);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async concluirAula(req, res){
    const {turmaId, aulaId } = req.params;
    

    try{
      await database.Aulas.update({concluida: true}, { 
        where: {
          id: Number(aulaId),
          idTurma: Number(turmaId)
        }
      }
      );
      const aulaConcluida = await database.Aulas.findOne(
        { 
          where: {
            id: Number(aulaId),
            idTurma: Number(turmaId)
          },
        }
      );
      return res.status(200).json(aulaConcluida);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAulasRelatorio(req, res){
    try{
      const turmaId = req.params.turmaId;

      const aulas = await database.Aulas.findAll({ 
        where: 
        {
          idTurma: Number(turmaId),
        },
        include: [
          {
            model: database.Turmas,
            attributes: ['id','descricao']
          },
          {
            model: database.Funcionarios,
            attributes: ['id','nome']
          }
        ]
      })

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
      
      const turma = aulas[0].Turma.descricao;

      for await(let aula of aulas){
        const rows = new Array();
        rows.push(aula.id);
        rows.push(aula.descricao);
        rows.push(aula.tipo);
        rows.push(moment(aula.data).format("DD/MM/YYYY"));
        rows.push(aula.planoAula);
        rows.push(aula.idFuncionario ? aula.Funcionario.nome : 'Não definido');
        body.push(rows);
      }

      const docDefinitions = {
        defaultStyle: {font: "Helvetica"},
        content: [
          {
            columns: [
              {text: "Relatório de Aulas", style: "header"},
              {text: moment().format("DD/MM/YYYY hh:mm:ss\n\n\n"), style: "dateRight"},
            ]
          },
          {
            text: ` `
          },
          {
            text: `Turma: ${turma}\n\n\n`
          },
          {
            table: {
              widths: ['auto', 100, 'auto', 'auto', 120, 80],
              body: [
                [
                  {text: "Id", style: 'tableHeader'},
                  {text: "Descrição", style: 'tableHeader'}, 
                  {text: "Tipo", style: 'tableHeader'}, 
                  {text: "Data", style: 'tableHeader'}, 
                  {text: "Observações", style: 'tableHeader'},
                  {text: "Professor", style: 'tableHeader'},
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
            fontSize: 11,
            color: 'black',
          },
          footer: {
            fontSize: 8,
            alignment: 'center',
          }
        }
      }
  
      const pdfDoc = printer.createPdfKitDocument(docDefinitions);
      
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

    }catch(err){
      console.log(`Falha na geração do relatório: ${err}`)
      return res.status(500).json(err.message);
      
    }
  }
}

module.exports = AulaController;
