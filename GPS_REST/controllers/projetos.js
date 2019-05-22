var Projeto = require('./ModelConnections').projeto;
var db = require('./ModelConnections').db;

module.exports.addProjeto = async function(tema,uc,linguagem){
    var result;
    await Projeto.create({
        Tema: tema,
        UC: uc,
        Linguagem: linguagem
    }).then(proj => {
                result = proj;
    }).catch(err => {
        result = err
    });
    return result;
}

