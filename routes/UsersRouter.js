const listaUsers = require('../database/User.json');
var express = require('express');
var Router = express.Router();
const { check, validationResult, body } = require('express-validator')
    // const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null, 'public/img/users')
//     },
//     filename:(req,file, cb) => {
//         cb(null, file.originalname)
//     }
// }); 
// const upload = multer({ storage })

const UserController = require('../controllers/UserController');

Router.get('/cadastro', UserController.cadastro)
Router.post('/cadastro', UserController.cadastrar)
Router.get('/login', UserController.show)
Router.post('/login', [
    body('email').custom(function(value) {
        let buscaEmail = listaUsers.find(user => user.email == value)
        return buscaEmail != undefined
    }).withMessage("Email não cadastrado"),
    body('senha').custom(function(value) {
        let buscaSenha = listaUsers.find(user => user.senha == value)
        return buscaSenha != undefined
    }).withMessage("Senha incorreta!"),
], UserController.login)

module.exports = Router