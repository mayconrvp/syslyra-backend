const database = require('../models');

class ResponsavelController {

  static async listarResponsaveis(req, res){
    try{
      const responsaveis = await database.Responsaveis.findAll();
      return res.status(200).json(responsaveis);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarResponsavelPorId(req, res){
    let id = req.params.id;
    try{
      const responsavel = await database.Responsaveis.findOne({ where: {id: Number(id)}})
      return res.status(200).json(responsavel);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirResponsavel(req, res){
    let id = req.params.id;
    try{
      const responsavel = await database.Responsaveis.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `Avaliação de Id ${id} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarResponsavel(req, res){
    const novoResponsavel = req.body;
    const { idAluno } = req.params;

    try{
      const responsavel = await database.Responsaveis.create(novoResponsavel);
      await database.Alunos.update({ idResponsavel: responsavel.id},
        { 
          where: {
            id: Number(idAluno)
          }
        }
      )
      return res.status(201).json(responsavel);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarResponsavel(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Responsaveis.update(infos, 
        { where: {id: Number(id)}}
      );
      const responsavelAtualizado = await database.Responsaveis.findOne({ where: {id: Number(id)}})
      return res.status(200).json(responsavelAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = ResponsavelController;
