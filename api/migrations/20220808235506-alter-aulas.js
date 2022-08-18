'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Aulas', 'link', {
      allowNull: true,
      type: Sequelize.STRING,
      after: 'idTurma'
    })
  },

  async down (queryInterface, Sequelize) {
    return Promise.all(
      queryInterface.removeColumn('Aulas', 'link'),
    )
  }
};
