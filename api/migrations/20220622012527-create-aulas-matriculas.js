'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Aulas_matriculas', {

      idAula: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Aulas', key: 'id'}
      },
      idMatricula: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Matriculas', key: 'id'}
      },
      idAvaliacao: {
        type: Sequelize.INTEGER,
        references: {model: 'Avaliacoes', key: 'id'}
      },
      nota: {
        type: Sequelize.DOUBLE
      },
      chamada: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Aulas_matriculas');
  }
};