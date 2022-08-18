'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Turmas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idCurso: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Cursos', key: 'id' }
      },
      idFuncionario: {
        type: Sequelize.INTEGER,
        references: { model: 'Funcionarios', key: 'id' }
      },
      horario: {
        type: Sequelize.STRING
      },
      dias: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Turmas');
  }
};