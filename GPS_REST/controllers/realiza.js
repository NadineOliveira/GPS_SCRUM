var Realiza = require('./ModelConnections').realiza
var Tarefa = require('./ModelConnections').tarefa
var db = require('./ModelConnections').db

module.exports.getUsersTarefas = async function(idTarefa){
    var result = [];
    await Realiza.findAll({
        where: {idTarefa: idTarefa},
        attributes: ['idTarefa','username']
    }).then(values => {
        result = values
    }).catch(err => {
        result = err;
    });
    return result;
}
