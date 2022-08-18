const database = require('../models');

class EstadoController {

  static async listarEstados(req, res){
    try{
      const estados = await database.Estados.findAll();
      return res.status(200).json(estados);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarEstadoPorId(req, res){
    let id = req.params.id;
    try{
      const estado = await database.Estados.findOne({ where: {id: Number(id)}})
      return res.status(200).json(estado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarEstado(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Estados.update(infos, 
        { where: {id: Number(id)}}
      );
      const estadoAtualizado = await database.Estados.findOne({ where: {id: Number(id)}})
      return res.status(200).json(estadoAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = EstadoController;
