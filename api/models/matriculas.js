'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matriculas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Matriculas.belongsTo(models.Alunos, {
        foreignKey: 'idAluno'
      });
      Matriculas.belongsTo(models.Turmas, {
        foreignKey: 'idTurma'
      });
    }
  }
  Matriculas.init({
    data: DataTypes.DATE,
    media: DataTypes.DOUBLE
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Matriculas',
  });
  return Matriculas;
};