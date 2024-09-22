//ARQUIVO RESPONSÁVEL POR AGRUPAR TODAS AS ROTAS DE ALUNO

const { Router } = require('express')
const router = Router()
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

module.exports = router;