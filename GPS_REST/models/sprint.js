/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sprint', {
    idSprint: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
    }
  }, {
    tableName: 'sprint'
  });
};
