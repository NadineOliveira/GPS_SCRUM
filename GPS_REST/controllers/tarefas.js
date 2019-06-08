var Sprint = require('./ModelConnections').sprint;
var Tarefa = require('./ModelConnections').tarefa;
var db = require('./ModelConnections').db;

module.exports.addTarefa = async function(desc, idSprint) {
    var result;
    await Tarefa.create({
        descricao: desc,
        idSprint: idSprint,
        data: "NAO"
    }).then(s => {
        result = s;
    }).catch(err => {
        result = err
    });
    return result;
}

module.exports.countTarefasUser = async function(idProjeto, username) {
    var result = 0;
    await Realiza.count({
            where: {
                idProjeto: idProjeto,
                username: username
            }
        })
        .then(values => {
            result = values
        })
        .catch(err => {
            result = err;
        });
    return result;
};