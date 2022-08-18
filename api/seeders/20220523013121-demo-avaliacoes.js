'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Avaliacoes', [
			{
				descricao: "Trabalho 1: Fazer a escala maior individual",
				pontuacao: 10,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Trabalho 2: Fazer a escala menor em grupo",
				pontuacao: 10,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Prova 1: Escalas",
				pontuacao: 10,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Avaliacoes', null, {})
  }
}
