const express = require("express")
const router = express.Router()

//chamando controller
const{
    authenticateToken,
    ranking,
    signUp,
    login,
    logout,
    updateUserPoints,
    getUserPoints,
    saveLastChapterAccessed} = require('../controller/userController');

//rota para cadastrar usuario
router.post('/cadastro', signUp);

// Rota de login
router.post('/login', login);

//rota para deslogar usuario da conta
router.post('/logout', logout);

//rota para buscar a lista de ranking dos usuarios da aplicação
router.get('/ranking', authenticateToken, ranking);

// Rota para atualizar a pontuação do usuário
router.post('/update-user-points', authenticateToken, updateUserPoints);

// Rota para buscar a pontuação de um usuário
router.get('/:userId/points', authenticateToken, getUserPoints);

//rota para salvar o ultimo capitulo acessado
router.put('/save-last-chapter-accessed' , authenticateToken, saveLastChapterAccessed);


module.exports = router;