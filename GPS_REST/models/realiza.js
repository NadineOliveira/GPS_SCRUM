/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('realiza', {
    data: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    idTarefa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tarefa',
        key: 'idTarefa'
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
    tableName: 'realiza'
  });
};