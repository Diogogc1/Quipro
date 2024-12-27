const express = require('express');
const router = express.Router();

//recebendo autenticador
const {authenticateToken} = require('../controller/userController');
//recebendo controller
const {searchChapterQuizzes} = require('../controller/quizController');

//rota para buscar os quizzes de um determinado capitulo
router.post('/', authenticateToken, searchChapterQuizzes);


module.exports = router;