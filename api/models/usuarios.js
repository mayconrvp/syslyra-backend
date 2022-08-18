'use strict'
module.exports = (sequelize, DataTypes) => {
  const Usuarios = sequelize.define('Usuarios', {
    login: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: { 
        notEmpty : { msg: 'O campo "login" é inválido ou vazio.' },
        funcaoValidadora: function(dado) {
          if (dado.length < 3) throw new Error('o campo login deve ter no mínimo 5 caracteres')
        } 
      } 
    },
    nivel: DataTypes.INTEGER,
    senha: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : { msg: 'O campo "senha" é inválido ou vazio.' },
      }
    },
  }, )
  Usuarios.associate = function(models) {
    Usuarios.belongsTo(models.Funcionarios, {
      foreignKey: 'idFuncionario'
    })
  }
  return Usuarios
}