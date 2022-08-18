'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Responsaveis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Responsaveis.hasMany(models.Alunos, {
        foreignKey: 'idResponsavel'
      })
    }
  }
  Responsaveis.init({
    responsavel: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Responsaveis',
  });
  return Responsaveis;
};