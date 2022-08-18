'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'Cursos',
      'nome',
      {
        type: Sequelize.STRING,
        allowNull: false,
        
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Cursos', 'nome'),
    ])
  }
};
