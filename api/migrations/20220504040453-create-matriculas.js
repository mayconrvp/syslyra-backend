'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matriculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idTurma: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Turmas', key: 'id'}
      },
      idAluno: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Alunos', key: 'id'}
      },
      data: {
        type: Sequelize.DATE
      },
      media: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('Matriculas');
  }
};