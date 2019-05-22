/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('milestone', {
    idMilestone: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    data_limite: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    idProjeto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'projeto',
        key: 'idProjeto'
      }
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'utilizador',
        key: 'username'
      }
    }
  }, {
    tableName: 'milestone'
  });
};
