'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Turmas', 'dataInicio', {
        allowNull: true,
        type: Sequelize.DATEONLY
      }),
      queryInterface.addColumn('Turmas', 'dataTermino', {
        allowNull: true,
        type: Sequelize.DATEONLY
      }),
    ])
  },
  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('Turmas', 'dataInicio'),
      queryInterface.removeColumn('Turmas', 'dataTermino'),
    ]);
  }
};
