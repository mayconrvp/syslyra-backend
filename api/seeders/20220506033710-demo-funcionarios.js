'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Funcionarios', [
			{
				nome: "João Carlos Amaral",
				cargo: "Professor",
				telefone: "(27)9998-5555",
				email: "joaocarlosr@gmail.com",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
			{
				nome: "Ana Paula Silva",
				cargo: "Professor",
				telefone: "(28)99889-9888",
				email: "anasilva@email.com",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				nome: "Joaquina da Silva Santos",
				cargo: "Diretor",
				telefone: "(27)98888-8888",
				email: "",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Funcionarios', null, {})
  }
}
