const database = require('../models');

class FuncionarioController {

  static async listarFuncionarios(req, res){
    try{
      const funcionarios = await database.Funcionarios.findAll();
      return res.status(200).json(funcionarios);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarFuncionariosPorCargo(req, res){
    let cargo = req.params.cargo;
    try{
      const funcionarios = await database.Funcionarios.findAll({
        where: {
          cargo: cargo
        }
      });
      return res.status(200).json(funcionarios);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarFuncionarioPorId(req, res){
    let id = req.params.id;
    try{
      const funcionario = await database.Funcionarios.findOne({ where: {id: Number(id)}})
      return res.status(200).json(funcionario);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirFuncionario(req, res){
    let id = req.params.id;
    try{
      await database.Funcionarios.destroy({ where: {id: Number(id)}})
      await database.Aulas.update({idFuncionario: null}, 
        { where: {idFuncionario: Number(id)}}
      );
      return res.status(200).send({message: `Funcionário de Id ${id} deletado(a)`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarFuncionario(req, res){
    const novoFuncionario = req.body;
    try{
      const funcionario = await database.Funcionarios.create(novoFuncionario);
      return res.status(201).json(funcionario);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarFuncionario(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Funcionarios.update(infos, 
        { where: {id: Number(id)}}
      );
      const funcionarioAtualizado = await database.Funcionarios.findOne({ where: {id: Number(id)}})
      return res.status(200).json(funcionarioAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = FuncionarioController;
