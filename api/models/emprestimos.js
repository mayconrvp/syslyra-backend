'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Emprestimos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Emprestimos.belongsTo(models.Instrumentos, {
        foreignKey: 'idInstrumento'
      })
      Emprestimos.belongsTo(models.Alunos, {
        foreignKey: 'idAluno'
      })
    }
  }
  Emprestimos.init({
    dataEmprestimo: DataTypes.DATE,
    dataDevolucao: DataTypes.DATE,
    observacao: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Emprestimos',
  });
  return Emprestimos;
};