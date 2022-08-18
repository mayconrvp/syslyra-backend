const moment = require('moment');
const { Op } = require('sequelize');
const database = require('../models');

class TurmaController {

  static async listarTurmas(req, res){
    try{
      const turmas = await database.Turmas.findAll({
        where: {
          dataTermino: null
        },
        include: [
          {
            model: database.Cursos,
            attributes: ['id','nome']
          },
          {
            model: database.Funcionarios,
            attributes: ['nome']
          },
        ]
      });
      return res.status(200).json(turmas);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarTurmaPorId(req, res){
    const { id } = req.params;
    try{
      const turma = await database.Turmas.findOne(
        { 
          where: {
            id: Number(id)
          }, 
          include: [
            {
              model: database.Cursos,
              attributes: ['id','nome']
            },
            {
              model: database.Funcionarios,
              attributes: ['nome']
            },
          ]
        },

      );
      return res.status(200).json(turma);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirTurma(req, res){
    let id = req.params.id;
    try{
      const turma = await database.Turmas.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `Turma de Id ${id} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarTurma(req, res){
    const novaTurma = req.body;
    try{
      const turma = await database.Turmas.create(novaTurma);
      return res.status(201).json(turma);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarTurma(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Turmas.update(infos, 
        { where: {id: Number(id)}}
      );
      const turmaAtualizado = await database.Turmas.findOne({ where: {id: Number(id)}}, {
        include: [
          {
            model: database.Cursos,
            attributes: ['descricao']
          },
          {
            model: database.Funcionarios,
            attributes: ['nome']
          },
        ]
      })
      return res.status(200).json(turmaAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async finalizarTurma(req, res){
    const id = req.params.id;

    let data = moment().format("YYYY-MM-DD");

    try{
      await database.Turmas.update({dataTermino: data}, 
        { where: {id: Number(id)}}
      );
      const turmaFinalizada = await database.Turmas.findOne({ where: {id: Number(id)}})
      
      return res.status(200).json(turmaFinalizada);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = TurmaController;
