var Projeto = require('./ModelConnections').projeto;
var db = require('./ModelConnections').db;

module.exports.getProjeto = async function(idProjeto) {
    var resutl;
    await Projeto.findAll({
        where: {
            idProjeto: idProjeto
        }
    }).then(proj => result = proj)
      .catch(err => result = err)
    return result
}

module.exports.addProjeto = async function(tema,uc,linguagem, user){
    var result;
    await Projeto.create({
        Tema: tema,
        UC: uc,
        Linguagem: linguagem,
        criador: user
    }).then(proj => {
                result = proj;
    }).catch(err => {
        result = err
    });
    return result;
}

