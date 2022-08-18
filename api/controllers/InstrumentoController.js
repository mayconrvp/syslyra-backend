const PdfPrinter = require('pdfmake');
const database = require('../models');
const moment = require("moment");


const { Op } = require("sequelize");

class InstrumentoController {

  static async listarInstrumentos(req, res){
    try{
      const instrumentos = await database.Instrumentos.findAll();
      return res.status(200).json(instrumentos);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarInstrumentosParaEmprestimo(req, res){
    try{
      const instrumentos = await database.Instrumentos.findAll({
        where: {
          emprestado: {
            [Op.or]: [0, null]
          }
        }
      });
      return res.status(200).json(instrumentos);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarInstrumentoPorId(req, res){
    let id = req.params.id;
    try{
      const instrumento = await database.Instrumentos.findOne(
      { 
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json(instrumento);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirInstrumento(req, res){
    let id = req.params.id;
    try{
      const instrumento = await database.Instrumentos.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `instrumento de Id ${id} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarInstrumento(req, res){
    const novoInstrumento = req.body;
    try{
      const instrumento = await database.Instrumentos.create(novoInstrumento);
      return res.status(201).json(instrumento);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarInstrumento(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Instrumentos.update(infos, 
        { where: {id: Number(id)}}
      );
      const instrumentoAtualizado = await database.Instrumentos.findOne({ where: {id: Number(id)}}, {
        include: {
          model: database.Estados, 
          attributes: ['nome','uf']
        }
      })
      return res.status(200).json(instrumentoAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarInstrumentosRelatorio(req, res){
    try{
      const instrumentos = await database.Instrumentos.findAll();

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
  
      for await(let instrumento of instrumentos){
        const rows = new Array();
        rows.push(instrumento.id);
        rows.push(instrumento.descricao);
        rows.push(instrumento.modelo);
        rows.push(instrumento.marca);
        rows.push(instrumento.numeroSerie);
        body.push(rows);
      }

      const docDefinitions = {
        defaultStyle: {font: "Helvetica"},
        content: [
          {
            columns: [
              {text: "Relatório de Instrumentos", style: "header"},
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
                  {text: "Descrição", style: 'tableHeader'}, 
                  {text: "Modelo", style: 'tableHeader'}, 
                  {text: "Marca", style: 'tableHeader'}, 
                  {text: "Número de Série", style: 'tableHeader'}], 
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

module.exports = InstrumentoController;
