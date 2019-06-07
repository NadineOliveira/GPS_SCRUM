/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participa', {
    idProjeto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projeto',
        key: 'idProjeto'
      }
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizador',
        key: 'username'
      }
    },
    acepted: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'participa'
  });
};
