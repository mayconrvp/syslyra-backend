'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instrumentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Instrumentos.hasMany(models.Emprestimos, {
        foreignKey: 'idInstrumento'
      })
    }
  }
  Instrumentos.init({
    descricao: DataTypes.STRING,
    modelo: DataTypes.STRING,
    marca: DataTypes.STRING,
    numeroSerie: DataTypes.STRING,
    emprestado: DataTypes.INTEGER,
    observacoes: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Instrumentos',
  });
  return Instrumentos;
};