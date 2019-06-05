var Utilizador = require('./ModelConnections').utilizador;
var bcrypt = require('bcryptjs');

module.exports.insert = user => {
  return Utilizador.create(user)
} 

module.exports.getAllUtilizadores = async function(){
  var result = [];
  await Utilizador.findAll().then(values => {
    for(i in values)
      result.push(values[i].dataValues);
  }).catch(err => {
    result = err;
  });
  return result;
};

module.exports.getUtilizador = async (username) => {
  var result;
  await Utilizador.findOne({
    where: {
      username: username
    }
  }).then(value => {
      result = value.dataValues;
  }).catch(err => {
      result = err
  });
  return result
};


module.exports.validatePassword = async (username, password) => {
  var utilizador = await this.getUtilizador(username)
  
  if(!utilizador) 
      throw new Error("Utilizador não encontrado!")

  var compare = await bcrypt.compare(password, utilizador.password)
  
  if(!compare)
      throw new Error ("Invalid password")
  
  return utilizador
}