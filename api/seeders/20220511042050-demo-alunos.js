'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Alunos', [
			{
				nome: "Joãozin da Silva",
				dataNascimento: "1995-04-02",
        turno: "Matutino",
        telefone: "(28)99999-8888",
        email: "joaozinho@email.com",
        idEndereco: 4,
        idEscola: null,
        idResponsavel : null,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				nome: "Maria da Silva",
				dataNascimento: "1994-08-25",
        turno: "Noturno",
        telefone: "(28)98887-8999",
        email: "mariasilva@email.com",
        idEndereco: 4,
        idEscola: null,
        idResponsavel : null,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Alunos', null, {})
  }
}
