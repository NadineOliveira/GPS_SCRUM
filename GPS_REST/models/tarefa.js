/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('tarefa', {
        idTarefa: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        idSprint: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'sprint',
                key: 'idSprint'
            }
        },
        data: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'tarefa'
    });
};