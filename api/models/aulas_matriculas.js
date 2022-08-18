'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aulas_matriculas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Aulas_matriculas.belongsTo(models.Aulas, {
        foreignKey: 'idAula'
      });
      Aulas_matriculas.belongsTo(models.Matriculas, {
        foreignKey: 'idMatricula'
      });
      Aulas_matriculas.belongsTo(models.Avaliacoes, {
        foreignKey: 'idAvaliacao'
      });
    }
  }
  Aulas_matriculas.init({
    nota: DataTypes.DOUBLE,
    chamada: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Aulas_matriculas',
  }, { freezeTableName: true });
  Aulas_matriculas.removeAttribute('id');
  return Aulas_matriculas;
}; 