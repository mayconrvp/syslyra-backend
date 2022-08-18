'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Aulas', {
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
      tipo: {
        type: Sequelize.STRING
      },
      data: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      observacoes: {
        type: Sequelize.STRING
      },
      idTurma: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Turmas', key: 'id'}
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
    await queryInterface.dropTable('Aulas');
  }
};