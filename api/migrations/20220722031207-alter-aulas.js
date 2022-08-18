'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Aulas', 'idFuncionario', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {model: 'Funcionarios', key: 'id'},
      after: 'idTurma'
    })
  },

  async down (queryInterface, Sequelize) {
    return Promise.all(
      queryInterface.removeColumn('Aulas', 'idFuncionario'),
    )
  }
};
