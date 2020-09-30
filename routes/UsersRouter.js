var express = require('express');
var Router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'public/img/users')
    },
    filename:(req,file, cb) => {
        cb(null, file.originalname)
    }
}); 
const upload = multer({ storage })

const UserController = require('../controllers/UserController');

Router.get('/cadastro',UserController.cadastro)
Router.post('/cadastro',upload.any(),UserController.cadastrar)
//Router.get('/login',UserController.login)

module.exports=Router