//ARQUIVO RESPONSÁVEL APENAS POR RODAR O SERVIDOR

const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

//puxar dotenv
const env = require('dotenv').config();

//importando e usando rotas
const usuarioRouter = require('./src/routes/usuarioRouter');
app.use('/usuario', usuarioRouter);

const alunoRouter = require('./src/routes/alunoRouter');
app.use('/aluno', alunoRouter);

// Trilhas e capítulos
const trilhaRouter = require('./src/routes/trilhaRouter');
app.use('/trilha', trilhaRouter);

const capituloRouter = require('./src/routes/capituloRouter');
app.use('/capitulo', capituloRouter);

// const alunoRouter = require('./routes/alunoRouter');
// app.use('/aluno', alunoRouter);

const quizRouter = require('./src/routes/quizzRouter');
app.use('/quizz', quizRouter);

app.listen(3002, () => {
    console.log('Server running on port 3001');
});
