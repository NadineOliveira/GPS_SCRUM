var express = require('express');
var router = express.Router();
var passport = require("passport")
var jwt = require('jsonwebtoken')
var ParticipaController = require('../controllers/participa')
var ProjetoController = require('../controllers/projetos')
var SprintsController = require('../controllers/sprints')
var TarefasController = require('../controllers/tarefas')

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

    var projeto = await ProjetoController.addProjeto(tema,uc,linguagem,user);
    var participa = await ParticipaController.addParticipa(projeto.idProjeto, user)
    res.status(200).send(projeto)
})

router.get('/projetos/remover/:pid', passport.authenticate('jwt', {session: false}), async (req,res, next) => {
    var user = req.user.username;
    var id = req.params.pid
    var resp = await ParticipaController.removeParticipa(id,user);
    res.status(200).send(resp)
})

router.get("/sprints/:pid", passport.authenticate('jwt', {session: false}), async (req,res, next) => {
    var user = req.user.username;
    var id = req.params.pid
    var val = await ParticipaController.participaUser(id,user);
    if(val === false)
        res.status(200).send({validation: false})
    else {
        var resp = await SprintsController.getSprintsTarefas(id);
        res.status(200).send({validation: true, sprints: resp })
    }
})

router.get("/grupo/:pid", passport.authenticate('jwt', {session: false}), async (req,res, next) => {
    var id = req.params.pid
    var resp = await ParticipaController.getUsers(id);
    res.status(200).send(resp)
})

router.post('/sprint', passport.authenticate('jwt', {session: false}), async (req,res, next) => {
    var user = req.user.username;
    var nome = req.body.nome;
    var data_limite = req.body.data_limite;
    var idProjeto = req.body.idProjeto;

    var val = await ParticipaController.participaUser(idProjeto,user);
    if(val === false)
        res.status(500).send({validation: false})
    else {
        var resp = await SprintsController.addSprint(nome,data_limite,idProjeto);
        res.status(200).send(resp)
    }
})

router.post('/tarefa/:pid', passport.authenticate('jwt', {session: false}), async (req,res, next) => {
    var user = req.user.username;
    var desc = req.body.descricao;
    var idSprint = req.body.idSprint;
    var idProjeto = req.params.pid;

    var val = await ParticipaController.participaUser(idProjeto,user);
    if(val === false)
        res.status(500).send({validation: false})
    else {
        var resp = await TarefasController.addTarefa(desc,idSprint);
        res.status(200).send(resp)
    }
})

router.post('/grupo/:pid', passport.authenticate('jwt', {session: false}), async (req,res, next) => {
    var user = req.body.username;
    var idProjeto = req.params.pid;

    var val = await ParticipaController.participaUserAll(idProjeto,user);
    if(val === true)
        res.status(500).send({validation: false})
    else {
        var resp = await ParticipaController.addParticipa(idProjeto, user, 0)
        if(resp.sql)
            res.status(500).send({validation: false})
        else
            res.status(200).send(resp)
    }
})


module.exports = router;
