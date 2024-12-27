//ARQUIVO POR RODAR O SERVIDOR

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: process.env.ENABLED_CORS?.split(';') || []
}));
// app.use(cors());
app.use(express.json());


//puxar dotenv
const env = require('dotenv').config();


//importando e usando rotas
const usuarioRouter = require('./src/routes/userRouter');
app.use('/user', usuarioRouter);

const trilhaRouter = require('./src/routes/trailRouter');
app.use('/trail', trilhaRouter);

const capituloRouter = require('./src/routes/chapterRouter');
app.use('/chapter', capituloRouter);

const quizRouter = require('./src/routes/quizRouter');
app.use('/quiz', quizRouter);

const progressRouter = require('./src/routes/progressRouter');
app.use('/progress', progressRouter);

//ativando servidor na porta 3001
app.listen(3001, () => {
    console.log('Server running on port 3001');
});
