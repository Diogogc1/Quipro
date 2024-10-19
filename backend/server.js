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

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
