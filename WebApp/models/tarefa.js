/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tarefa', {
    idTarefa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    descricao: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Sprint_idSprint: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sprint',
        key: 'idSprint'
      }
    }
  }, {
    tableName: 'tarefa'
  });
};
