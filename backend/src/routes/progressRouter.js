const express = require('express');
const router = express.Router();

//recebendo função de autenticação
const {authenticateToken} = require('../controller/userController');
//recebendo controller
const {progressCreate} = require('../controller/progressController');

//rota para criar um novo progress ou indicar que já existe um
router.post('/create', authenticateToken, progressCreate);


module.exports = router;