'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    var data = new Date();
		await queryInterface.bulkInsert('Emprestimos', [
			{
				dataEmprestimo: '2022-05-14 07:39:57',
				dataDevolucao: '2022-06-14 23:59:59',
				idInstrumento: 1,
        idAluno: 1,
        observacao: "",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
      {
				dataEmprestimo: '2022-05-15 07:39:57',
				dataDevolucao: '2022-06-15 23:59:59',
				idInstrumento: 2,
        idAluno: 2,
        observacao: "",
				createdAt: new Date(),
				updatedAt: new Date()				 
			},
		], {})
  },

  async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Emprestimos', null, {})
  }
}
