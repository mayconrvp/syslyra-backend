'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Emprestimos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataEmprestimo: {
        type: Sequelize.DATE
      },
      dataDevolucao: {
        type: Sequelize.DATE
      },
      observacao: {
        type: Sequelize.STRING
      },
      idInstrumento: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Instrumentos', key: 'id' }
      },
      idAluno: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Alunos', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Emprestimos');
  }
};