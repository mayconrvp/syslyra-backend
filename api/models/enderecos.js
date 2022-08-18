'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enderecos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Enderecos.hasMany(models.Alunos, {
        foreignKey: 'idEndereco'
      });
      Enderecos.belongsTo(models.Estados, {
        foreignKey: 'idEstado'
      });
    }
  }
  Enderecos.init({
    logradouro: DataTypes.STRING,
    numero: DataTypes.STRING,
    bairro: DataTypes.STRING,
    cep: DataTypes.STRING,
    complemento: DataTypes.STRING,
    cidade: DataTypes.STRING,
    idEstado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Enderecos',
    paranoid: true,
  });
  return Enderecos;
};
