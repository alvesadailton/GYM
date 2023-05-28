const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const gymController = require('./src/controllers/gymController');

const { loginRequired } = require('./src/middlewares/middleware');


// Rotas da home
route.get('/', homeController.initialPage);

// Rotas de register
route.get('/register', loginController.registerIndex);
route.post('/register', loginController.register);

// Rotas de login
route.get('/login', loginController.loginIndex);
route.post('/login', loginController.login);


// Rotas da GYM

route.get('/gym', loginRequired, gymController.gym);
route.get('/gym/hypertrophy', loginRequired, gymController.gymHypertrophy);
route.get('/gym/loseweight', loginRequired, gymController.gymLoseWeight);
route.get('/gym/define', loginRequired, gymController.gymDefine);
route.get('/logout', loginRequired, gymController.logout);

module.exports = route;
