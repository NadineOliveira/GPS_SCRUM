var passport = require('passport')
var localStrategy = require('passport-local').Strategy

var Utilizador = require('../controllers/utilizadores')

// Login de utilizadores
passport.use('login', new localStrategy ({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        if (typeof username === "undefined" && !username) 
            throw new Error ("ID não definido")
        if (typeof password === "undefined" && !password)
            throw new Error ("Password não definida")
    
        utilizador = await Utilizador.validatePassword(username, password)

        return done(null, utilizador, {message: "Utilizador Autenticado!"})
    }
    catch(erro) {
        return done(erro,false, {message: erro})
    }
}))

passport.use('registo', new localStrategy ({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true
}, async (req, username, password, done) => {
    try {
        
        if (typeof username === "undefined" && !email)
            throw new Error ("Email não definido")
        if (typeof password === "undefined" && !password)
            throw new Error ("Password não definida")
        if (typeof req.body.nome === "undefined" && !req.body.name)
            throw new Error ("Nome não definido")

        let name = req.body.nome
        let utype = 1

        var hash = await bcrypt.hash(password, 10)

        let user = await Utilizador.insert({username, hash, name, utype})

        if (!user)
            throw new Error("Erro a criar utilizador!")

        return done(null, user)
    }
    catch(erro) {
        return done(erro,false, {message: erro})
    }
}))

// Verificação do Token
var JWTstrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt

var extractToken = (req) => {
    var token = null
    if(req && req.session) token = req.session.token
    if (typeof token === 'undefined' && typeof req.headers.authorization !== 'undefined'){
        token = req.headers.authorization.replace('Bearer ', '')
    }
    return typeof token !== 'undefined' ? token : false
}

passport.use('jwt', new JWTstrategy({
    secretOrKey: "GPS_2019",
    jwtFromRequest: ExtractJWT.fromExtractors([extractToken])
}, async (token,done) => {
    try{
        if (typeof token === 'undefined')
            return done(erro)
        return done(null, token.user)
    } catch (erro) {
        return done(erro)
    }
}))