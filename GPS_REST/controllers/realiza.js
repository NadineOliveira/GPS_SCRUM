var Realiza = require('./ModelConnections').realiza
var Tarefa = require('./ModelConnections').tarefa
var db = require('./ModelConnections').db

module.exports.getUsersTarefas = async function(idTarefa) {
    var result = [];
    await Realiza.findAll({
        where: { idTarefa: idTarefa },
        attributes: ['idTarefa', 'username']
    }).then(values => {
        result = values
    }).catch(err => {
        result = err;
    });
    return result;
}

module.exports.addTarefa = async function(username, idTarefa) {
    console.log(username, idTarefa);
    var result;

    await Realiza.create({
        idTarefa: idTarefa,
        username: username,

    }).then(s => {
        result = s;
    }).catch(err => {
        result = err
    });
    console.log(JSON.stringify(result))
        /*result = db.query("Insert into scrum_gps.realiza(idTarefa,username) values(?), (?);", {
            replacements: [
                ['idTarefa', idTarefa],
                ['username', username]
            ],
            type: Sequelize.QueryTypes.INSERT
        });
        console.log(JSON.stringify(result));*/
    return result;
}