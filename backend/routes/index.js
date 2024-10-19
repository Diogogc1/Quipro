//ARQUIVO RESPONSÁVEL POR AGRUPAR TODAS AS ROTAS
//DA API E OUTRAS POSSIVEIS FUNCIONALIDADES, ALÉM
//DA API

const { Router } = require('express')
const router = Router()

const api = require("./api/index")
router.use("/api", api)

module.exports = router;
