const listaUsers = require('../database/User.json');
const fs = require('fs');
const path = require('path');

const UserController = {
    cadastro: (req, res) => {
        res.render('menu-user')
    },
    cadastrar: (req, res) => {
        //console.log(req.body)
        let { nome, email, senha } = req.body;
        //let img = '/img/users/'+req.files[0].originalname;
        let id = listaUsers.length + 1
        listaUsers.push({
            id: id,
            nome: nome,
            email: email,
            senha: senha,
            // img:img
        })

        fs.writeFileSync(path.join('database', 'User.json'), JSON.stringify(listaUsers));

        res.redirect('/user/cadastro');

    },
    show: (req, res) => {
        res.render('login')
    },
    login: (req, res) => {
        console.log(req.body)
        let { email, senha } = req.body;
        let findUser = listaUsers.find(lista => lista.email == email && lista.senha == senha)
        console.log(findUser)
        if (findUser == undefined) {
            res.render('login')
        } else {
            res.render('menu-user')
        }

    }

}

module.exports = UserController