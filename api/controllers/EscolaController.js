const database = require('../models');

class EscolaController {

  static async listarEscolas(req, res){
    try{
      const escolas = await database.Escolas.findAll();
      return res.status(200).json(escolas);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarEscolaPorId(req, res){
    let id = req.params.id;
    try{
      const escola = await database.Escolas.findOne(
      { 
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json(escola);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirEscola(req, res){
    let id = req.params.id;
    try{
      const escola = await database.Escolas.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `Escola de Id ${id} deletada`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarEscola(req, res){
    const novaEscola = req.body;
    try{
      const escola = await database.Escolas.create(novaEscola);
  
      return res.status(201).json(escola);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarEscola(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Escolas.update(infos, 
        { where: {id: Number(id)}}
      );
      const escolaAtualizada = await database.Escolas.findOne({ 
        where: {
          id: Number(id)
        }
      })
      return res.status(200).json(escolaAtualizada);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = EscolaController;
