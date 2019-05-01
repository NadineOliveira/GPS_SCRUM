/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizador_tarefa', {
    idUtilizador_Tarefa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Utilizador_idUtilizador: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'utilizador',
        key: 'idUtilizador'
      }
    },
    Tarefa_idTarefa: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tarefa',
        key: 'idTarefa'
      }
    }
  }, {
    tableName: 'utilizador_tarefa'
  });
};
