const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/cadastro', async (req, res) => {
    const { email, userName, dateBirth, password } = req.body;

    try {
        // Verifica se o email ou nome de usuário já existe
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { userName } // Certifique-se de que a propriedade é userName
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Email ou nome de usuário já existe' });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                userName, // Adicionando userName ao novo usuário
                dateBirth: new Date(dateBirth), // Convertendo para Date
                password, // Certifique-se de que a senha está sendo armazenada de forma segura (hash)
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error); // Ajuda a depurar o erro
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

        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        // Verifica se a senha está correta
        if (user.password !== password) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        res.status(500).json({ error: 'Falha ao fazer login' });
    }
});

module.exports = router;