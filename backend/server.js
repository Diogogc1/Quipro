const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
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


app.listen(3001, () => {
    console.log('Server running on port 3001');
});
