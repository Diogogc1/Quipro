const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//rota para buscar os quizzes de um determinado capitulo
router.post('/', async (req, res) => {
    const { id } = req.body; // Pegando o chapterId do corpo da requisição
    try {
        const quizzes = await prisma.quiz.findMany({
            where: {
                chapterId: id,
            }
        });

        if (!quizzes || quizzes.length === 0) {
            return res.status(404).json({ message: 'Nenhum quiz encontrado para esse capítulo' });
        }

        const quizData = quizzes.map((quiz) => ({
            id: quiz.id,
            question: quiz.question,
            options: quiz.options,
            correctAnswer: quiz.correctAnswer,
            image: quiz.image,
            explanation: quiz.explanation,
            chapterId: quiz.chapterId,
        }));

        return res.json({ quizzes: quizData });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar quizzes' });
    }
});

module.exports = router;
