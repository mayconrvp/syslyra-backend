'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Emprestimos', 'dataEmprestimo', {
        type: Sequelize.DATEONLY,
        allowNull: false
      }),
      queryInterface.changeColumn('Emprestimos', 'dataDevolucao', {
        type: Sequelize.DATEONLY,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Emprestimos', 'dataEmprestimo', {
        type: Sequelize.DATE,
        allowNull: true
      }),
      queryInterface.changeColumn('Emprestimos', 'dataDevolucao', {
        type: Sequelize.DATE,
      }),
    ]);
  },
};

