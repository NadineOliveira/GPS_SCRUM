var express = require('express');
var router = express.Router();
var passport = require("passport")
var jwt = require('jsonwebtoken')
var ParticipaController = require('../controllers/participa')
var ProjetoController = require('../controllers/projetos')

// Login User
router.post('/login', async (req,res,next) => {
  passport.authenticate('login', async (err,user,info)=> {
      try {
          if(err || !user){
              const error = new Error('An Error Occured')
              return next(error);
          }
          req.login(user, {session: false}, async (error) => {
              if(error) return next(error)
              const myuser = {username: user.username, password: user.password}
              const token = jwt.sign({user: myuser}, 'GPS_2019')
              req.user.token = token
              req.session.token = token

              res.status(200).send({token: token})

          })
      } catch (err) {
          return next(err)
      }
  }) (req,res,next)
})

router.get('/logout', passport.authenticate('jwt', {session: false}), (req,res,next) => {
  req.session.destroy(err => {
      res.status('200').send('Logout efetuado com sucesso');
  })
})

router.get('/projetos', passport.authenticate('jwt', {session: false}), async (req,res, next) => {
    var user = req.user.username;
    var projetos = await ParticipaController.getProjetoByUtente(user);
    res.status(200).send(projetos)
})

router.post('/projeto', passport.authenticate('jwt', {session: false}), async (req,res, next) => {
    var user = req.user.username;
    var tema = req.body.tema;
    var uc = req.body.uc;
    var linguagem = req.body.linguagem;

    var projeto = await ProjetoController.addProjeto(tema,uc,linguagem);
    var participa = await ParticipaController.addParticipa(projeto.idProjeto, user)
    res.status(200).send(projeto)
})

router.get('/projetos/remover/:pid', passport.authenticate('jwt', {session: false}), async (req,res, next) => {
    var user = req.user.username;
    var id = req.params.pid
    var resp = await ParticipaController.removeParticipa(id,user);
    res.status(200).send(resp)
})

module.exports = router;
