// const database = require('../models');

// class CidadeController {

//   static async listarCidades(req, res){
//     try{
//       const cidades = await database.Cidades.findAll({
//         include: {
//           model: database.Estados, 
//           attributes: ['nome','uf']
//         }
//       });
//       return res.status(200).json(cidades);
//     }catch(err){
//       return res.status(500).json(err.message);
//     }
//   }

//   static async listarCidadePorId(req, res){
//     let id = req.params.id;
//     try{
//       const cidade = await database.Cidades.findOne({
//         include: {
//           model: database.Estados, 
//           attributes: ['nome','uf']
//         }
//       },
//       { 
//         where: {
//           id: Number(id)
//         }
//       });
//       return res.status(200).json(cidade);
//     }catch(err){
//       return res.status(500).json(err.message);
//     }
//   }

//   static async excluirCidade(req, res){
//     let id = req.params.id;
//     try{
//       const cidade = await database.Cidades.destroy({ where: {id: Number(id)}})
//       return res.status(200).send({message: `cidade de Id ${id} deletada`});
//     }catch(err){
//       return res.status(500).json(err.message);
//     }
//   }

//   static async criarCidade(req, res){
//     const novaCidade = req.body;
//     try{
//       const cidade = await database.Cidades.create(novaCidade);
//       return res.status(201).json(cidade);
//     }catch (err){
//       return res.status(500).json(err.message);
//     }
//   }

//   static async atualizarCidade(req, res){
//     const id = req.params.id;
//     const infos = req.body;

//     try{
//       await database.Cidades.update(infos, 
//         { where: {id: Number(id)}}
//       );
//       const cidadeAtualizada = await database.Cidades.findOne({ where: {id: Number(id)}}, {
//         include: {
//           model: database.Estados, 
//           attributes: ['nome','uf']
//         }
//       })
//       return res.status(200).json(cidadeAtualizada);
//     }catch(err){
//       return res.status(500).json(err.message);
//     }
//   }
// }

// module.exports = CidadeController;
