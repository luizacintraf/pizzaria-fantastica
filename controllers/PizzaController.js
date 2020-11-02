const nodemon = require('nodemon');
const listaPizzas = require('../database/listaPizza');
const fs = require('fs');
const path = require('path');

const PizzaController = {
    index: (req, res) => {
        res.render('index', { listaPizzas });
        // res.send(listaPizzas);
    },
    show: (req, res) => {
        let id = req.params.id;
        let pizza = listaPizzas.find(p => p.id == id)
        res.render('pizza', { pizza });
    },
    create: (req, res) => {
        res.render('create-pizza');
    },
    store: (req, res) => {
        let { nome, preco, ingredientes } = req.body;
        //transformando string em array de ingradientes
        ingredientes = ingredientes.split(',');

        // criando lógica do número de id do registro
        let id = listaPizzas.length + 1;

        //separando nome img
        let img = req.files[0].originalname

        //adicionar registro de pizza
        listaPizzas.push({
            id: id,
            nome: nome,
            preco: preco,
            img: "/img/" + img,
            ingredientes: ingredientes
        });

        fs.writeFileSync(path.join('database', 'listaPizza.json'), JSON.stringify(listaPizzas));

        res.redirect('/');
    },
    edit: (req, res) => {
        let id = req.params.id;
        let pizza = listaPizzas.find(pizza => pizza.id == id)
        res.render('edit-pizza', { pizza: pizza })
    },
    update: (req, res) => {
        let id = req.params.id;
        let pizza = listaPizzas.find(pizza => pizza.id == id)
        let { nome, preco, ingredientes } = req.body
        console.log(req.files)
        pizza.nome = nome
        pizza.preco = preco
        if (req.files.length > 0) {
            pizza.img = "/img/" + req.files[0].originalname
        }
        pizza.ingredientes = ingredientes.split(",")
        console.log(pizza)
        fs.writeFileSync(path.join('database', 'listaPizza.json'), JSON.stringify(listaPizzas))
        res.redirect('/pizza/' + id)
    },
    search: (req, res) => {
        let busca = req.query.q
        let resultadoBusca = listaPizzas.filter(pizza => pizza.nome.toLowerCase().indexOf(busca.toLowerCase()) > -1)
        console.log(resultadoBusca)
        if (resultadoBusca.length > 0) {
            res.render('index', { listaPizzas: resultadoBusca });
        } else {
            res.render('index', { listaPizzas });
        }

    }
}

module.exports = PizzaController;