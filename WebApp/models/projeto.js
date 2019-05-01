/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projeto', {
    idProjeto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Tema: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    UC: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Linguagem: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'projeto'
  });
};
