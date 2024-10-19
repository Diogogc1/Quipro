//ARQUIVO RESPONSÁVEL POR AGRUPAR AS ROTAS DE ALUNO

const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Aluno")
})

module.exports = router 