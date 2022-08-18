module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Alunos', 'idEndereco', {
        type: Sequelize.INTEGER,
        allowNull: true
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([queryInterface.changeColumn('Alunos', 'idEndereco')]);
  },
};