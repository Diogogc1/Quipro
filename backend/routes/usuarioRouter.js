const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/cadastro', async (req, res) => {
    const { email, userName, dateOfBirth, password } = req.body;

    try {
        // Verifica se o email ou nome de usuário já existe
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username: userName }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email ou nome de usuário já existe' });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                username: userName,
                dateOfBirth: new Date(dateOfBirth),
                password,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});

// Rota de listagem de usuários
router.get('/listar', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to list users' });
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

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        // Verifica se a senha está correta
        if (user.password !== password) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        res.status(200).json({ message: 'Login bem-sucedido', user });
    } catch (error) {
        res.status(500).json({ error: 'Falha ao fazer login' });
    }
});

module.exports = router;