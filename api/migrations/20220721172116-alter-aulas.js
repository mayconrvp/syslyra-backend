'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Aulas', 'concluida', {
        allowNull: true,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        after: 'observacoes'
      }),
      queryInterface.renameColumn('Aulas', 'observacoes', 'planoAula'),
      
    ])
  },
  down: (queryInterface) => {
    return Promise.all([
      
      queryInterface.renameColumn('Aulas', 'planoAula', 'observacoes'),
      queryInterface.removeColumn('Aulas', 'concluida'),
    ]);
  }
};
