'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Alunos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Alunos.belongsTo(models.Enderecos, {
        foreignKey: 'idEndereco'
      })
      Alunos.belongsTo(models.Responsaveis, {
        foreignKey: 'idResponsavel'
      });
      Alunos.belongsTo(models.Escolas, {
        foreignKey: 'idEscola'
      });
      Alunos.hasMany(models.Emprestimos, {
        foreignKey: 'idAluno'
      })
      Alunos.hasMany(models.Matriculas, {
        foreignKey: 'idAluno'
      })
      Alunos.hasMany(models.Matriculas, {
        foreignKey: 'idAluno'
      })
    }
  }
  Alunos.init({
    nome: DataTypes.STRING,
    dataNascimento: DataTypes.DATEONLY,
    turno: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Alunos',
  });
  return Alunos;
};