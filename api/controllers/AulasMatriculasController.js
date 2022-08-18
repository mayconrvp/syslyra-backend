const database = require('../models');

class AulasMatriculasController {

  static async listarAulaMatricula(req, res){
    let { matriculaId, aulaId } = req.params;
    try{
      const aulaMatricula = await database.Aulas_matriculas.findOne({ 
        where: 
        {
          idAula: Number(aulaId),
          idMatricula: Number(matriculaId),
        }
      })
      return res.status(200).json(aulaMatricula);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async excluirAulaMatricula(req, res){
    let { matriculaId, aulaId } = req.params;

    try{
      await database.Aulas_matriculas.destroy({ 
        where: 
        {
          idAula: Number(aulaId),
          idMatricula: Number(matriculaId),
        }
      })
      return res.status(200).send({message: `Registro de Aula de id ${aulaId} - Matricula Id ${matriculaId} deletado`});
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

  static async criarAulaMatricula(req, res){
    const { aulaId } = req.params;
    const novoAulaMatricula = { ...req.body, idAula: Number(aulaId) };

    try{
      const aulaMatricula = await database.Aulas_matriculas.create(novoAulaMatricula);
      return res.status(201).json(aulaMatricula);
    }catch (err){
      return res.status(500).json(err.message);
    }
  }


  static async atualizarAulaMatricula(req, res){
    const {matriculaId, aulaId } = req.params;
    const infos = req.body;

    try{
      await database.Aulas_matriculas.update(infos, { 
        where: 
        {
          idAula: Number(aulaId),
          idMatricula: Number(matriculaId),
        }
      }
      );
      const aulaMatriculaAtualizado = await database.Aulas_matriculas.findOne({ 
        where: 
        {
          idAula: Number(aulaId),
          idMatricula: Number(matriculaId),
        }
      });
      return res.status(200).json(aulaMatriculaAtualizado);
    }catch(err){
      return res.status(500).json(err.message);
    }
  }

}

module.exports = AulasMatriculasController;
