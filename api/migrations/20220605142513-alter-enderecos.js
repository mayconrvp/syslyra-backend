'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'Enderecos',
      'idEstado',
      {
        type: Sequelize.INTEGER,
        references: { model: 'Estados', key:'id' }
      }
    );

    await queryInterface.addColumn(
      'Enderecos',
      'cidade',
      {
        type: Sequelize.STRING
      }
    );

    await queryInterface.removeColumn(
      'Enderecos',
      'idCidade'
    );

  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Enderecos', 'cidade'),
      queryInterface.removeColumn('Enderecos', 'idEstado'),
      queryInterface.addColumn(
        'Enderecos',
        'idCidade',
        {
          type: Sequelize.INTEGER,
          references: { model: 'Cidades', key:'id' }
        }
      )
    ])
  }
};
