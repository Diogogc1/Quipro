const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//puxando bcrypt para criptografar senhas e enviar tokens
const bcrypt = require('bcrypt');
const jwtConfig = require('../config/jwtConfig');


const progressCreate = async (req, res)=>{
    const {userId, id} = req.body;

    try {
        // Verifica se o progresso já existe
        const progressoExistente = await prisma.chapterProgress.findFirst({
            where: {
            userId: parseInt(userId, 10),
            chapterId: parseInt(id, 10),
            },
        });

        // Se não existir, cria o progresso
        if (!progressoExistente) {
            await prisma.chapterProgress.create({
            data: {
                userId: parseInt(userId, 10),
                chapterId: parseInt(id, 10),
            },
            });

            res.status(200).json({ result: true })
        }
        else{
            res.status(409).json({result: false});
        }

    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar progresso' });
    }
}


//exportando routes
module.exports ={
    progressCreate,
}