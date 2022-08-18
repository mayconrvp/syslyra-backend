'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'Avaliacoes',
      'idTurma',
      {
        type: Sequelize.INTEGER,
        references: { model: 'Turmas', key:'id' }
      }
    );
    await queryInterface.addColumn(
      'Avaliacoes',
      'observacoes',
      {
        type: Sequelize.STRING,
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Avaliacoes', 'idTurma'),
      queryInterface.removeColumn('Avaliacoes', 'observacoes'),
    ])
  }
};
