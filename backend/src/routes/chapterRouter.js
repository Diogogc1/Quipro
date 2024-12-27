const express = require('express');
const router = express.Router();

//recebendo autenticador
const {authenticateToken} = require('../controller/userController');
//recebendo controller
const {
    getIncompleteChapters,
    getMaxNumberChapters,
    registerNewChapter,
    getAllChapters,
    chapterUpdate,
    chapterDelete,
} = require('../controller/chapterController');

//rota para buscar os capitulos que ainda não foram realizados pelo usuario
router.get('/get-incomplete-chapters/:chapterId/:userId', authenticateToken, getIncompleteChapters);

//rota para contar o numero de capitulos da trilha
router.get('/get-max-number-chapters/:userId/:chapterId', authenticateToken, getMaxNumberChapters);

// Cadastro de um novo capítulo -> Obs: Não utilizado no momento
//router.post('/cadastro', registerNewChapter);

// Buscar todos os capítulos -> Obs: Não utilizado no momento
//router.get('/all-chapters', getAllChapters);

// Atualizar um capítulo existente -> Obs: Não utilizado no momento
//router.put('/:id', chapterUpdate);

// Deletar um capítulo -> Obs: Não utilizado no momento
//router.delete('/:id', chapterDelete);

module.exports = router;
