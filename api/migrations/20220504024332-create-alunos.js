'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Alunos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      dataNascimento: {
        type: Sequelize.DATEONLY
      },
      turno: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      idEndereco:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Enderecos', key: 'id' }
      },
      idEscola:{
        type: Sequelize.INTEGER,
        references: { model: 'Escolas', key: 'id' }
      },
      idResponsavel:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Responsaveis', key: 'id' }
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
    await queryInterface.dropTable('Alunos');
  }
};