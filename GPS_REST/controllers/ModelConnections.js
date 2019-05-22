var db = require('../config/database');
const Utilizador = db.import('../models/utilizador');

exports.utilizador = Utilizador;
exports.db = db;

