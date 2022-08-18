'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Cidades', [
			{
				nome: "Alegre",
				idEstado: 8,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
			{
				nome: "Serra",
				idEstado: 8,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				nome: "Vitória",
				idEstado: 8,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				nome: "Vila Velha",
				idEstado: 8,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				nome: "Jerônimo Monteiro",
				idEstado: 8,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				nome: "Guaçuí",
				idEstado: 8,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				nome: "Rio de Janeiro",
				idEstado: 19,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				nome: "Niterói",
				idEstado: 19,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				nome: "Santos",
				idEstado: 26,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				nome: "São Paulo",
				idEstado: 26,
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Cidades', null, {})
  }
}
