const database = require('../models');

class CursoController {

  static async listarCursos(req, res){
    try{
      const cursos = await database.Cursos.findAll();
      return res.status(200).json(cursos);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }
  
  static async excluirCurso(req, res){
    let id = req.params.id;
    try{
      await database.Cursos.destroy({ 
        where: {
          id: Number(id)
        }
      })
      return res.status(200).send({
        message: `Curso de Id ${id} deletada`
      });
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarCurso(req, res){
    const novoCurso = req.body;
    try{
      const curso = await database.Cursos.create(novoCurso);
      return res.status(201).json(curso);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }
  
  static async atualizarCurso(req, res){
    const id = req.params.id;
    const infos = req.body;
    try{
      await database.Cursos.update(infos, 
        { where: {id: Number(id)}}
        );
        const cursoAtualizado = await database.Cursos.findOne({ 
          where: {
            id: Number(id)
          }
        })
        return res.status(200).json(cursoAtualizado);
      }catch(err){
        return res.status(500).json(err.message);
      }
    }

    static async listarCursoPorId(req, res){
      let id = req.params.id;
      try{
        const curso = await database.Cursos.findOne({ 
          where: {
            id: Number(id)
          }
        })
        return res.status(200).json(curso);
      }catch(err){
        return res.status(500).json(err.message);
      }
    }
}

module.exports = CursoController;
