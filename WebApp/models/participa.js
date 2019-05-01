/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('participa', {
    Projeto_idProjeto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'projeto',
        key: 'idProjeto'
      }
    },
    Utilizador_idUtilizador: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizador',
        key: 'idUtilizador'
      }
    }
  }, {
    tableName: 'participa'
  });
};
