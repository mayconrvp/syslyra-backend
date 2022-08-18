const database = require('../models');
const bcrypt = require('bcrypt')

class UsuarioController {

  static async listarUsuarios(req, res){
    try{
      const usuarios = await database.Usuarios.findAll({
        include: {
          model: database.Funcionarios, 
          attributes: ['nome','cargo']
        }
    });
      return res.status(200).json(usuarios);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarUsuarioPorId(req, res){
    let id = req.params.id;
    try{
      const usuario = await database.Usuarios.findOne({
        where: {
          id: Number(id)
        },
        include: {
          model: database.Funcionarios, 
          attibutes: ['id', 'nome', 'cargo']
        }
      })
      return res.status(200).json(usuario);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirUsuario(req, res){
    let id = req.params.id;
    try{
      const usuario = await database.Usuarios.destroy({ where: {id: Number(id)}})
      return res.status(200).send({message: `Usuario de Id ${id} deletado(a)`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarUsuario(req, res){
    const novoUsuario = req.body;

    let userExist = await database.Usuarios.findOne({ where: {login: req.body.login} });

    if(userExist){
      return res.status(400).json({ message: "Login de usuário já existe. Tente login diferente"});
    }

    novoUsuario.senha = await bcrypt.hash(novoUsuario.senha, 8);
    try{
      await database.Usuarios.create(novoUsuario);
      return res.status(201).json("Usuário cadastrado.");
    }catch (err){
      return res.status(500).json(err.message);
    }
  }

  static async atualizarUsuario(req, res){
    const id = req.params.id;
    const infos = req.body;

    try{
      await database.Usuarios.update(infos, 
        { where: {id: Number(id)}}
      );
      const usuarioAtualizado = await database.Usuarios.findOne({ where: {id: Number(id)}})
      return res.status(200).json(usuarioAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async listarUsuarioPorLogin(req, res){
    let login = req.login;
    try{
      const usuario = await database.Usuarios.findOne({
        where: {
          login: login
        }
      })
      return usuario;
    }catch(err){
      return false;
    }
  }
}

module.exports = UsuarioController;
