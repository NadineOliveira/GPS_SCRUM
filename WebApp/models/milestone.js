/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('milestone', {
    idMilestone: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    data_limite: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Utilizador_idUtilizador: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'utilizador',
        key: 'idUtilizador'
      }
    },
    Projeto_idProjeto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'projeto',
        key: 'idProjeto'
      }
    }
  }, {
    tableName: 'milestone'
  });
};
