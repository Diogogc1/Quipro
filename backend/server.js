const express = require("express")
const router = require("./routes")

const app = express()
app.use("/api", router)

app.listen(3001, () => {
    console.log("rodando")
})