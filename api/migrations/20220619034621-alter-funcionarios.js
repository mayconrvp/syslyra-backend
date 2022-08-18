'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'Funcionarios',
      'cpf',
      {
        type: Sequelize.STRING,
      }
    );
    await queryInterface.addColumn(
      'Funcionarios',
      'dataNascimento',
      {
        type: Sequelize.DATEONLY,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Funcionarios', 'cpf'),
      queryInterface.removeColumn('Funcionarios', 'dataNascimento'),
    ])
    
  }
};