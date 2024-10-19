//ARQUIVO RESPONSÁVEL POR AGRUPAR AS ROTAS DE ALUNO

const express = require("express")
const alunoRouter = express.Router

alunoRouter.get("/", (req, res) => {
    res.send("Aluno")
})

module.exports = alunoRouter 