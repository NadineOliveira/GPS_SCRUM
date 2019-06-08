var Sprint = require('./ModelConnections').sprint;
var Tarefa = require('./ModelConnections').tarefa;
var Realiza = require('./ModelConnections').realiza

var db = require('./ModelConnections').db;

module.exports.concluirTarefa = async function(id, data) {
    var result;
    await Tarefa.update(
        {data: data},
        {where: {idTarefa: id}}
    ).then(() => {
        result = { validation: true }
    }).catch(() => {
        result = { validation: false }
    })
    return result
}

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
    await db.query("Select COUNT(*) as nr from scrum_gps.projeto " +
        "inner join scrum_gps.sprint " +
        "ON scrum_gps.projeto.idProjeto = scrum_gps.sprint.idProjeto " +
        "inner join scrum_gps.tarefa " +
        "on scrum_gps.tarefa.idSprint = scrum_gps.sprint.idSprint " +
        "inner join scrum_gps.realiza " +
        "on scrum_gps.realiza.idTarefa = scrum_gps.tarefa.idTarefa " +
        "where scrum_gps.tarefa.data <> 'NAO' AND " +
        "scrum_gps.projeto.idProjeto= :id " +
        "And scrum_gps.realiza.username= :user", { replacements: { id: idProjeto, user: username }, type: db.QueryTypes.SELECT }
    ).then(val => {
        result = val[0].nr;
    }).catch(err => result = err)
    return result;
};