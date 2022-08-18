'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    var data = new Date();
		await queryInterface.bulkInsert('Matriculas', [
			{
				idTurma: 3,
        idAluno: 1,
        data: new Date(),
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				idTurma: 3,
        idAluno: 2,
        data: new Date(),
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				idTurma: 4,
        idAluno: 1,
        data: new Date(),
				createdAt: new Date(),
				updatedAt: new Date()				 
			},

		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Matriculas', null, {})
  }
}
