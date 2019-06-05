var db = require('../config/database');
const Utilizador = db.import('../models/utilizador');
const Projeto = db.import('../models/projeto');
const Participa = db.import('../models/participa');
const Sprint = db.import('../models/sprint');
const Tarefa = db.import('../models/tarefa');
const Realiza = db.import('../models/realiza');

Utilizador.hasMany(Participa,{foreignKey: 'username'});
Participa.belongsTo(Utilizador, {foreignKey: 'username'});

Projeto.hasMany(Participa, {foreignKey: 'idProjeto'});
Participa.belongsTo(Projeto, {foreignKey: 'idProjeto'});

Utilizador.belongsToMany(Projeto, {through: 'Participa', foreignKey: 'username'});
Projeto.belongsToMany(Utilizador, {through: 'Participa', foreignKey: 'idProjeto'});

Projeto.hasMany(Sprint, {foreignKey: 'idProjeto'});
Sprint.belongsTo(Projeto, {foreignKey: 'idProjeto'});

Sprint.hasMany(Tarefa, {foreignKey: 'idSprint'});
Tarefa.belongsTo(Sprint, {foreignKey: 'idSprint'});

Projeto.belongsTo(Utilizador, {foreignKey: 'criador'});
Utilizador.hasMany(Projeto, {foreignKey: 'criador'});

Utilizador.hasMany(Realiza,{foreignKey: 'username'});
Realiza.belongsTo(Utilizador, {foreignKey: 'username'});

Tarefa.hasMany(Realiza, {foreignKey: 'idTarefa'});
Realiza.belongsTo(Tarefa, {foreignKey: 'idTarefa'});


exports.sprint = Sprint;
exports.tarefa = Tarefa;
exports.projeto = Projeto;
exports.participa = Participa;
exports.utilizador = Utilizador;
exports.realiza = Realiza;
exports.db = db;

