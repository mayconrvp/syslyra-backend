module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Cursos', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Enderecos', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Escolas', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Instrumentos', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Funcionarios', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Aulas', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Matriculas', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
      }),
      queryInterface.addColumn('Emprestimos', 'deletedAt', {
        allowNull: true,
        type: Sequelize.DATE
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn('Cursos', 'deletedAt'),
      queryInterface.removeColumn('Enderecos', 'deletedAt'),
      queryInterface.removeColumn('Escolas', 'deletedAt'),
      queryInterface.removeColumn('Instrumentos', 'deletedAt'),
      queryInterface.removeColumn('Funcionarios', 'deletedAt'),
      queryInterface.removeColumn('Aulas', 'deletedAt'),
      queryInterface.removeColumn('Matriculas', 'deletedAt'),
      queryInterface.removeColumn('Emprestimos', 'deletedAt'),
    ]);
  },
};