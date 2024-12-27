const express = require('express');
const router = express.Router();

//recebendo autenticador
const {authenticateToken} = require('../controller/userController');
//recebendo controller
const {
  chapterSearch,
  getTrailTitle,
  registerNewTrail,
  searchAllChapter,
  trailUpdate,
  trailDelete,
} = require('../controller/trailController');

//rota para buscar os capitulos da trilha, com boolean de verificação de conclusão
  router.get('/get-trail-chapters/:trilhaName/:userId', authenticateToken, chapterSearch);

//pegar title da trilha baseado no id da trilha
router.get('/get-trail-title/:trailId', authenticateToken, getTrailTitle);

// Cadastro de uma nova trilha -> obs: não utilizada no momento
//router.post('/cadastro', registerNewTrail);

// Buscar todas as trilhas -> obs: não utilizada no momento
//router.get('/all-trails', searchAllChapter);

// Atualizar uma trilha existente -> obs: não utilizada no momento
//router.put('/:id', trailUpdate);

// Deletar uma trilha -> obs: não utilizada no momento
//router.delete('/:id', trailDelete);

module.exports = router;