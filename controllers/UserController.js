const listaUsers = require('../database/User.json');
const fs = require('fs');
const path = require('path');

const UserController = {
    cadastro: (req,res)=>{
        res.render('menu-user')
    },
    cadastrar: (req,res) =>{
        console.log(req.body)
        let {nome,email,senha}=req.body;
        //let img = '/img/users/'+req.files[0].originalname;
        console.log(req.files)
        let id = listaUsers.length + 1
        listaUsers.push({
            id:id,
            nome:nome,
            email:email,
            senha:senha,
           // img:img
        })

        fs.writeFileSync(path.join('database', 'User.json'), JSON.stringify(listaUsers));
        
        res.redirect('/user/cadastro');


    }

}

module.exports=UserController