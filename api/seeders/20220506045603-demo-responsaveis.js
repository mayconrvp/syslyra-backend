'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Responsaveis', [
			{
				responsavel: "Ana Maria José",
				telefone: "(28)3222-2222",
				email: "anamaria@gmail.com",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				responsavel: "Arnaldo da Silva",
				telefone: "(28)3222-2222",
				email: "arnaldosilva@outlook.com",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				responsavel: "João Bimbato Cardoso",
				telefone: "(28)3322-3333",
				email: "jbcardoso@gmail.com",
				createdAt: new Date(),
				updatedAt: new Date()				 
			}
      
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Responsaveis', null, {})
  }
}
