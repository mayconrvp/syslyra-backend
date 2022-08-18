'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'Alunos',
      'cpf',
      {
        type: Sequelize.STRING,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Alunos', 'cpf'),
    ])
    
  }
};