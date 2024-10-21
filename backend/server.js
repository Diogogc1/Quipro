//ARQUIVO RESPONSÁVEL APENAS POR RODAR O SERVIDOR

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const usuarioRouter = require('./routes/usuarioRouter');
app.use('/usuario', usuarioRouter);

const alunoRouter = require('./routes/alunoRouter');
app.use('/aluno', alunoRouter);

// Trilhas e capítulos (o pai tá backendu)
const trilhaRouter = require('./routes/trilhaRouter');
app.use('/trilha', trilhaRouter);

const capituloRouter = require('./routes/capituloRouter');
app.use('/capitulo', capituloRouter);

// const alunoRouter = require('./routes/alunoRouter');
// app.use('/aluno', alunoRouter);

const trilhaRouter = require('./routes/trilhaRouter');
app.use('/trilha', trilhaRouter);

const quizRouter = require('./routes/quizzRouter');
app.use('/quizz', quizRouter);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
