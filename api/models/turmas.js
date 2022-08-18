'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turmas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Turmas.belongsTo(models.Funcionarios, {
        foreignKey: 'idFuncionario'
      })
      Turmas.belongsTo(models.Cursos, {
        foreignKey: 'idCurso'
      })
      Turmas.hasMany(models.Aulas, {
        foreignKey: 'idTurma'
      });
      Turmas.hasMany(models.Matriculas, {
        foreignKey: 'idTurma'
      })
      Turmas.hasMany(models.Avaliacoes, {
        foreignKey: 'idTurma'
      })
    }
  }
  Turmas.init({
    descricao: DataTypes.STRING,
    horario: DataTypes.STRING,
    dias: DataTypes.STRING,
    dataInicio: DataTypes.DATEONLY,
    dataTermino: DataTypes.DATEONLY
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Turmas',
  });
  return Turmas;
};