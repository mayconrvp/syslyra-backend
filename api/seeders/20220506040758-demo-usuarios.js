'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Usuarios', [
			{
				idFuncionario: 1,
				login: "joaocarlos",
				senha: "1234",
				nivel: 5,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				idFuncionario: 2,
				login: "williansantos",
				senha: "1234",
				nivel: 1,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				idFuncionario: 3,
				login: "joaquina",
				senha: "1234",
				nivel: 1,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Usuarios', null, {})
  }
}
