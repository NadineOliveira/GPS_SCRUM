var Sprint = require('./ModelConnections').sprint;
var Tarefa = require('./ModelConnections').tarefa;
var Realiza = require('./ModelConnections').realiza;
var db = require('./ModelConnections').db;

module.exports.getSprintsTarefas = async function(idProjeto){
    var result = [];
    await Sprint.findAll({
        where: {idProjeto: idProjeto}, 
        include: [{
            model: Tarefa,
            attributes: ['idTarefa','descricao','data']
        }]
    }).then(values => {
        for(i in values)
          result.push(values[i].dataValues);
    }).catch(err => {
        result = err;
    });
    return result;
}

module.exports.addSprint = async function(nome,data,idProjeto){
    var result;
    await Sprint.create({
        nome: nome,
        data_limite: data,
        idProjeto: idProjeto
    }).then(s => {
                result = s;
    }).catch(err => {
        result = err
    });
    return result;
}
