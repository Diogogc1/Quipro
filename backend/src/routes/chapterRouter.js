const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Cadastro de um novo capítulo
router.post('/cadastro', async (req, res) => {
    const { nome, concluido, trilhaId } = req.body;

    try {
        const novoCapitulo = await prisma.capitulo.create({
            data: {
                nome,
                concluido,
                trilhaId,  // Relaciona o capítulo com uma trilha
            },
        });
        res.status(201).json(novoCapitulo);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao criar capítulo' });
    }
});

// Buscar todos os capítulos
router.get('/todos', async (req, res) => {
    try {
        const capitulos = await prisma.capitulo.findMany();
        res.status(200).json(capitulos);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar capítulos' });
    }
});

// Atualizar um capítulo existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, concluido, trilhaId } = req.body;

    try {
        const capituloAtualizado = await prisma.capitulo.update({
            where: { id: Number(id) },
            data: { nome, concluido, trilhaId },
        });
        res.status(200).json(capituloAtualizado);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao atualizar capítulo' });
    }
});

// Deletar um capítulo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.capitulo.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Falha ao deletar capítulo' });
    }
});

//rota para buscar os capitulos que ainda não foram realizados pelo usuario
router.get('/get-chapters-not-complete/:chapterId/:userId', async (req, res)=>{
    const { chapterId, userId } = req.params;

    try {

        // recebe o trailId do capitulo
        const {trailId} = await prisma.chapter.findFirst({
            where:{id: parseInt(chapterId, 10)},
            select:{trailId: true}
        })

        if (!trailId) {
            return res.status(404).json({ error: 'Capítulo não encontrado' });
        }

        const incompleteChapters = await prisma.chapter.findMany({
            where:{
                trailId: trailId,
                chapterProgress:{
                    none:{userId:parseInt(userId, 10)},
                }
            }
        })

        return res.status(200).json({incompleteChapters: incompleteChapters});


    } catch (error) {
        console.error('Erro ao buscar capitulos não completados:', error);
        res.status(500).json({ error: 'Erro interno ao buscar capitulos não completados' });
    }
});


//rota para contar o numero de capitulos da trilha
router.get('/get-max-Chapters/:userId/:chapterId', async (req, res)=>{
    const {userId, chapterId} = req.params;

    try {
        // recebe o trailId do capitulo
        const {trailId} = await prisma.chapter.findFirst({
            where:{id: parseInt(chapterId, 10)},
            select:{trailId: true}
        })

        if (!trailId) {
            return res.status(404).json({ error: 'Capítulo não encontrado' });
        }

        //Contar o número total de capítulos nessa trilha
        const totalChapters = await prisma.chapter.count({
            where: { trailId: trailId },
        });

        res.status(200).json({totalChapters});

    } catch (error) {
        console.error('Error fetching max chapters:', error);
    }
});

module.exports = router;
