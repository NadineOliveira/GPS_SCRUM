/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('realiza', {
        idTarefa: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'tarefa',
                key: 'idTarefa'
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
        }
    }, {
        tableName: 'realiza'
    });
};