/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('projeto', {
    idProjeto: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Tema: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UC: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Linguagem: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    criador: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizador',
        key: 'username'
      }
    }
  }, {
    tableName: 'projeto'
  });
};
