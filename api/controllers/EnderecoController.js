const database = require('../models');

class EnderecoController {

  static async listarEnderecos(req, res){
    try{
      const enderecos = await database.Enderecos.findAll({
        include: {
          model: database.Estados, 
          attributes: ['id','uf']
        }
      });
      return res.status(200).json(enderecos);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarEnderecoPorId(req, res){
    let id = req.params.id;
    try{
      const endereco = await database.Enderecos.findOne({ 
        where: 
        {
          id: Number(id)
        },
        include: {
          model: database.Estados, 
          attributes: ['id','uf']
        }
      })
      return res.status(200).json(endereco);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirEndereco(req, res){
    let id = req.params.id;
    try{
      const endereco = await database.Enderecos.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `Endereco de Id ${id} deletado`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarEndereco(req, res){
    const novoEndereco = req.body;
    const { idAluno } = req.params;
    try{
      const endereco = await database.Enderecos.create(novoEndereco);
      await database.Alunos.update({ idEndereco: endereco.id},
        { 
          where: {
            id: Number(idAluno)
          }
        }
      )
      console.log(endereco.id);
      return res.status(201).json(endereco);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarEndereco(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Enderecos.update(infos, 
        { where: {id: Number(id)}}
      );
      const enderecoAtualizado = await database.Enderecos.findOne({ where: {id: Number(id)}})
      return res.status(200).json(enderecoAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
}

module.exports = EnderecoController;
