'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Instrumentos', [
			{
				descricao: "Guitarra",
				modelo: "Stella",
				marca: "Tagima",
				numeroSerie: "TGS1015",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
			{
				descricao: "Violão Nylon Semi Classic ",
				modelo: "CEC5",
				marca: "Cort",
				numeroSerie: "CEC5-46125",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Violão Flat Cutway de Nylon",
				modelo: "GNF-3 CEQ",
				marca: "Giannini",
				numeroSerie: "TGS1015",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Instrumentos', null, {})
  }
}
