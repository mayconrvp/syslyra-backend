'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Escolas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Escolas.hasMany(models.Alunos, {
        foreignKey: 'idEscola'
      })
    }
  }
  Escolas.init({
    nome: DataTypes.STRING,
    telefone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Escolas',
    paranoid: true,
  });
  return Escolas;
};