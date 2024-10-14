//ARQUIVO RESPONSÁVEL POR AGRUPAR TODAS AS ROTAS DA API

const { Router } = require('express')
const router = Router()

const usuarios = require("./usuario/index")
router.use("/usuarios", usuarios)

module.exports = router;