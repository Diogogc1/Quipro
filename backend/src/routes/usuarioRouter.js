const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//puxando bcrypt para criptografar senhas e enviar tokens
const bcrypt = require('bcrypt');
const jwtConfig = require('../config/jwtConfig');

router.get('/ranking', async (req, res) => {

    const ranking = await prisma.user.findMany({
        select: {
            userName: true,
            points: true
        },
        orderBy: {
            points: 'desc'
        }
    })

    res.status(200).json({ ranking });
})

router.post('/cadastro', async (req, res) => {
    const { email, userName, dateBirth, password } = req.body;

    try {
        // Verifica se o email ou nome de usuário já existe
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { userName }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email ou nome de usuário já existe' });
        }

        //criptografar senha
        const encryptedPassword = await bcrypt.hash(password,10);

        //cria o novo usuário
        const newUser = await prisma.user.create({
            data: {
                email,
                userName,
                dateBirth: new Date(dateBirth),
                password:encryptedPassword,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error); // Exibe o erro no console para depuração
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// Rota de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // Verifica se a senha está correta
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Email ou Senha incorretos!' });
        }

        //gerando token
        const token = jwtConfig.generateToken(user.id);

        res.status(200).json({ token, userId: user.id, userName:user.userName});
    } catch (error) {
        res.status(500).json({ error: 'Falha ao fazer login' });
    }
});


router.post('/logout', async (req, res) => {
    
    try {
        // Pega o token do cabeçalho Authorization, esperado como "Bearer <token>"
        const token = req.headers['authorization'].split(' ')[1]; // Usamos essa quebra pq normalmente usamos “Baerer XXX”

        if (!token) {
            return res.status(400).json({ message: 'Token não fornecido' });
        }
        
        // Chama a função blacklistToken para invalidar o token, o armazenando na blacklist
        jwtConfig.blacklistToken(token); 
 
        res.status(200).json({ message: 'Logout realizado com sucesso'});


    } catch (error) {
        console.error(error); // Para depuração
        res.status(500).json({ error: 'Erro ao realizar logout.' });
    }
});

// Rota para atualizar a pontuação do usuário
router.post('/update-user-points', async (req, res) => {
    const { userId, points } = req.body;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { points: points }
        });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Erro ao atualizar pontuação do usuário:', error);
        res.status(500).json({ error: 'Falha ao atualizar pontuação do usuário' });
    }
});

// Rota para buscar a pontuação de um usuário
router.get('/:userId/points', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId, 10) },
            select: { points: true }, // Seleciona apenas os pontos
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ points: user.points });
    } catch (error) {
        console.error('Erro ao buscar pontos do usuário:', error);
        res.status(500).json({ error: 'Erro interno ao buscar pontos do usuário' });
    }
});




module.exports = router;