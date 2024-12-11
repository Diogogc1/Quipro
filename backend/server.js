//ARQUIVO POR RODAR O SERVIDOR

const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

//puxar dotenv
const env = require('dotenv').config();


//importando e usando rotas
const usuarioRouter = require('./src/routes/userRouter');
app.use('/usuario', usuarioRouter);

// Trilhas e capítulos
const trilhaRouter = require('./src/routes/trailRouter');
app.use('/trilha', trilhaRouter);

const capituloRouter = require('./src/routes/chapterRouter');
app.use('/capitulo', capituloRouter);

const quizRouter = require('./src/routes/quizzRouter');
app.use('/quizz', quizRouter);

const progressRouter = require('./src/routes/progressRouter');
app.use('/progress', progressRouter);

//ativando servidor na porta 3001
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
