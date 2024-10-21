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
});

module.exports = router;
