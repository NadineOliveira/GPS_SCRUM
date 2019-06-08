var express = require('express');
var router = express.Router();
var passport = require("passport")
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');
var UtilizadorController = require('../controllers/utilizadores')
var ParticipaController = require('../controllers/participa')
var ProjetoController = require('../controllers/projetos')
var SprintsController = require('../controllers/sprints')
var TarefasController = require('../controllers/tarefas')
var RealizaController = require('../controllers/realiza')
var MilestonesController = require('../controllers/milestone')

// Login User
router.post('/login', async(req, res, next) => {
    passport.authenticate('login', async(err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error Occured')
                return next(error);
            }
            req.login(user, { session: false }, async(error) => {
                if (error) return next(error)
                const myuser = { username: user.username, password: user.password }
                const token = jwt.sign({ user: myuser }, 'GPS_2019', { expiresIn: '1h' })
                req.user.token = token
                req.session.token = token

                res.status(200).send({ token: token })

            })
        } catch (err) {
            return next(err)
        }
    })(req, res, next)
})

router.post('/register', async (req, res, next) => {
    try {
        if (typeof req.body.username === "undefined" && !req.body.username)
        res.status(500).send({ validation: false })
    if (typeof req.body.password === "undefined" && !req.body.password)
        res.status(500).send({ validation: false })
    if (typeof req.body.nome === "undefined" && !req.body.name)
        res.status(500).send({ validation: false })

    let username = req.body.username
    let name = req.body.nome
    let utype = 1

    var hash = await bcrypt.hash(req.body.password, 10)
    let user = await UtilizadorController.insert(username, name, hash, utype)

    res.status(200).send(user)
    }
    catch(erro) {
        res.status(500).send({ validation: false })
    }
})

router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    req.session.destroy(err => {
        res.status('200').send('Logout efetuado com sucesso');
    })
})

router.get('/projetos', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var projetos = await ParticipaController.getProjetoByUtente(user);
    res.status(200).send(projetos)
})

router.post('/projeto', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var tema = req.body.tema;
    var uc = req.body.uc;
    var linguagem = req.body.linguagem;

    var projeto = await ProjetoController.addProjeto(tema, uc, linguagem, user);
    var participa = await ParticipaController.addParticipa(projeto.idProjeto, user, 1)
    res.status(200).send(projeto)
})

router.get('/projetos/pendentes', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var projetos = await ParticipaController.getProjetoByUtentePendente(user);
    res.status(200).send(projetos)
})

router.get('/projetos/remover/:pid', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var id = req.params.pid
    var resp = await ParticipaController.removeParticipa(id, user);
    res.status(200).send(resp)
})

router.get("/sprints/:pid", passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var id = req.params.pid
    var val = await ParticipaController.participaUser(id, user);
    if (val === false)
        res.status(200).send({ validation: false })
    else {
        var resp = await SprintsController.getSprintsTarefas(id);
        res.status(200).send({ validation: true, sprints: resp })
    }
})
router.get("/milestones/:pid", passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var id = req.params.pid
    var val = await MilestonesController.getMilestonesProjeto(id);
    res.status(200).send(val)
})

router.post("/tarefasUser/:pid", passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.body.usern;
    var id = req.params.pid
    var val = await TarefasController.countTarefasUser(id, user);
    res.status(200).send(val)
})

router.get("/grupo/:pid", passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var id = req.params.pid
    var resp = await ParticipaController.getUsers(id);
    var nome = [];
    for (i in resp) {
        var user = resp[i].dataValues.username
        var val = await TarefasController.countTarefasUser(id, user);
        resp[i].dataValues.nr = val;
        nome.push({ name: user, count: val })
    }
    //console.log(resp)
    res.status(200).send({ resp: resp, nome: nome })
})

router.post('/sprint', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var nome = req.body.nome;
    var data_limite = req.body.data_limite;
    var idProjeto = req.body.idProjeto;

    var val = await ParticipaController.participaUser(idProjeto, user);
    if (val === false)
        res.status(500).send({ validation: false })
    else {
        var resp = await SprintsController.addSprint(nome, data_limite, idProjeto);
        res.status(200).send(resp)
    }
})


router.post('/tarefa/:pid', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var desc = req.body.descricao;
    var idSprint = req.body.idSprint;
    var idProjeto = req.params.pid;

    var val = await ParticipaController.participaUser(idProjeto, user);
    if (val === false)
        res.status(500).send({ validation: false })
    else {
        var resp = await TarefasController.addTarefa(desc, idSprint);
        res.status(200).send(resp)
    }
})

router.post('/userT', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var username = req.body.username;
    var idTarefa = req.body.idTarefa;

    await RealizaController.addTarefa(username, idTarefa).then(r => {
        res.status(200).send(r)
    }).catch(err => { res.status(500).send("Utilizador não adicionado") });

})

router.post('/milestone', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var nome = req.body.nome;
    var data_limite = req.body.data_limite;
    var idProjeto = req.body.idProjeto;
    var username = req.user.username;
    await MilestonesController.addMilestone(nome, data_limite, idProjeto, username).then(r => {
        res.status(200).send(r)
    }).catch(err => { res.status(500).send("Milestone não adicionado") });

})

router.post('/grupo/:pid', passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.body.username;
    var idProjeto = req.params.pid;

    var owner = await ProjetoController.getProjeto(idProjeto);

    if (owner[0].dataValues.criador == req.user.username) {
        var val = await ParticipaController.participaUserAll(idProjeto, user);
        if (val === true)
            res.status(500).send({ validation: false })
        else {
            var resp = await ParticipaController.addParticipa(idProjeto, user, 0)
            if (resp.sql)
                res.status(500).send({ validation: false })
            else
                res.status(200).send(resp)
        }
    } else res.status(500).send({ validation: false })
})


router.get("/aceitar/:pid", passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var id = req.params.pid
    var val = await ParticipaController.aceitar(id, user);
    res.status(200).send(val)
})

router.get("/recusar/:pid", passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var id = req.params.pid
    var val = await ParticipaController.removeParticipa(id, user);
    res.status(200).send(val)
})

router.get("/:pid/users/:tid", passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var id = req.params.pid
    var tid = req.params.tid

    var val = await ParticipaController.participaUser(id, user)
    if (val === false)
        res.status(200).send({ validation: false })
    else {
        var resp = await RealizaController.getUsersTarefas(tid);
        var list = []
        for (i in resp) {
            
            var user = resp[i].dataValues.username
            list.push(user)
        }
        res.status(200).send(list)
    }
})

router.get("/concluir/:tid",passport.authenticate('jwt', { session: false }), async(req, res, next) => {
    var user = req.user.username;
    var tid = req.params.tid

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    date = yyyy + '-' + mm + '-' + dd;

    var val = await TarefasController.concluirTarefa(tid,date)
    if(val === false)
        res.status(500).send({validation: false})
    else
        res.status(200).send({validation: true})
})

module.exports = router;