/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('utilizador', {
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        tipo_utilizador: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    }, {
        tableName: 'utilizador'
    });
};