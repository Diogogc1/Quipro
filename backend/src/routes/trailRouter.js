const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//rota para buscar os capitulos da trilha, com boolean de verificação de conclusão
  router.get('/capitulos/:trilhaName/:userId', async (req, res) => {
    const { trilhaName, userId } = req.params;

    //verificando se trilhaName é vazio
    if (!trilhaName) {
      return res.status(400).json({ message: 'Parâmetro "name" ausente na requisição' });
    }

    try {
      const trilha = await prisma.trail.findUnique({
        where: {
          title: trilhaName,
        },
        include: {
          chapters:{
            select: {
              id:true,
              title:true,
              chapterProgress: {
                where: { userId: parseInt(userId, 10) }, // Filtra o progresso pelo usuário
                select: { id: true }, // Apenas verifica se há progresso
              },
            },
          },
        },
      });
  
      if (!trilha) {
        return res.status(404).json({ message: 'Trilha não encontrada' });
      }

      // Adiciona o campo `complete` com base na existência de progresso
      const chaptersWithCompletion = trilha.chapters.map((chapter) => ({
        ...chapter,
        complete: chapter.chapterProgress.length > 0,
      }));

    return res.status(200).json({chaptersWithCompletion});
    
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

//pegar title da trilha baseado no id da trilha
router.get('/get-trail-title/:trailId', async(req,res)=>{
  const {trailId} = req.params;

  try {
    const {title} = await prisma.trail.findFirst({
      where:{
        id: Number(trailId)
      },
      select:{
        title:true,
      }
    });
  
  return res.status(200).json({title});
  } catch (error) {
    res.status(500).json({ error: 'Erro interno ao buscar title da trilha' });
  }
})

module.exports = router;
