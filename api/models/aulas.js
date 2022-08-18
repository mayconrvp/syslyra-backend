'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aulas extends Model {

    static associate(models) {
      Aulas.hasMany(models.Aulas_matriculas, {
        foreignKey: 'idAula'
      })
      Aulas.belongsTo(models.Turmas, {
        foreignKey: 'idTurma'
      })
      Aulas.belongsTo(models.Funcionarios, {
        foreignKey: 'idFuncionario'
      })
    }
  }
  Aulas.init({
    descricao: DataTypes.STRING,
    tipo: DataTypes.STRING,
    data: DataTypes.DATEONLY,
    planoAula: DataTypes.STRING,
    concluida: DataTypes.BOOLEAN,
    link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Aulas',
    paranoid: true,

  });
  return Aulas;
};

