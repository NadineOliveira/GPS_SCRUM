var Participa = require('./ModelConnections').participa;
var Projeto = require('./ModelConnections').projeto;
var Utilizador = require('./ModelConnections').utilizador;
var db = require('./ModelConnections').db;

module.exports.participaUser = async function(id,user){
    var val;
    await Participa.findAll({
        where: {
            username: user,
            idProjeto: id
        }
    }).then(res => {
        if (res === undefined || res.length == 0) {
            val = false
        } else 
            val = true
    }).catch(e => {
        val = false
    })
    return val;
}

module.exports.getUsers = async function(id){
    var result = [];
    await Participa.findAll(
        {where: {idProjeto: id}, 
        include: [{
            model: Utilizador,
            attributes: ['username','nome']}]}
    ).then(values => {
        for(i in values)
          result.push(values[i].dataValues.utilizador);
    }).catch(err => {
        result = err;
    });
    return result;
}

module.exports.getProjetoByUtente = async function(username){
    var result = [];
    await Participa.findAll(
        {where: {username: username}, 
        include: [{
            model: Projeto,
            attributes: ['Tema','UC','Linguagem']}]}
    ).then(values => {
        for(i in values)
          result.push(values[i].dataValues);
    }).catch(err => {
        result = err;
    });
    return result;
}

module.exports.removeParticipa = async function(idProjeto,username){
    var result;
    await Participa.destroy({
        where: {
            idProjeto: idProjeto,
            username: username
        }
    }).then(() => {
        result = { validation: true }
    }).catch(() => {
        result = { validation: false }
    })
    return result
}

module.exports.addParticipa = async function(idProjeto, username){
    var result;
    await Participa.create({
        idProjeto: idProjeto,
        username: username
    }).then(pt => {
                result = pt;
    }).catch(err => {
        result = err
    });
    return result;
}
