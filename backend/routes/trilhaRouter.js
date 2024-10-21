const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/capitulos', async (req, res) => {
  const { name } = req.body; // Pegando o nome do corpo da requisição
  console.log('Requisição recebida no /capitulos:', req.body);

  try {
    const trilha = await prisma.trail.findUnique({
      where: {
        title: name,
      },
      include: {
        chapters: true,
      },
    });

    if (!trilha) {
      return res.status(404).json({ message: 'Trilha não encontrada' });
    }

    const chapters = trilha.chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
    }));

    return res.json({ chapters });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar trilha' });
  }
})
// Cadastro de uma nova trilha
router.post('/cadastro', async (req, res) => {
    const { nome, concluida } = req.body;

    try {
        const novaTrilha = await prisma.trilha.create({
            data: {
                nome,
                concluida,
            },
        });
        res.status(201).json(novaTrilha);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao criar trilha' });
    }
});

// Buscar todas as trilhas
router.get('/todas', async (req, res) => {
    try {
        const trilhas = await prisma.trilha.findMany();
        res.status(200).json(trilhas);
    } catch (error) {
        res.status(500).json({ error: 'Falha ao buscar trilhas' });
    }
});

// Atualizar uma trilha existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, concluida } = req.body;

    try {
        const trilhaAtualizada = await prisma.trilha.update({
            where: { id: Number(id) },
            data: { nome, concluida },
        });
        res.status(200).json(trilhaAtualizada);
    } catch (error) {
        res.status(400).json({ error: 'Falha ao atualizar trilha' });
    }
});

// Deletar uma trilha
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.trilha.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Falha ao deletar trilha' });
    }
});

module.exports = router;
