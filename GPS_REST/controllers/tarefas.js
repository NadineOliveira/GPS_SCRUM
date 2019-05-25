var Sprint = require('./ModelConnections').sprint;
var Tarefa = require('./ModelConnections').tarefa;
var db = require('./ModelConnections').db;

module.exports.addTarefa = async function(desc,idSprint){
    var result;
    await Tarefa.create({
        descricao: desc,
        idSprint: idSprint
    }).then(s => {
                result = s;
    }).catch(err => {
        result = err
    });
    return result;
}
