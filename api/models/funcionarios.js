'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Funcionarios extends Model {
    static associate(models) {
      Funcionarios.hasMany(models.Usuarios, {
        foreignKey: 'idFuncionario'
      });
      Funcionarios.hasMany(models.Turmas, {
        foreignKey: 'idFuncionario'
      })
      Funcionarios.hasMany(models.Aulas, {
        foreignKey: 'idFuncionario'
      });
    }
  }
  Funcionarios.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "O campo nome é obrigatório" },
        notEmpty: { msg: "Campo nome inválido ou vazio" },
      }
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Campo cargo obrigatório"}
      }
    },
    telefone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        validaCPF(value) {
          value = value.replaceAll(".", "");
          value = value.replaceAll("-", "");
          if (value.length != 11) {
            throw new Error("CPF inválido");
          }
        }
      }
    },
    dataNascimento: DataTypes.DATEONLY
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Funcionarios',
  });
  return Funcionarios;
};