'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Instrumentos', 'observacoes', {
        allowNull: true,
        type: Sequelize.STRING,
        after: 'numeroSerie'
      }),
    ])
  },
  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('Instrumentos', 'observacoes'),
    ]);
  }
};
