'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Instrumentos',
      'emprestado',
      {
        type: Sequelize.INTEGER,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Instrumentos', 'emprestado')
  }
};
