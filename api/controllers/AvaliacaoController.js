const PdfPrinter = require('pdfmake');
const database = require('../models');
const moment = require("moment");
const puppeter = require('puppeteer');
const fs = require('fs');
class AvaliacaoController {

  static async listarAvaliacoes(req, res){
    try{
      const avaliacoes = await database.Avaliacoes.findAll({
        include: [
          {
            model: database.Turmas,
            attributes: ['descricao']
          },
        ]
      });
      return res.status(200).json(avaliacoes);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAvaliacaoPorId(req, res){
    let id = req.params.id;
    try{
      const avaliacao = await database.Avaliacoes.findOne({ where: {id: Number(id)}})
      return res.status(200).json(avaliacao);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirAvaliacao(req, res){
    let id = req.params.id;
    try{
      const avaliacao = await database.Avaliacoes.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `Avaliação de Id ${id} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarAvaliacao(req, res){
    const novaAvaliacao = req.body;
    try{
      const avaliacao = await database.Avaliacoes.create(novaAvaliacao);
      return res.status(201).json(avaliacao);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarAvaliacao(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Avaliacoes.update(infos, 
        { where: {id: Number(id)}}
      );
      const avaliacaoAtualizada = await database.Avaliacoes.findOne({ where: {id: Number(id)}})
      return res.status(200).json(avaliacaoAtualizada);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAvaliacoesPorTurma(req, res){
    const turmaId = req.params.turmaId;
    try{
      const avaliacoes = await database.Avaliacoes.findAll({ 
        where: 
        {
          idTurma: Number(turmaId),
        },
        include: [
          {
            model: database.Turmas,
            attributes: ['descricao']
          },
        ]
      })
      return res.status(200).json(avaliacoes);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarAvaliacoesRelatorio(req, res){
    try{
      const turmaId = req.params.turmaId;

      const avaliacoes = await database.Avaliacoes.findAll({
        where: 
        {
          idTurma: Number(turmaId),
        },
        include: [
          {
            model: database.Turmas,
            attributes: ['descricao']
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
  
      for await(let avaliacao of avaliacoes){
        const rows = new Array();
        rows.push(avaliacao.id);
        rows.push(avaliacao.descricao);
        rows.push(avaliacao.pontuacao);
        rows.push(avaliacao.Turma.descricao);
        rows.push(moment(avaliacao.createdAt).format("DD/MM/YYYY"));
        body.push(rows);
      }

      const docDefinitions = {
        defaultStyle: {font: "Helvetica"},
        content: [
          {
            columns: [
              {text: "Relatório de Avaliações", style: "header"},
              {text: moment().format("DD/MM/YYYY hh:mm:ss\n\n"), style: "dateRight"},
            ]
          },
          {
            text: " "
          },
          {
            table: {
              body: [
                [
                  {text: "Id", style: 'tableHeader'},
                  {text: "Avaliação", style: 'tableHeader'}, 
                  {text: "Pontuação", style: 'tableHeader'}, 
                  {text: "Turma", style: 'tableHeader'}, 
                  {text: "Data de criação", style: 'tableHeader'}], 
                  ...body
              ]
            },
            layout: 'lightHorizontalLines',
          },
        ],
        footer: [{text: "Relatório SysLyra", style: "footer"}],
        styles: {
          header: {
            fontSize: 14,
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
      return res.status(500).json(err.message);
    }
  }
}

module.exports = AvaliacaoController;
