var Milestones = require('./ModelConnections').milestone;

module.exports.getMilestonesProjeto = async function(idProjeto) {
    var result = [];
    await Milestones.findAll({
        where: { idProjeto: idProjeto },
    }).then(values => {
        for (i in values)
            result.push(values[i].dataValues);
    }).catch(err => {
        result = err;
    });
    return result;
}

module.exports.addMilestone = async function(nome, data, idP, username) {
    var result;
    await Milestones.create({
        nome: nome,
        data_limite: data,
        idProjeto: idProjeto,
        username: username
    }).then(s => {
        result = s;
    }).catch(err => {
        result = err
    });
    return result;
}