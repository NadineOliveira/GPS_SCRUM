var db = require('../config/database');
const Utilizador = db.import('../models/utilizador');
const Projeto = db.import('../models/projeto');
const Participa = db.import('../models/participa');

Utilizador.hasMany(Participa,{foreignKey: 'username'});
Participa.belongsTo(Utilizador, {foreignKey: 'username'});

Projeto.hasMany(Participa, {foreignKey: 'idProjeto'});
Participa.belongsTo(Projeto, {foreignKey: 'idProjeto'});

Utilizador.belongsToMany(Projeto, {through: 'Participa', foreignKey: 'username'});
Projeto.belongsToMany(Utilizador, {through: 'Participa', foreignKey: 'idProjeto'});

exports.projeto = Projeto;
exports.participa = Participa;
exports.utilizador = Utilizador;
exports.db = db;

