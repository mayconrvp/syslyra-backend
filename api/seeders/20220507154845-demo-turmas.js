'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
		await queryInterface.bulkInsert('Turmas', [
			{
				descricao: "Turma de ContraBaixo 20/1",
				idCurso: 1,
        idFuncionario: 1,
        horario: "15h",
        dias: "segunda, quarta",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				descricao: "Turma de Violina 20/1",
				idCurso: 1,
        idFuncionario: 1,
        horario: "18h",
        dias: "segunda, quarta",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Turmas', null, {})
  }
}
