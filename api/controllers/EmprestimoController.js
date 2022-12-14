const PdfPrinter = require('pdfmake');
const database = require('../models');
const moment = require("moment");
const puppeter = require('puppeteer');
const fs = require('fs');
const { Op } = require('sequelize');

class EmprestimoController {

  static async listarEmprestimos(req, res){
    try{
      const emprestimos = await database.Emprestimos.findAll({
        include: [
          {
            model: database.Alunos,
            attributes: ['nome']
          },
          {
            model: database.Instrumentos,
            attributes: ['descricao']
          }
        ]
      });
      return res.status(200).json(emprestimos);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarEmprestimosPorData(req, res){
    let dataIni = req.params.dataIni;
    let dataFim = req.params.dataFim;
    let dataTeste1 = new Date('2020-07-23')
    let dataTeste2 = moment('2020-07-23')
    console.log(dataTeste1, dataTeste2);

    try{
      const emprestimo = await database.Emprestimos.findAll({ 
        
        where: {
          dataEmprestimo: {
            [Op.gte]: dataIni,
            [Op.lte]: dataFim
          }
        }, 
        include: [
          {
            model: database.Alunos,
            attributes: ['nome']
          },
          {
            model: database.Instrumentos,
            attributes: ['descricao']
          }
        ]
      })
      return res.status(200).json(emprestimo);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarEmprestimoPorId(req, res){
    let id = req.params.id;
    try{
      const emprestimo = await database.Emprestimos.findOne({ 
        where: {
          id: Number(id)
        }, 
        include: [
          {
            model: database.Alunos,
            attributes: ['nome']
          },
          {
            model: database.Instrumentos,
            attributes: ['descricao']
          }
        ]
      })
      return res.status(200).json(emprestimo);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirEmprestimo(req, res){
    let id = req.params.id;
    try{
      const emprestimo = await database.Emprestimos.findByPk(Number(id));
      const idInstrumento = emprestimo.idInstrumento;
      await database.Emprestimos.destroy({ where: {id: Number(id)}})
      await database.Instrumentos.update({emprestado: 0}, {where: {id: idInstrumento}});
      return res.status(200).send({message: `Emprestimo de Id ${id} deletado`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarEmprestimo(req, res){
    //const { idAluno, idInstrumento } = req.params;
    const novoEmprestimo = req.body;
    try{
      const emprestimo = await database.Emprestimos.create(novoEmprestimo);
      await database.Instrumentos.update({emprestado: 1}, {where: {id: emprestimo.idInstrumento}});
      return res.status(201).json(emprestimo);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarEmprestimo(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Emprestimos.update(infos, 
        { where: {id: Number(id)}}
      );
      const emprestimoAtualizado = await database.Emprestimos.findOne({ where: {id: Number(id)}})
      return res.status(200).json(emprestimoAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarPdf(req, res){

    await EmprestimoController.listarEmprestimosRelatorio(req, res);
    const browser = await puppeter.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/emprestimos/rel', {
      waitUntil: 'networkidle0'
    })
    const pdf = await page.pdf({
      format: 'Letter',
      margin:{
        top: "20px",
        bottom: "20px",
        left: "20px",
        right: "20px",
      }
    })
    await browser.close();
    res.contentType("application/pdf");
    return res.send(pdf);
    
  }

  static async listarEmprestimosPorDataRelatorio(req, res){
    let dataIni = req.params.dataIni;
    let dataFim = req.params.dataFim;
    
    console.log(dataIni, dataFim);
    try{
      const emprestimos = await database.Emprestimos.findAll({ 
        
        where: {
          dataEmprestimo: {
            [Op.gte]: dataIni,
            [Op.lte]: dataFim
          }
        }, 
        include: [
          {
            model: database.Alunos,
            attributes: ['nome']
          },
          {
            model: database.Instrumentos,
            attributes: ['descricao']
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
  
      for await(let emprestimo of emprestimos){
        const rows = new Array();
        rows.push(emprestimo.id);
        rows.push(emprestimo.Aluno.nome);
        rows.push(emprestimo.Instrumento.descricao);
        rows.push(moment(emprestimo.dataEmprestimo).format("DD/MM/YYYY"));
        rows.push(emprestimo.dataDevolucao ? moment(emprestimo.dataDevolucao).format("DD/MM/YYYY") : "-");
        body.push(rows);
      }

      const docDefinitions = {
        defaultStyle: {font: "Helvetica"},
        content: [
          {
            columns: [
              {text: "Relat??rio de Empr??stimos", style: "header"},
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
                  {text: "Aluno", style: 'tableHeader'}, 
                  {text: "Instrumento", style: 'tableHeader'}, 
                  {text: "Data de Empr??stimo", style: 'tableHeader'}, 
                  {text: "Data de Devolu????o", style: 'tableHeader'}], 
                  ...body
              ]
            },
            layout: 'lightHorizontalLines',
          },
        ],
        footer: [{text: "Relat??rio SysLyra", style: "footer"}],
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
      //pdfDoc.pipe(fs.createWriteStream("Relat??rio.pdf"));
      
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
     
      //return res.send("Relat??rio Concluido")
  
    }catch(err){
      return res.status(500).json(err.message);
    }

    
  }

  static async listarEmprestimosRelatorio(req, res){
    try{
      const emprestimos = await database.Emprestimos.findAll({
        include: [
          {
            model: database.Alunos,
            attributes: ['nome']
          },
          {
            model: database.Instrumentos,
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
  
      for await(let emprestimo of emprestimos){
        const rows = new Array();
        rows.push(emprestimo.id);
        rows.push(emprestimo.Aluno.nome);
        rows.push(emprestimo.Instrumento.descricao);
        rows.push(moment(emprestimo.dataEmprestimo).format("DD/MM/YYYY"));
        rows.push(emprestimo.dataDevolucao ? moment(emprestimo.dataDevolucao).format("DD/MM/YYYY") : "-");
        body.push(rows);
      }

      const docDefinitions = {
        defaultStyle: {font: "Helvetica"},
        content: [
          {
            columns: [
              {text: "Relat??rio de Empr??stimos", style: "header"},
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
                  {text: "Aluno", style: 'tableHeader'}, 
                  {text: "Instrumento", style: 'tableHeader'}, 
                  {text: "Data de Empr??stimo", style: 'tableHeader'}, 
                  {text: "Data de Devolu????o", style: 'tableHeader'}], 
                  ...body
              ]
            },
            layout: 'lightHorizontalLines',
          },
        ],
        footer: [{text: "Relat??rio SysLyra", style: "footer"}],
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
      //pdfDoc.pipe(fs.createWriteStream("Relat??rio.pdf"));
      
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
     
      //return res.send("Relat??rio Concluido")
  
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarEmprestimoPorAlunoRelatorio(req, res){
    const id = req.params.id;

    try{
      const emprestimo = await database.Emprestimos.findOne({ 
        where: {
          id: Number(id)
        },
        include: [
          {
            model: database.Alunos,
            attributes: ['nome', 'cpf'],
            include: {
              model: database.Enderecos,
              attributes: ['logradouro', 'numero', 'bairro', 'cep', 'cidade']
            }
          },
          {
            model: database.Instrumentos,
            attributes: ['descricao', 'numeroSerie', 'marca']
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
  
      
      let idEmprestimo = (emprestimo.id);
      let nomeAluno = (emprestimo.Aluno.nome);
      let cpfAluno = (emprestimo.Aluno.cpf);
      let endereco = (
        emprestimo.Aluno.Endereco.logradouro + ", " +
        emprestimo.Aluno.Endereco.numero + ", " +
        emprestimo.Aluno.Endereco.bairro + ", " +
        emprestimo.Aluno.Endereco.cidade
      );
      let nomeInstrumento = (emprestimo.Instrumento.descricao);
      let numeroSerie = (emprestimo.Instrumento.numeroSerie);
      let marca = (emprestimo.Instrumento.marca);
      let dataEmprestimo = (moment(emprestimo.dataEmprestimo).format("DD/MM/YYYY"));
      let dataDevolucao = (moment(emprestimo.dataDevolucao).format("DD/MM/YYYY"));
      
      
      const docDefinitions = {
        defaultStyle: {font: "Helvetica"},
        content: [
          {
            text: moment().format("DD/MM/YYYY hh:mm:ss\n\n"), style: "dateRight",
          },
          {
            stack: [
              "ESCOLA DE M??SICA LYRA CARLOS GOMES\n\n Registro de Empr??stimo de Instrumento",
            ],
            style: 'header'
          },
          {
            text: [
              `Registra-se na data do dia ${dataEmprestimo} que o(a) aluno(a) `, {text: nomeAluno, bold: true}, ` portador do CPF n?? `, {text: cpfAluno, bold: true}, ` residente no endere??o "`,{text: endereco},`" compormete-se a assumir total responsabilidade por quaisquer danos que eventualmente possam ocorrer com o instrumento `, {text: nomeInstrumento}, ` numero de s??rie `, {text: numeroSerie}, ` da marca `, {text: marca}, `, assim como fazer-se presente nas aulas, ensaios e apresnta????es da Lyra Carlos Gomes.
              `
            ],
            style: 'body'
          },
          {
            columns: [
              {
                text: '__________________________________\n\nAssinatura do aluno', alignment: 'center'
                
              },
              {
                text: '__________________________________\n\nAssinatura da dire????o', alignment: 'center'
              }
            ]
          },
          {
            text: '__________________________________\n\nData', alignment: 'center', style: 'space'
          },
          
        ],
        footer: [{text: "Relat??rio SysLyra", style: "footer"}],
        styles: {
          header: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 60, 0, 120]
          },
          space: {
            margin: [0, 100, 0, 0]
          },
          dateRight: {
            alignment: 'right',
            fontSize: 10,

          },
          body: {
            fontSize: 13,
            color: 'black',
            margin: [15, 0, 15, 150],
            lineHeight: 2,
            alignment: 'justify'
          },
          footer: {
            fontSize: 8,
            alignment: 'center',
          }
        }
      }
  
      const pdfDoc = printer.createPdfKitDocument(docDefinitions);
      //pdfDoc.pipe(fs.createWriteStream("Relat??rio.pdf"));
      
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
     
      //return res.send("Relat??rio Concluido")
  
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = EmprestimoController;
